"use client";

import { useState } from "react";

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
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Message Sent
            </h1>
            <p className="mt-4 text-white/40 leading-relaxed">
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
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
                Contact
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Get in
                <br />
                <span className="text-white/50">touch.</span>
              </h1>
              <p className="mt-6 text-white/40 leading-relaxed">
                For general inquiries, partnership proposals, or media requests,
                send us a message. For consultation bookings, please use the
                booking page.
              </p>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 shrink-0">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <span>Based in Accra, Ghana &mdash; serving globally</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-blueblack-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-blueblack-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full bg-blueblack-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full bg-blueblack-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blueblack-900 font-semibold hover:bg-white/90 transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
