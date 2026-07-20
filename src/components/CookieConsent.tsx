"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (accepted === "true") {
      setMinimized(true);
      return;
    }
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
    setMinimized(true);
  }

  function expand() {
    setShow(true);
    setMinimized(false);
  }

  return (
    <AnimatePresence>
      {minimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={expand}
          className="fixed bottom-4 left-4 z-40 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/50 transition-colors"
          aria-label="Cookie settings"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-foreground/60">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a7.3 7.3 0 0 1 3.5 1.5 4.5 4.5 0 0 0-1.5 6 4.5 4.5 0 0 0 6 1.5A7 7 0 0 1 12 22a7 7 0 0 1 0-14z" />
            <circle cx="9" cy="9" r=".5" fill="currentColor" />
            <circle cx="15" cy="11" r=".5" fill="currentColor" />
            <circle cx="11" cy="15" r=".5" fill="currentColor" />
          </svg>
        </motion.button>
      )}

      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Cookie Notice
                </p>
                <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                  This site uses cookies to improve your experience. By continuing,
                  you agree to our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms
                  </Link>
                  .
                </p>
              </div>
              <button
                onClick={accept}
                className="shrink-0 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
