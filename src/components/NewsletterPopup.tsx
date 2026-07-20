"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem("newsletter-dismissed", "true");
    setShow(false);
  }

  async function handleSubmit(e: React.FormEvent) {
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
      setTimeout(dismiss, 2500);
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 120, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 120, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {subscribed ? (
              <div className="text-center py-4">
                <Mail className="size-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">You&apos;re in!</h3>
                <p className="text-sm text-foreground/50 mt-1">
                  Watch for industry insights from Richard Kyereh.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Aviation Insights</h3>
                    <p className="text-xs text-foreground/50">
                      Exclusive analysis from Richard Kyereh
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-secondary/50 border border-input rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-ring/50"
                  />
                  <Button type="submit" size="sm">
                    Subscribe
                  </Button>
                </form>
                <p className="text-[10px] text-foreground/30 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
