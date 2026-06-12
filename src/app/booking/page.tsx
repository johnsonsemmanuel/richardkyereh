"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  PlaneIcon, CompassIcon, WingsIcon, ShieldIcon, RadarIcon, GlobeIcon,
} from "@/components/ui/aviation-icons";
import { ArrowLeft, Check, Send, Calendar, ArrowRight } from "lucide-react";
const serviceParamMap: Record<string, string> = {
  career: "Career Consultancy",
  speaking: "Speaking Engagement",
  meeting: "Face To Face Meeting",
  mentorship: "Mentorship",
  leases: "Aircraft Leases",
  charters: "Charters Services",
};

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00",
];

const services = [
  { id: "Career Consultancy", icon: CompassIcon, desc: "Personalized career guidance for aviation professionals", duration: "1 hr" },
  { id: "Speaking Engagement", icon: GlobeIcon, desc: "Keynote speaking and panel participation", duration: "1 hr" },
  { id: "Face To Face Meeting", icon: WingsIcon, desc: "Confidential one-on-one strategic discussions", duration: "30 mins" },
  { id: "Mentorship", icon: ShieldIcon, desc: "Structured leadership development for emerging leaders", duration: "1 hr" },
  { id: "Aircraft Leases", icon: RadarIcon, desc: "Lease vs. buy analysis and fleet strategy", duration: "1 hr" },
  { id: "Charters Services", icon: PlaneIcon, desc: "Charter operations and service delivery consulting", duration: "1 hr" },
];

type Question = { label: string; key: string; type: "text" | "select" | "number" | "textarea"; options?: string[]; placeholder?: string };

