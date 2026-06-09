"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Message Sent
            </h1>
            <p className="mt-4 text-foreground/40 leading-relaxed">
              Thank you for reaching out. We will get back to you within 24
              hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Contact
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Get in
                <br />
                <span className="text-foreground/50">touch.</span>
              </h1>
              <p className="mt-6 text-foreground/40 leading-relaxed">
                For general inquiries, partnership proposals, or media requests,
                send us a message or visit our office.
              </p>
              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4 text-sm text-foreground/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0 mt-0.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-foreground/60 font-medium">Address</p>
                    <p>No 9 Airport Residential Area</p>
                    <p>Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-sm text-foreground/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0 mt-0.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-foreground/60 font-medium">Phone</p>
                    <p>+233 24 368 1135</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-sm text-foreground/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0 mt-0.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <p className="text-foreground/60 font-medium">Assistance Hours</p>
                    <p>Monday – Friday</p>
                    <p>8am to 5pm GMT</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground/60 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-secondary/50 border border-input px-4 py-3 text-foreground text-sm focus:outline-none focus:border-ring/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground/60 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-secondary/50 border border-input px-4 py-3 text-foreground text-sm focus:outline-none focus:border-ring/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-foreground/60 mb-2">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full bg-secondary/50 border border-input px-4 py-3 text-foreground text-sm focus:outline-none focus:border-ring/50 transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/60 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full bg-secondary/50 border border-input px-4 py-3 text-foreground text-sm focus:outline-none focus:border-ring/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
