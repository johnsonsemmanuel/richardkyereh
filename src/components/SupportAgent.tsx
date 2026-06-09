"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeadsetIcon, X, Phone, Video, MessageCircle } from "lucide-react";
import { PlaneIcon, CompassIcon } from "@/components/ui/aviation-icons";

const supportOptions = [
  {
    label: "Schedule a Call",
    desc: "Speak directly with our aviation support team",
    icon: Phone,
    href: "/booking?service=career",
  },
  {
    label: "Video Consultation",
    desc: "Face-to-face guidance via video call",
    icon: Video,
    href: "/booking?service=meeting",
  },
  {
    label: "Pre-Booking Guidance",
    desc: "Not sure which service fits? We will help you decide.",
    icon: CompassIcon,
    href: "/contact",
  },
  {
    label: "Quick Question",
    desc: "Send us a message and we will respond within 24hrs",
    icon: MessageCircle,
    href: "/contact",
  },
];

export function SupportAgent() {
  const [open, setOpen] = useState(false);

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
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <PlaneIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Aviation Support</p>
                    <p className="text-[10px] text-foreground/40">Guidance &amp; Assistance</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-foreground/30 hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              <p className="text-xs text-foreground/50 mb-4 leading-relaxed">
                Need help deciding? Our support team can guide you to the right
                service or connect you directly with Mr. Kyereh.
              </p>

              <div className="grid gap-2">
                {supportOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <Link
                      key={opt.label}
                      href={opt.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all group"
                    >
                      <Icon className="size-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-[10px] text-foreground/40">{opt.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border/60">
                <Button asChild size="sm" className="w-full">
                  <Link href="/booking" onClick={() => setOpen(false)}>
                    Book Richard Directly
                  </Link>
                </Button>
              </div>
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
