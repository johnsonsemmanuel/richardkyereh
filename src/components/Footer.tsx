"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkedInIcon, XIcon, InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";

const footerLinkGroups = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Career Consultancy", href: "/services/career-consultancy" },
      { label: "Speaking Engagement", href: "/services/speaking-engagement" },
      { label: "Face To Face Meeting", href: "/services/face-to-face-meeting" },
      { label: "Mentorship", href: "/services/mentorship" },
      { label: "Aircraft Leases", href: "/services/aircraft-leases" },
      { label: "Charters Services", href: "/services/charters-services" },
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

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error("Newsletter submission error:", err);
      }
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer className="relative overflow-hidden bg-secondary border-t border-border/50 mt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="relative bg-card rounded-3xl border border-border/50 p-8 md:p-12 shadow-premium">
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
            <div className="flex flex-col gap-4 max-w-sm">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/richardkyerehlogo.png"
                  alt="Richard Kyereh"
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                African aviation expert delivering strategic direction, operational safety, and results that reach a global stage.
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Newsletter
                </h4>
                {subscribed ? (
                  <p className="text-sm text-muted-foreground">
                    You&apos;re subscribed. Watch for aviation insights.
                  </p>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 min-w-0 bg-background border border-input rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                    />
                    <Button type="submit" size="sm">
                      Join
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-16">
              {footerLinkGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {group.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-10 px-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Richard Kyereh. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <div className="flex gap-4">
            <a href="https://gh.linkedin.com/in/richard-kyereh-mba-pmp-7726bb1b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href="https://web.facebook.com/richardkwabena.kyereh" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="https://x.com/richardkyereh" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-foreground transition-colors">
              <XIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/richardkyereh" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
