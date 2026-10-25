import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, verifyAdminPassword, setAdminSession } from "@/lib/admin-auth";
import { Card, CardContent } from "@/components/ui/card";
import { PlaneIcon } from "@/components/ui/aviation-icons";

async function LoginForm() {
  async function loginAction(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    if (await verifyAdminPassword(password)) {
      await setAdminSession();
      redirect("/admin");
    } else {
      redirect("/login?error=1");
    }
  }

  return (
    <form action={loginAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
          placeholder="Enter admin password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <section className="section-bg-light min-h-screen flex items-center justify-center section-padding">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="size-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
            <PlaneIcon className="size-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your site</p>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            Incorrect password. Please try again.
          </div>
        )}
        <Card variant="outlined">
          <CardContent>
            <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
