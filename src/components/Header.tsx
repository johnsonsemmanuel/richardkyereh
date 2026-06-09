"use client";

import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
              <span className="text-primary">RK</span>
              <span className="text-foreground/60 ml-1.5 text-sm font-normal hidden sm:inline">
                Aerospace Consultancy
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggle}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button asChild>
              <Link href="/booking">Book Consultation</Link>
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
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start text-base",
                })}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setOpen(false)}>
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
