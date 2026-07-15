import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Contacts", href: "/admin/contacts" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Blog", href: "/admin/blog" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-input bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-lg font-bold text-foreground">
                Admin
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <form action="/admin/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-secondary border border-input rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
