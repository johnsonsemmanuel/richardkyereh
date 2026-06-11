"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroBackgroundProps {
  images: string[];
  overlay?: string;
  interval?: number;
}

export function HeroBackground({
  images,
  overlay = "bg-background/80",
  interval = 5000,
}: HeroBackgroundProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={images[current]}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
