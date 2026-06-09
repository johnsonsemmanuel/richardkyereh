"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { heroSlides, heroBg } from "@/lib/images";

export function HeroSection() {
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
    <section className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={heroBg(slide.gradient)}
              alt=""
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6 pt-28 lg:pt-36 pb-20">
        <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
          <div className="relative w-full aspect-[3/2]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ x: 200, opacity: 0, scale: 0.97 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -200, opacity: 0, scale: 0.97 }}
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
                  <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-md italic">
                    &ldquo;{slide.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 py-4 bg-background/50 backdrop-blur-sm">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-primary w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-primary text-sm font-medium tracking-widest uppercase mt-12 mb-6">
          Aerospace & Aviation Consultancy
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground text-center">
          Strategic Clarity
          <br />
          <span className="text-foreground/50">for the skies.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-foreground/40 leading-relaxed text-center max-w-2xl">
          Richard Kyereh provides world-class aerospace advisory from
          fleet strategy and safety compliance to operational excellence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/booking">Book a Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
