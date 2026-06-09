"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  PlaneIcon, CompassIcon, WingsIcon, ShieldIcon, RadarIcon, GlobeIcon,
} from "@/components/ui/aviation-icons";
import { ArrowLeft, Check, Send, Calendar } from "lucide-react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00",
];

const services = [
  {
    id: "Career Consultancy",
    icon: CompassIcon,
    desc: "Personalized career guidance for aviation professionals",
    duration: "1 hr",
  },
  {
    id: "Speaking Engagement",
    icon: GlobeIcon,
    desc: "Keynote speaking and panel participation",
    duration: "1 hr",
  },
  {
    id: "Face To Face Meeting",
    icon: WingsIcon,
    desc: "Confidential one-on-one strategic discussions",
    duration: "30 mins",
  },
  {
    id: "Mentorship",
    icon: ShieldIcon,
    desc: "Structured leadership development for emerging leaders",
    duration: "1 hr",
  },
  {
    id: "Aircraft Leases",
    icon: RadarIcon,
    desc: "Lease vs. buy analysis and fleet strategy",
    duration: "1 hr",
  },
  {
    id: "Charters Services",
    icon: PlaneIcon,
    desc: "Charter operations and service delivery consulting",
    duration: "1 hr",
  },
];

type ServiceQuestions = Record<string, { label: string; key: string; type: "text" | "select" | "number" | "textarea"; options?: string[]; placeholder?: string }[]>;