const serviceQuestions: Record<string, Question[]> = {
  "Career Consultancy": [
    { label: "What is your current role or title?", key: "currentRole", type: "text", placeholder: "e.g. First Officer, Ramp Supervisor" },
    { label: "How many years of aviation experience do you have?", key: "experience", type: "number", placeholder: "e.g. 5" },
    { label: "Do you currently hold any type ratings?", key: "typeRatings", type: "text", placeholder: "e.g. A320, B737 — or None" },
    { label: "What is your primary career goal?", key: "careerGoal", type: "select", options: ["Command Upgrade", "Type Rating", "Management Transition", "Airline Entry", "Career Pivot", "Entrepreneurship", "Other"] },
    { label: "Which sector are you targeting?", key: "sector", type: "select", options: ["Commercial Airlines", "Business Aviation", "Cargo / Freight", "Aircraft Leasing", "Regulatory / Government", "Maintenance / MRO"] },
    { label: "What is your preferred timeline for this transition?", key: "timeline", type: "select", options: ["Within 3 months", "Within 6 months", "Within 12 months", "Flexible", "Just exploring"] },
    { label: "Anything specific you would like to address?", key: "careerNotes", type: "textarea", placeholder: "Specific goals, concerns, or questions..." },
  ],
  "Speaking Engagement": [
    { label: "What is the name of your event?", key: "eventName", type: "text", placeholder: "e.g. Africa Aviation Summit 2026" },
    { label: "What type of event is this?", key: "eventType", type: "select", options: ["Conference", "Corporate Event", "Panel Discussion", "Workshop", "University / Academic", "Podcast / Media", "Other"] },
    { label: "What is the expected date or date range?", key: "eventDate", type: "text", placeholder: "e.g. 15 Oct 2026 or Q4 2026" },
    { label: "Where will the event be held?", key: "eventLocation", type: "text", placeholder: "City, Country" },
    { label: "What is the expected audience size?", key: "audienceSize", type: "number", placeholder: "e.g. 500" },
    { label: "How long would you like the session to be?", key: "sessionDuration", type: "select", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes", "Half-day", "Full-day", "Flexible"] },
    { label: "What topic or theme would you like addressed?", key: "topic", type: "textarea", placeholder: "Tell us about the theme or specific topic..." },
    { label: "Will there be a Q&A session?", key: "qAndA", type: "select", options: ["Yes — as part of the session", "Yes — a dedicated Q&A segment", "No Q&A planned", "Not sure yet"] },
    { label: "Do you require travel arrangements?", key: "travelRequired", type: "select", options: ["Yes — domestic", "Yes — international", "No, travel not needed", "Not sure yet"] },
    { label: "Any additional requirements or AV needs?", key: "speakingNotes", type: "textarea", placeholder: "AV equipment, panel format, recording permission, etc." },
  ],
  "Face To Face Meeting": [
    { label: "Where would you like to meet?", key: "location", type: "text", placeholder: "e.g. Accra, Ghana or Virtual" },
    { label: "What topics would you like to discuss?", key: "topics", type: "textarea", placeholder: "Briefly outline what you want to discuss..." },
    { label: "How urgent is this meeting?", key: "urgency", type: "select", options: ["This week", "Within 2 weeks", "Within a month", "No rush"] },
    { label: "Are you representing an organization?", key: "representing", type: "select", options: ["Yes — Company / Institution", "Yes — Government Agency", "No — Personal Capacity"] },
    { label: "How long do you expect the meeting to last?", key: "meetingDuration", type: "select", options: ["30 minutes", "1 hour", "2 hours", "Flexible"] },
    { label: "Would you like this meeting to be confidential?", key: "confidential", type: "select", options: ["Yes, confidential", "No, not required"] },
  ],
  "Mentorship": [
    { label: "What is your current role?", key: "currentRole", type: "text", placeholder: "e.g. Ramp Supervisor" },
    { label: "How many years have you been in aviation?", key: "experience", type: "number", placeholder: "e.g. 3" },
    { label: "What is your primary development area?", key: "focusArea", type: "select", options: ["Flight Operations", "Management & Leadership", "Safety & Compliance", "Commercial Strategy", "Aircraft Acquisition", "General Career Growth"] },
    { label: "What mentorship duration are you looking for?", key: "mentorshipDuration", type: "select", options: ["3 months", "6 months", "12 months", "Open-ended"] },
    { label: "How often would you like to meet?", key: "meetingFrequency", type: "select", options: ["Weekly", "Bi-weekly", "Monthly", "As needed"] },
    { label: "What specific goals do you hope to achieve?", key: "goals", type: "textarea", placeholder: "Describe your goals for this mentorship..." },
    { label: "Do you have any previous mentorship experience?", key: "prevMentorship", type: "select", options: ["Yes, as a mentee", "Yes, as a mentor", "No, this would be my first"] },
  ],
  "Aircraft Leases": [
    { label: "What aircraft type(s) are you interested in?", key: "aircraftType", type: "text", placeholder: "e.g. A320, B737-800" },
    { label: "What region will the aircraft operate in?", key: "region", type: "select", options: ["Africa", "Middle East", "Asia Pacific", "Europe", "North America", "Latin America", "Global"] },
    { label: "What lease type do you prefer?", key: "leaseType", type: "select", options: ["Dry Lease", "Wet Lease (ACMI)", "Both / Not Sure", "Sale & Leaseback"] },
    { label: "How many aircraft are you looking to acquire?", key: "fleetSize", type: "number", placeholder: "e.g. 3" },
    { label: "What is your expected timeline?", key: "leaseTimeline", type: "select", options: ["Immediate", "3–6 months", "6–12 months", "Just exploring"] },
    { label: "Do you have financing in place?", key: "financing", type: "select", options: ["Yes, financing secured", "In progress", "Not yet", "Not applicable"] },
    { label: "Is this a new operation or an expansion?", key: "operationType", type: "select", options: ["New operation", "Fleet expansion", "Fleet replacement", "Consulting for a client"] },
  ],
  "Charters Services": [
    { label: "What routes or regions do you operate?", key: "routes", type: "text", placeholder: "e.g. West Africa, ACC–LOS" },
    { label: "What passenger capacity do you need?", key: "capacity", type: "select", options: ["Under 20", "20–50", "50–100", "100+", "Not sure yet"] },
    { label: "What service level are you targeting?", key: "serviceLevel", type: "select", options: ["Standard", "Premium / VIP", "Both", "Not sure yet"] },
    { label: "Are you currently operating charters?", key: "operating", type: "select", options: ["Yes, actively operating", "Yes, planning to expand", "No, exploring entry", "Consulting for a client"] },
    { label: "What is your expected launch timeline?", key: "charterTimeline", type: "select", options: ["Already operating", "Within 3 months", "Within 6 months", "Within 12 months", "Just exploring"] },
    { label: "Do you need support with certification or compliance?", key: "certification", type: "select", options: ["Yes, need regulatory guidance", "Not at this time", "Not sure yet"] },
    { label: "Describe your charter needs in detail", key: "charterNotes", type: "textarea", placeholder: "Fleet, business model, target market, or any other details..." },
  ],
};

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const questionVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [qDirection, setQDirection] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    name: "", email: "", phone: "", company: "", service: "",
    date: "", time: "", message: "", videoCall: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam && serviceParamMap[serviceParam]) {
      const svc = serviceParamMap[serviceParam];
      setForm((prev) => ({ ...prev, service: svc }));
      setStep(2);
    }
  }, []);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function goTo(s: number) {
    setDirection(s > step ? 1 : -1);
    if (s !== 2) setQIndex(0);
    setStep(s);
  }

  function nextQuestion() {
    if (qIndex < questions.length - 1) {
      setQDirection(1);
      setQIndex((i) => i + 1);
    } else {
      goTo(3);
    }
  }

  function prevQuestion() {
    if (qIndex > 0) {
      setQDirection(-1);
      setQIndex((i) => i - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const questions: Record<string, string> = {};
      serviceQuestions[selectedService]?.forEach((q) => {
        if (form[q.key]) questions[q.key] = form[q.key];
      });
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, questions }),
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }
    setSubmitted(true);
  }

  const selectedService = form.service;
  const questions = selectedService ? serviceQuestions[selectedService] : [];
  const currentQ = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

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
              We will review your <span className="text-foreground/70 font-medium">{form.service?.toLowerCase()}</span> request
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
            {/* Progress steps */}
            <div className="flex items-center gap-4 mb-12">
              {[
                { n: 1, label: "Details & Service" },
                { n: 2, label: "Tell Us More" },
                { n: 3, label: "Schedule & Review" },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors shrink-0 ${
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
                {/* STEP 1 — Contact + Service */}
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

                    <Button
                      type="button"
                      onClick={() => { setQIndex(0); goTo(2); }}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}

                {/* STEP 2 — Conversational questions */}
                {step === 2 && currentQ && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    {/* Service header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-input">
                      {(() => {
                        const svc = services.find((s) => s.id === selectedService);
                        const Icon = svc?.icon || CompassIcon;
                        return <Icon className="size-5 text-primary" />;
                      })()}
                      <div>
                        <p className="text-sm font-semibold text-foreground">{selectedService}</p>
                        <p className="text-xs text-foreground/40">Tell us more about your needs</p>
                      </div>
                    </div>

                    {/* Question progress */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground/30 shrink-0 tabular-nums">
                        {qIndex + 1} of {questions.length}
                      </span>
                    </div>

                    {/* Question card */}
                    <div className="min-h-[200px] flex items-center">
                      <AnimatePresence mode="wait" custom={qDirection}>
                        <motion.div
                          key={currentQ.key}
                          variants={questionVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          custom={qDirection}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="w-full"
                        >
                          <div className="bg-secondary/20 border border-input rounded-xl p-6 mb-5">
                            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                              {currentQ.label}
                            </p>
                          </div>

                          <div>
                            {currentQ.type === "select" ? (
                              <div className="grid gap-2">
                                {currentQ.options?.map((o) => {
                                  const selected = form[currentQ.key] === o;
                                  return (
                                    <button
                                      key={o}
                                      type="button"
                                      onClick={() => update(currentQ.key, o)}
                                      className={`text-left w-full px-4 py-3 rounded-lg border text-sm transition-all ${
                                        selected
                                          ? "bg-primary/10 border-primary/40 text-primary font-medium"
                                          : "bg-secondary/30 border-input text-foreground/60 hover:border-foreground/30"
                                      }`}
                                    >
                                      {o}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : currentQ.type === "textarea" ? (
                              <textarea
                                rows={3}
                                value={form[currentQ.key] || ""}
                                onChange={(e) => update(currentQ.key, e.target.value)}
                                className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg resize-none"
                                placeholder={currentQ.placeholder || ""}
                              />
                            ) : (
                              <input
                                type={currentQ.type}
                                value={form[currentQ.key] || ""}
                                onChange={(e) => update(currentQ.key, e.target.value)}
                                className="w-full bg-secondary/50 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                                placeholder={currentQ.placeholder || ""}
                              />
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        {qIndex > 0 ? (
                          <Button type="button" variant="ghost" onClick={prevQuestion} className="gap-2 text-foreground/40 hover:text-foreground">
                            <ArrowLeft className="size-4" />
                            Previous
                          </Button>
                        ) : (
                          <Button type="button" variant="ghost" onClick={() => goTo(1)} className="gap-2 text-foreground/40 hover:text-foreground">
                            <ArrowLeft className="size-4" />
                            Back to services
                          </Button>
                        )}
                      </div>
                      <Button type="button" onClick={nextQuestion} size="lg" className="gap-2">
                        {isLast ? "Review Booking" : "Next"}
                        {!isLast && <ArrowRight className="size-4" />}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Date, time, review */}
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
                      <p className="text-sm font-semibold text-foreground mb-4">
                        Meeting Preference
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => update("videoCall", "in-person")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            form.videoCall === "in-person"
                              ? "bg-primary/10 border-primary/40"
                              : "bg-secondary/30 border-input hover:border-foreground/30"
                          }`}
                        >
                          <span className="text-lg block mb-1">👤</span>
                          <p className={`text-xs font-semibold ${
                            form.videoCall === "in-person" ? "text-primary" : "text-foreground/60"
                          }`}>
                            In Person
                          </p>
                          <p className="text-[10px] text-foreground/30 mt-0.5">Meet face to face</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => update("videoCall", "video")}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            form.videoCall === "video"
                              ? "bg-primary/10 border-primary/40"
                              : "bg-secondary/30 border-input hover:border-foreground/30"
                          }`}
                        >
                          <span className="text-lg block mb-1">📹</span>
                          <p className={`text-xs font-semibold ${
                            form.videoCall === "video" ? "text-primary" : "text-foreground/60"
                          }`}>
                            Video Call
                          </p>
                          <p className="text-[10px] text-foreground/30 mt-0.5">Remote via video</p>
                        </button>
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
                        {form.videoCall && (
                          <div>
                            <span className="text-foreground/30 text-xs">Format</span>
                            <p className="text-foreground/70">{form.videoCall === "video" ? "Video Call" : "In Person"}</p>
                          </div>
                        )}
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
                      <Button type="button" variant="outline" onClick={() => { setQIndex(questions.length - 1); goTo(2); }} className="gap-2">
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
