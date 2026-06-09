"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Book a Consultation" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blueblack-900/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white"
          >
            <span className="text-white">RK</span>
            <span className="text-white/60 ml-2 hidden sm:inline text-sm font-normal">
              Aerospace Consultancy
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="text-sm px-5 py-2.5 bg-white text-blueblack-900 font-medium hover:bg-white/90 transition-colors"
            >
              Book Consultation
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-blueblack-900">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-white/70 hover:text-white transition-colors text-sm py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
