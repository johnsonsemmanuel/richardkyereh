"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PlaneIcon, CompassIcon, WingsIcon } from "@/components/ui/aviation-icons";
import { MapPin, Phone, Clock, Send, Mail, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const inquiryTypes = [
  "General Inquiry",
  "Speaking Engagement Request",
  "Media & Press",
  "Partnership Proposal",
  "Career & Mentorship",
  "Booking Assistance",
];

const quickLinks = [
  { label: "Our Services", href: "/services" },
  { label: "Book a Consultation", href: "/booking" },
  { label: "Awards & Recognition", href: "/awards" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Contact submission error:", err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <Reveal className="max-w-xl mx-auto text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="size-7 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Message Sent
            </h1>
            <p className="mt-4 text-foreground/40 leading-relaxed">
              Thank you for reaching out, <span className="text-foreground/70 font-medium">{form.name}</span>.
              We review every message personally and will respond within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {form.inquiryType && (
                <span className="text-xs bg-secondary/50 border border-input px-3 py-1.5 rounded-full text-foreground/50">
                  {form.inquiryType}
                </span>
              )}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
                <PlaneIcon className="size-4" />
                Contact
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Get in
                <br />
                <span className="text-foreground/50">touch.</span>
              </h1>
              <p className="mt-6 text-foreground/40 leading-relaxed max-w-md">
                For general inquiries, speaking requests, partnership proposals,
                or media enquiries — send us a message and we will get back to
                you within 24 hours.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground/60 font-medium">Office Address</p>
                    <p className="text-foreground/40 mt-0.5">No 9 Airport Residential Area</p>
                    <p className="text-foreground/40">Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground/60 font-medium">Phone</p>
                    <a href="tel:+233243681135" className="text-foreground/40 mt-0.5 hover:text-primary transition-colors">+233 24 368 1135</a>
                    <p className="text-foreground/30 text-xs mt-0.5">
                      <a href="tel:+233243681135" className="hover:text-primary transition-colors">Click to call</a> using your device&apos;s dialer
                    </p>
                    <p className="text-foreground/30 text-xs mt-0.5">Available during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground/60 font-medium">Email</p>
                    <p className="text-foreground/40 mt-0.5">contact@richardkyereh.com</p>
                    <p className="text-foreground/30 text-xs mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground/60 font-medium">Business Hours</p>
                    <p className="text-foreground/40 mt-0.5">Monday – Friday: 8am – 5pm GMT</p>
                    <p className="text-foreground/30 text-xs mt-0.5">Weekend inquiries answered on Monday</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10 pt-8 border-t border-input/60">
                <p className="text-xs text-foreground/30 font-semibold tracking-wider uppercase mb-4">
                  Connect with Richard
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/richardkyereh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-lg bg-secondary/50 border border-input flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/richardkyereh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-lg bg-secondary/50 border border-input flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:contact@richardkyereh.com"
                    className="size-9 rounded-lg bg-secondary/50 border border-input flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="Email"
                  >
                    <Mail className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="bg-secondary/20 border border-input rounded-2xl p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <WingsIcon className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Send a Message</p>
                    <p className="text-xs text-foreground/40">All fields are welcome, none required</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-foreground/50 mb-1.5">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/50 mb-1.5">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-foreground/50 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/50 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => update("inquiryType", e.target.value)}
                      className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                    >
                      <option value="">Select an option</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-foreground/50 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="size-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border border-input/60 rounded-2xl p-8 sm:p-10">
            <Reveal>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CompassIcon className="size-4 text-primary" />
                    Quick Navigation
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Explore more of what Richard Kyereh offers
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-primary px-3 py-1.5 rounded-full border border-input hover:border-primary/40 transition-all"
                    >
                      {link.label}
                      <ArrowRight className="size-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
