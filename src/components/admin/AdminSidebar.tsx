"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";
import {
  LayoutDashboard,
  Calendar,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Newsletter", href: "/admin/newsletter", icon: Users },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

const mobileTabs = navItems.slice(0, 5);

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 z-50 flex items-center justify-between px-3 bg-card border-b border-input">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-2 -ml-1 rounded-md text-foreground/70 hover:text-foreground hover:bg-secondary/50"
        >
          <Menu className="size-4" />
        </button>
        <Link href="/" className="flex items-center">
          <img src="/richardkyerehlogo.png" alt="Richard Kyereh" className="h-7 w-auto" />
        </Link>
        <span className="size-8" />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-card border-r border-input z-50 flex flex-col md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-input">
          <Link href="/" className="flex items-center gap-2">
            <img src="/richardkyerehlogo.png" alt="Richard Kyereh" className="h-7 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden p-1 rounded-md text-foreground/60 hover:text-foreground hover:bg-secondary/50"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm",
                  active
                    ? "bg-secondary text-foreground font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-input">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50"
            >
              <LogOut className="size-4 shrink-0" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-card border-t border-input safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {mobileTabs.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[56px]",
                  active
                    ? "text-primary"
                    : "text-foreground/50"
                )}
              >
                <Icon className="size-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
