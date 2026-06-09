"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeadsetIcon, X, Phone, Video, MessageCircle, PhoneCall, Send, ArrowLeft, Bot, User } from "lucide-react";
import { PlaneIcon, CompassIcon } from "@/components/ui/aviation-icons";

const PHONE = "+233 24 368 1135";
const PHONE_HREF = "tel:+233243681135";

type View = "menu" | "chat";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

function botReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("career") || lower.includes("job") || lower.includes("pilot") || lower.includes("training"))
    return "For career guidance, I'd recommend booking a **Career Consultancy** session. You can also explore our [Career Consultancy page](/services/career-consultancy) for more details. Would you like to book directly?";
  if (lower.includes("speak") || lower.includes("keynote") || lower.includes("event") || lower.includes("conference"))
    return "Richard is available for speaking engagements at conferences, corporate events, and panels. Check our [Speaking Engagement page](/services/speaking-engagement) or go ahead and [book a session](/booking).";
  if (lower.includes("meet") || lower.includes("face") || lower.includes("discuss") || lower.includes("strategy"))
    return "You can schedule a confidential **Face To Face Meeting** — in person or via video call. Pick a time that works for you on our [booking page](/booking).";
  if (lower.includes("mentor") || lower.includes("mentorship") || lower.includes("guidance") || lower.includes("develop"))
    return "Our **Mentorship** program is designed for emerging aviation leaders. Learn more on the [Mentorship page](/services/mentorship) or [book a session](/booking).";
  if (lower.includes("lease") || lower.includes("aircraft") || lower.includes("fleet"))
    return "For **Aircraft Leases** and fleet strategy, Richard offers expert advisory. Visit our [Aircraft Leases page](/services/aircraft-leases) or [book a consultation](/booking).";
  if (lower.includes("charter") || lower.includes("charters"))
    return "Our **Charters Services** consulting covers operations, certification, and service standards. See the [Charters page](/services/charters-services) or [book now](/booking).";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("free") || lower.includes("pay"))
    return "All initial consultations are **free of charge**. Select your service on our [booking page](/booking) to get started with no commitment.";
  if (lower.includes("call") || lower.includes("phone") || lower.includes("speak") || lower.includes("talk"))
    return `You can reach us directly at **${PHONE}** or schedule a call via our [booking page](/booking).`;
  if (lower.includes("video") || lower.includes("zoom") || lower.includes("remote"))
    return "Video consultations are available for all services. When booking, select **Video Call** as your preferred format.";
  return "Thank you for your message. I can help you with bookings, service information, or connect you with Richard directly. Would you like to:\n\n• [Browse our services](/services)\n• [Book a consultation](/booking)\n• [Call us](tel:+233243681135)\n• Or just keep chatting?";
}

const quickReplies = [
  "Tell me about your services",
  "How much does it cost?",
  "I need career guidance",
  "I want to book a speaking event",
  "Schedule a meeting with Richard",
];

export function SupportAgent() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi there! I'm Richard's aviation assistant. How can I help you today? You can ask me about services, pricing, or booking." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [view]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: ChatMessage = { role: "bot", text: botReply(text.trim()) };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function openChat(prefilled?: string) {
    setView("chat");
    if (prefilled) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: prefilled },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: botReply(prefilled) },
        ]);
      }, 600);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            <div className="bg-card border border-border/60 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col max-h-[70vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/60 shrink-0">
                <div className="flex items-center gap-3">
                  {view === "chat" && (
                    <button onClick={() => setView("menu")} className="text-foreground/30 hover:text-foreground transition-colors">
                      <ArrowLeft className="size-4" />
                    </button>
                  )}
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                    {view === "chat" ? <Bot className="size-4 text-primary" /> : <PlaneIcon className="size-4 text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Aviation Support</p>
                    <p className="text-[10px] text-foreground/40">
                      {view === "chat" ? "Online — replies instantly" : "Guidance & Assistance"}
                    </p>
                  </div>
                </div>
                <button onClick={() => { setOpen(false); setView("menu"); }} className="text-foreground/30 hover:text-foreground transition-colors" aria-label="Close">
                  <X className="size-4" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 p-4">
                <AnimatePresence mode="wait">
                  {view === "menu" && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        Need help deciding? Our support team can guide you to the right service or connect you directly with Mr. Kyereh.
                      </p>

                      <div className="grid gap-2">
                        <button onClick={() => window.location.href = PHONE_HREF} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all group text-left">
                          <PhoneCall className="size-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Call Us Directly</p>
                            <p className="text-[10px] text-foreground/40">Speak with us on {PHONE}</p>
                          </div>
                        </button>
                        <Link href="/booking?service=meeting" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all group">
                          <Video className="size-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Video Consultation</p>
                            <p className="text-[10px] text-foreground/40">Face-to-face guidance via video call</p>
                          </div>
                        </Link>
                        <button onClick={() => openChat("I need help deciding which service is right for me")} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all group text-left">
                          <CompassIcon className="size-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Pre-Booking Guidance</p>
                            <p className="text-[10px] text-foreground/40">Chat with us to find the right service</p>
                          </div>
                        </button>
                        <button onClick={() => openChat()} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all group text-left">
                          <MessageCircle className="size-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Quick Question</p>
                            <p className="text-[10px] text-foreground/40">Instant answers from our assistant</p>
                          </div>
                        </button>
                      </div>

                      <div className="pt-3 border-t border-border/60">
                        <Button asChild size="sm" className="w-full">
                          <Link href="/booking" onClick={() => setOpen(false)}>Book Richard Directly</Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {view === "chat" && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                          <div className={`size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            msg.role === "user" ? "bg-primary/10" : "bg-secondary/50"
                          }`}>
                            {msg.role === "user" ? (
                              <User className="size-3.5 text-primary/60" />
                            ) : (
                              <Bot className="size-3.5 text-foreground/40" />
                            )}
                          </div>
                          <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary/50 text-foreground/70 border border-input/40"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {messages.length === 1 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {quickReplies.map((qr) => (
                            <button
                              key={qr}
                              onClick={() => sendMessage(qr)}
                              className="text-[11px] px-3 py-1.5 rounded-full border border-input/50 text-foreground/50 hover:border-primary/40 hover:text-primary transition-all"
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}

                      <div ref={chatEndRef} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chat input */}
              {view === "chat" && (
                <div className="p-3 border-t border-border/60 shrink-0">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 bg-secondary/50 border border-input rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim()}
                      className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 shrink-0"
                    >
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50 size-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Open support"
      >
        {open ? <X className="size-5" /> : <HeadsetIcon className="size-5" />}
      </motion.button>
    </>
  );
}