const serviceQuestions: ServiceQuestions = {
  "Career Consultancy": [
    { label: "Current Role / Title", key: "currentRole", type: "text", placeholder: "e.g. First Officer" },
    { label: "Years of Aviation Experience", key: "experience", type: "number", placeholder: "e.g. 5" },
    { label: "Primary Career Goal", key: "careerGoal", type: "select", options: ["Command Upgrade", "Type Rating", "Management Transition", "Airline Entry", "Career Pivot", "Other"], placeholder: "Select your goal" },
    { label: "Preferred Sector", key: "sector", type: "select", options: ["Commercial Airlines", "Business Aviation", "Cargo / Freight", "Aircraft Leasing", "Regulatory / Government", "Maintenance / MRO"] },
  ],
  "Speaking Engagement": [
    { label: "Event Name", key: "eventName", type: "text", placeholder: "e.g. Africa Aviation Summit 2026" },
    { label: "Event Date", key: "eventDate", type: "text", placeholder: "e.g. 15 Oct 2026" },
    { label: "Expected Audience Size", key: "audienceSize", type: "number", placeholder: "e.g. 500" },
    { label: "Event Type", key: "eventType", type: "select", options: ["Conference", "Corporate Event", "Panel Discussion", "Workshop", "University / Academic", "Other"] },
    { label: "Preferred Topic / Theme", key: "topic", type: "textarea", placeholder: "Tell us about the theme or topic you have in mind..." },
  ],
  "Face To Face Meeting": [
    { label: "Preferred Location", key: "location", type: "text", placeholder: "e.g. Accra, Ghana" },
    { label: "Topics to Discuss", key: "topics", type: "textarea", placeholder: "Briefly outline what you would like to discuss..." },
    { label: "Urgency Level", key: "urgency", type: "select", options: ["This Week", "Within 2 Weeks", "Within a Month", "No Rush"] },
    { label: "Are you representing an organization?", key: "representing", type: "select", options: ["Yes — Company / Institution", "Yes — Government Agency", "No — Personal Capacity"] },
  ],
  "Mentorship": [
    { label: "Current Role / Title", key: "currentRole", type: "text", placeholder: "e.g. Ramp Supervisor" },
    { label: "Years in Aviation", key: "experience", type: "number", placeholder: "e.g. 3" },
    { label: "Primary Development Area", key: "focusArea", type: "select", options: ["Flight Operations", "Management & Leadership", "Safety & Compliance", "Commercial Strategy", "Aircraft Acquisition", "General Career Growth"] },
    { label: "Preferred Mentorship Duration", key: "mentorshipDuration", type: "select", options: ["3 Months", "6 Months", "12 Months", "Open-ended"] },
    { label: "What do you hope to achieve?", key: "goals", type: "textarea", placeholder: "Describe your goals for this mentorship..." },
  ],
  "Aircraft Leases": [
    { label: "Aircraft Type(s) of Interest", key: "aircraftType", type: "text", placeholder: "e.g. A320, B737-800" },
    { label: "Region of Operation", key: "region", type: "select", options: ["Africa", "Middle East", "Asia Pacific", "Europe", "North America", "Latin America", "Global"] },
    { label: "Lease Type Preferred", key: "leaseType", type: "select", options: ["Dry Lease", "Wet Lease (ACMI)", "Both / Not Sure", "Sale & Leaseback"] },
    { label: "Fleet Size (current or planned)", key: "fleetSize", type: "number", placeholder: "e.g. 3" },
    { label: "Additional Context", key: "leaseNotes", type: "textarea", placeholder: "Timeline, budget constraints, or other relevant details..." },
  ],
  "Charters Services": [
    { label: "Typical Routes / Regions", key: "routes", type: "text", placeholder: "e.g. West Africa, ACC–LOS" },
    { label: "Target Passenger Capacity", key: "capacity", type: "select", options: ["Under 20", "20–50", "50–100", "100+", "Not Sure"] },
    { label: "Service Level", key: "serviceLevel", type: "select", options: ["Standard", "Premium / VIP", "Both", "Not Sure"] },
    { label: "Are you currently operating charters?", key: "operating", type: "select", options: ["Yes, actively", "Yes, planning to expand", "No, exploring entry", "Consulting for a client"] },
    { label: "Describe your charter needs", key: "charterNotes", type: "textarea", placeholder: "Tell us about your operation or goals..." },
  ],
};

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
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

  function goTo(s: number) {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const selectedService = form.service;
  const questions = selectedService ? serviceQuestions[selectedService] : [];

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <Reveal className="max-w-xl mx-auto text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="size-7 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Request Received
            </h1>
            <p className="mt-4 text-foreground/40 leading-relaxed">
              Thank you, <span className="text-foreground/70 font-medium">{form.name}</span>.
              We will review your {form.service?.toLowerCase() || "consultation"} request
              and confirm within 24 hours. A confirmation will be sent to{" "}
              <span className="text-foreground/70 font-medium">{form.email}</span>.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {form.date && (
                <span className="text-xs bg-secondary/50 border border-input px-3 py-1.5 rounded-full text-foreground/50 flex items-center gap-1.5">
                  <Calendar className="size-3" />
                  {form.date} at {form.time}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
              <PlaneIcon className="size-4" />
              Booking
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              Book a
              <br />
              <span className="text-foreground/50">consultation.</span>
            </h1>
            <p className="mt-6 text-foreground/40 leading-relaxed">
              Tell us about yourself and what you need. Each service includes a
              complimentary initial consultation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-12">
              {[
                { n: 1, label: "Details & Service" },
                { n: 2, label: "Your Requirements" },
                { n: 3, label: "Schedule & Review" },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        s.n <= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground/30 border border-input"
                      }`}
                    >
                      {s.n < step ? <Check className="size-3.5" /> : s.n}
                    </div>
                    <span
                      className={`hidden sm:block text-xs ${
                        s.n <= step ? "text-foreground/60" : "text-foreground/20"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {s.n < 3 && (
                    <div
                      className={`w-12 sm:w-20 h-px ${
                        s.n < step ? "bg-primary" : "bg-input"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* Personal details */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-5">
                        Your Details
                      </p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-foreground/50 mb-1.5">
                            Full Name <span className="text-primary">*</span>
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
                            Email <span className="text-primary">*</span>
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
                    </div>

                    {/* Service selection */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-5">
                        Select a Service <span className="text-primary">*</span>
                      </p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {services.map((s) => {
                          const Icon = s.icon;
                          const selected = form.service === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => update("service", s.id)}
                              className={`group text-left p-4 rounded-xl border transition-all ${
                                selected
                                  ? "bg-primary/5 border-primary/40"
                                  : "bg-secondary/30 border-input hover:border-foreground/20"
                              }`}
                            >
                              <Icon
                                className={`size-5 mb-3 transition-colors ${
                                  selected ? "text-primary" : "text-foreground/30"
                                }`}
                              />
                              <p
                                className={`text-sm font-semibold transition-colors ${
                                  selected
                                    ? "text-primary"
                                    : "text-foreground group-hover:text-foreground"
                                }`}
                              >
                                {s.id}
                              </p>
                              <p className="text-xs text-foreground/40 mt-1 leading-relaxed">
                                {s.desc}
                              </p>
                              <span className="text-[10px] text-foreground/30 mt-2 block">
                                {s.duration} &middot; Free
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Button type="button" onClick={() => goTo(2)} size="lg" className="w-full sm:w-auto">
                      Continue
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-3 pb-4 border-b border-input">
                      {selectedService && (
                        <>
                          {(() => {
                            const svc = services.find((s) => s.id === selectedService);
                            const Icon = svc?.icon || CompassIcon;
                            return <Icon className="size-5 text-primary" />;
                          })()}
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {selectedService}
                            </p>
                            <p className="text-xs text-foreground/40">
                              Tell us more about your needs
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-5">
                      {questions.map((q) => (
                        <div key={q.key}>
                          <label className="block text-xs text-foreground/50 mb-1.5">
                            {q.label}
                          </label>
                          {q.type === "select" ? (
                            <select
                              value={form[q.key] || ""}
                              onChange={(e) => update(q.key, e.target.value)}
                              className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                            >
                              <option value="">{q.placeholder || `Select ${q.label.toLowerCase()}`}</option>
                              {q.options?.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          ) : q.type === "textarea" ? (
                            <textarea
                              rows={3}
                              value={form[q.key] || ""}
                              onChange={(e) => update(q.key, e.target.value)}
                              className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg resize-none"
                              placeholder={q.placeholder || ""}
                            />
                          ) : (
                            <input
                              type={q.type}
                              value={form[q.key] || ""}
                              onChange={(e) => update(q.key, e.target.value)}
                              className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                              placeholder={q.placeholder || ""}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => goTo(1)} className="gap-2">
                        <ArrowLeft className="size-4" />
                        Back
                      </Button>
                      <Button type="button" onClick={() => goTo(3)} size="lg">
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-5">
                        Pick a Date &amp; Time
                      </p>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-foreground/50 mb-1.5">
                            Preferred Date <span className="text-primary">*</span>
                          </label>
                          <input
                            required
                            type="date"
                            value={form.date}
                            onChange={(e) => update("date", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg [color-scheme:dark]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-foreground/50 mb-1.5">
                            Preferred Time <span className="text-primary">*</span>
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => update("time", t)}
                                className={`px-3 py-2.5 text-xs border rounded-lg transition-all ${
                                  form.time === t
                                    ? "bg-primary text-primary-foreground border-primary font-medium"
                                    : "bg-secondary/50 border-input text-foreground/50 hover:border-foreground/30"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-foreground/50 mb-1.5">
                        Additional Notes
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg resize-none"
                        placeholder="Anything else we should know..."
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-b from-secondary/30 to-transparent border border-input rounded-xl p-6">
                      <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                        Review Your Request
                      </p>
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div>
                          <span className="text-foreground/30 text-xs">Name</span>
                          <p className="text-foreground/70">{form.name}</p>
                        </div>
                        <div>
                          <span className="text-foreground/30 text-xs">Email</span>
                          <p className="text-foreground/70">{form.email}</p>
                        </div>
                        {form.phone && (
                          <div>
                            <span className="text-foreground/30 text-xs">Phone</span>
                            <p className="text-foreground/70">{form.phone}</p>
                          </div>
                        )}
                        {form.company && (
                          <div>
                            <span className="text-foreground/30 text-xs">Company</span>
                            <p className="text-foreground/70">{form.company}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-foreground/30 text-xs">Service</span>
                          <p className="text-foreground/70">{selectedService}</p>
                        </div>
                        <div>
                          <span className="text-foreground/30 text-xs">Date &amp; Time</span>
                          <p className="text-foreground/70">{form.date} at {form.time}</p>
                        </div>
                      </div>
                      {questions.some((q) => form[q.key]) && (
                        <div className="mt-4 pt-4 border-t border-input/60">
                          <span className="text-foreground/30 text-xs">Requirements</span>
                          <ul className="mt-2 space-y-1">
                            {questions
                              .filter((q) => form[q.key])
                              .map((q) => (
                                <li key={q.key} className="text-xs text-foreground/50">
                                  <span className="text-foreground/30">{q.label}:</span>{" "}
                                  {form[q.key]}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => goTo(2)} className="gap-2">
                        <ArrowLeft className="size-4" />
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="gap-2">
                        <Send className="size-4" />
                        Submit Request
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
