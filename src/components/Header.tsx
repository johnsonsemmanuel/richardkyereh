"use client";

import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CompassIcon, GlobeIcon, WingsIcon, ShieldIcon, RadarIcon, PlaneIcon,
} from "@/components/ui/aviation-icons";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/social-icons";

type NavItem = { label: string; href: string } | { label: string; dropdown: { label: string; desc: string; href: string; icon: React.ComponentType<{ className?: string }> }[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    dropdown: [
      { label: "Career Consultancy", desc: "Personalized career guidance", href: "/booking?service=career", icon: CompassIcon },
      { label: "Speaking Engagement", desc: "Keynotes & panel participation", href: "/booking?service=speaking", icon: GlobeIcon },
      { label: "Face To Face Meeting", desc: "Confidential strategic discussions", href: "/booking?service=meeting", icon: WingsIcon },
      { label: "Mentorship", desc: "Leadership development programs", href: "/booking?service=mentorship", icon: ShieldIcon },
      { label: "Aircraft Leases", desc: "Fleet strategy & lease analysis", href: "/booking?service=leases", icon: RadarIcon },
      { label: "Charters Services", desc: "Charter operations consulting", href: "/booking?service=charters", icon: PlaneIcon },
    ],
  },
  { label: "Our Awards", href: "/awards" },
  { label: "Our Newsroom", href: "/newsroom" },
  { label: "Contact Us", href: "/contact" },
];

type DropdownItem = Extract<NavItem, { dropdown: unknown[] }>["dropdown"][number];

function isDropdown(item: NavItem): item is Extract<NavItem, { dropdown: unknown[] }> {
  return "dropdown" in item;
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [mobileSubmenu, setMobileSubmenu] = React.useState(false);
  const scrolled = useScroll(10);
  const { theme, toggle } = useTheme();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-all ease-out",
        scrolled && !open
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg"
          : "",
        open ? "bg-background/90" : ""
      )}
    >
      <div className="max-w-5xl mx-auto">
        <nav
          className={cn(
            "flex h-14 w-full items-center justify-between px-6 transition-all ease-out",
            scrolled ? "md:px-4" : "md:px-6"
          )}
        >
          <Link href="/" className="flex items-center">
            <img
              src="/richardkyerehlogo.png"
              alt="Richard Kyereh"
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              if (isDropdown(item)) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button className={buttonVariants({ variant: "ghost", className: "gap-1" })}>
                        {item.label}
                        <ChevronDown className="size-3 mt-0.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-64 p-1.5">
                      {item.dropdown.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <DropdownMenuItem key={sub.label} asChild className="p-0">
                            <Link
                              href={sub.href}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-lg"
                            >
                              <Icon className="size-4 text-primary/60 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-sm font-medium">{sub.label}</p>
                                <p className="text-xs text-foreground/40">{sub.desc}</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={toggle}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button asChild>
              <Link href="/booking">Book Richard</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
              <MenuToggleIcon open={open} className="size-5" duration={300} />
            </Button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto border-y md:hidden bg-background",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-6">
          <div className="grid gap-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base" })}
            >
              Home
            </Link>

            <button
              onClick={() => setMobileSubmenu(!mobileSubmenu)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base gap-2 w-full" })}
            >
              <ChevronRight
                className={cn(
                  "size-3.5 text-foreground/30 transition-transform",
                  mobileSubmenu && "rotate-90"
                )}
              />
              Our Services
            </button>

            {mobileSubmenu && (
              <div className="pl-8 grid gap-y-0.5 mb-1 overflow-hidden">
                {(navItems.find((n) => "dropdown" in n && n.label === "Our Services") as Extract<NavItem, { dropdown: unknown[] }>).dropdown.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <Icon className="size-4 text-primary/40 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground/70">{sub.label}</p>
                        <p className="text-xs text-foreground/30">{sub.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Link
              href="/awards"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base" })}
            >
              Our Awards
            </Link>
            <Link
              href="/newsroom"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base" })}
            >
              Our Newsroom
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base" })}
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-border">
              <a href="https://linkedin.com/in/richardkyereh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/40 hover:text-foreground transition-colors">
                <LinkedInIcon className="size-5" />
              </a>
              <a href="https://x.com/richardkyereh" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-foreground/40 hover:text-foreground transition-colors">
                <XIcon className="size-5" />
              </a>
              <a href="https://instagram.com/richardkyereh" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/40 hover:text-foreground transition-colors">
                <InstagramIcon className="size-5" />
              </a>
            </div>
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setOpen(false)}>
                Book Richard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
