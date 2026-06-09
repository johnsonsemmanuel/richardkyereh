"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Strategic Advisory", href: "/services" },
      { label: "Fleet Management", href: "/services" },
      { label: "Safety & Compliance", href: "/services" },
      { label: "Operations", href: "/services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-secondary border-t border-input">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-xl font-semibold text-foreground">
              <span className="text-primary">RK</span>
            </Link>
            <p className="mt-3 text-sm text-foreground/40 leading-relaxed max-w-xs">
              Aerospace and aviation consultancy delivering strategic
              excellence, operational safety, and global impact.
            </p>

            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-3">
                Newsletter
              </h4>
              {subscribed ? (
                <p className="text-sm text-foreground/50">
                  You&apos;re subscribed. Watch for aviation insights.
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 min-w-0 bg-background/50 border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-ring/50"
                  />
                  <Button type="submit" size="sm">
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-input flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Richard Kyereh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
