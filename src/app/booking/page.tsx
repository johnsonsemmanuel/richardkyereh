"use client";

import { useState } from "react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00",
];

const serviceTypes = [
  "Strategic Advisory",
  "Safety & Compliance",
  "Fleet Management",
  "Operations Consulting",
  "Training & Development",
  "Sustainability Advisory",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    date: "",
    time: "",
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
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Consultation Request Received
            </h1>
            <p className="mt-4 text-white/40 leading-relaxed">
              Thank you, {form.name}. We will review your request and confirm
              your booking within 24 hours. A confirmation will be sent to{" "}
              {form.email}.
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
          <div className="max-w-xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
              Booking
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Book a
              <br />
              <span className="text-white/50">consultation.</span>
            </h1>
            <p className="mt-6 text-white/40 leading-relaxed">
              Select a date and time for a confidential consultation with
              Richard Kyereh. We will confirm within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex gap-3 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      s <= step
                        ? "bg-gold text-navy-900"
                        : "bg-navy-700 text-white/30"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-px ${
                        s < step ? "bg-gold" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
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
                        className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
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
                        className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Service Needed
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option value="" className="bg-navy-900">
                        Select a service
                      </option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s} className="bg-navy-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-light transition-colors text-sm"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update("time", t)}
                          className={`px-4 py-3 text-sm border transition-colors ${
                            form.time === t
                              ? "bg-gold text-navy-900 border-gold font-medium"
                              : "bg-navy-800/50 border-white/10 text-white/60 hover:border-white/20"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-light transition-colors text-sm"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="w-full bg-navy-800/50 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="Briefly describe what you would like to discuss..."
                    />
                  </div>
                  <div className="bg-navy-800/30 border border-white/5 p-6 space-y-2 text-sm">
                    <p className="text-white/30">
                      <span className="text-white/60">Name:</span> {form.name}
                    </p>
                    <p className="text-white/30">
                      <span className="text-white/60">Email:</span>{" "}
                      {form.email}
                    </p>
                    <p className="text-white/30">
                      <span className="text-white/60">Service:</span>{" "}
                      {form.service}
                    </p>
                    <p className="text-white/30">
                      <span className="text-white/60">Date:</span> {form.date}
                    </p>
                    <p className="text-white/30">
                      <span className="text-white/60">Time:</span> {form.time}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-light transition-colors text-sm"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
