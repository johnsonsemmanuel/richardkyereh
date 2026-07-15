import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, verifyAdminPassword, setAdminSession } from "@/lib/admin-auth";

async function LoginForm() {
  async function loginAction(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    if (await verifyAdminPassword(password)) {
      await setAdminSession();
      redirect("/admin");
    }
  }

  return (
    <form action={loginAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
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

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-foreground/60 mt-2">Sign in to manage your site</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-input shadow-card">
          <Suspense fallback={<div className="text-center text-foreground/60">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
