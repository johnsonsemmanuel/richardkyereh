"use client";

import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { label: string; href: string } | { label: string; dropdown: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    dropdown: [
      { label: "Career Consultancy", href: "/booking?service=career" },
      { label: "Speaking Engagement", href: "/booking?service=speaking" },
      { label: "Face To Face Meeting", href: "/booking?service=meeting" },
      { label: "Mentorship", href: "/booking?service=mentorship" },
      { label: "Aircraft Leases", href: "/booking?service=leases" },
      { label: "Charters Services", href: "/booking?service=charters" },
    ],
  },
  { label: "Our Awards", href: "/awards" },
  { label: "Our Newsroom", href: "/newsroom" },
  { label: "Contact Us", href: "/contact" },
];

function isDropdown(item: NavItem): item is { label: string; dropdown: { label: string; href: string }[] } {
  return "dropdown" in item;
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const { theme, toggle } = useTheme();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              <span className="text-primary">Richard Kyereh</span>
              <span className="text-foreground/40 ml-1.5 text-sm font-normal hidden sm:inline">
                | Aviation Expert
              </span>
            </span>
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
                    <DropdownMenuContent align="center" className="w-56">
                      {item.dropdown.map((sub) => (
                        <DropdownMenuItem key={sub.label} asChild>
                          <Link href={sub.href}>{sub.label}</Link>
                        </DropdownMenuItem>
                      ))}
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
          "fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden bg-background",
          open ? "block" : "hidden"
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-6"
          )}
        >
          <div className="grid gap-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "ghost", className: "justify-start text-base" })}
            >
              Home
            </Link>
            <p className={buttonVariants({ variant: "ghost", className: "justify-start text-base text-foreground/40 pointer-events-none" })}>
              Our Services
            </p>
            <div className="pl-4 grid gap-y-1 border-l border-input ml-3 mb-2">
              {[
                { label: "Career Consultancy", href: "/booking?service=career" },
                { label: "Speaking Engagement", href: "/booking?service=speaking" },
                { label: "Face To Face Meeting", href: "/booking?service=meeting" },
                { label: "Mentorship", href: "/booking?service=mentorship" },
                { label: "Aircraft Leases", href: "/booking?service=leases" },
                { label: "Charters Services", href: "/booking?service=charters" },
              ].map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "ghost", className: "justify-start text-sm h-9" })}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
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
          <div className="flex flex-col gap-2">
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
