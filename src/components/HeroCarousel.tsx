"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides, heroBg } from "@/lib/images";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goTo = (index: number) => {
    setDir(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroBg(slide.gradient)}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">
              Richard Kyereh
            </p>
            <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-sm italic">
              &ldquo;{slide.quote}&rdquo;
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
