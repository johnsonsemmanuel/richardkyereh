"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
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
      <section className="section-bg-light min-h-screen flex items-center section-padding">
        <div className="premium-container w-full">
          <Reveal className="max-w-xl mx-auto text-center">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <Check className="size-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Message Sent
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Thank you for reaching out, <span className="text-foreground font-medium">{form.name}</span>.
              We review every message personally and will respond within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {form.inquiryType && (
                <span className="text-xs bg-secondary border border-input px-3 py-1.5 rounded-full text-muted-foreground flex items-center gap-1.5">
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
      <section className="section-bg-light">
        <div className="premium-container py-12 lg:pt-40 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <SectionHeader
                title="Get in"
                subtitle="touch."
                description="For general inquiries, speaking requests, partnership proposals, or media enquiries - send us a message and we will get back to you within 24 hours."
                icon={PlaneIcon}
              />

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground font-medium">Office Address</p>
                    <p className="text-muted-foreground mt-0.5">No 9 Airport Residential Area</p>
                    <p className="text-muted-foreground">Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground font-medium">Phone</p>
                    <a href="tel:+233243681135" className="text-foreground mt-0.5 hover:text-primary transition-colors">+233 24 368 1135</a>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      <a href="tel:+233243681135" className="hover:text-primary transition-colors">Click to call</a> using your device&apos;s dialer
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">Available during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground font-medium">Email</p>
                    <p className="text-muted-foreground mt-0.5">contact@richardkyereh.com</p>
                    <p className="text-muted-foreground text-xs mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="size-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground font-medium">Business Hours</p>
                    <p className="text-muted-foreground mt-0.5">Monday - Friday: 8am - 5pm GMT</p>
                    <p className="text-muted-foreground text-xs mt-0.5">Weekend inquiries answered on Monday</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10 pt-8 border-t border-border/50">
                <p className="text-xs text-muted-foreground font-semibold tracking-wider uppercase mb-4">
                  Connect with Richard
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://gh.linkedin.com/in/richard-kyereh-mba-pmp-7726bb1b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-lg bg-secondary border border-input flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://web.facebook.com/richardkwabena.kyereh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-lg bg-secondary border border-input flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/richardkyereh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-lg bg-secondary border border-input flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:contact@richardkyereh.com"
                    className="size-9 rounded-lg bg-secondary border border-input flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    aria-label="Email"
                  >
                    <Mail className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <Card variant="outlined">
                <CardContent className="p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <WingsIcon className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Send a Message</p>
                      <p className="text-xs text-muted-foreground">All fields are welcome, none required</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-base">Full Name</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="input-base"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="label-base">Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="input-base"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-base">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className="input-base"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="label-base">Company / Organization</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className="input-base"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label-base">Inquiry Type</label>
                      <select
                        value={form.inquiryType}
                        onChange={(e) => update("inquiryType", e.target.value)}
                        className="input-base"
                      >
                        <option value="">Select an option</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label-base">Subject</label>
                        <input
                          required
                          type="text"
                          value={form.subject}
                          onChange={(e) => update("subject", e.target.value)}
                          className="input-base"
                          placeholder="Brief subject line"
                        />
                    </div>

                    <div>
                      <label className="label-base">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className="input-base resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="size-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-bg-light section-padding">
        <div className="premium-container">
          <Card variant="outlined">
            <CardContent className="p-8 sm:p-10">
              <Reveal>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <CompassIcon className="size-4 text-primary" />
                      Quick Navigation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Explore more of what Richard Kyereh offers
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary px-3 py-1.5 rounded-full border border-input hover:border-primary/40 transition-colors"
                      >
                        {link.label}
                        <ArrowRight className="size-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
