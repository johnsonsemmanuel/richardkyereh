"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awardImages } from "@/lib/images";
import { Reveal } from "@/components/ui/reveal";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";

type Award = { year: string; title: string; org: string; gradient: string };

const awards: Award[] = [
  { year: "2024", title: "Aviation Leadership Award", org: "African Aviation Summit", gradient: "05080F,1A2D4A" },
  { year: "2024", title: "Excellence in Aerospace Consulting", org: "Global Aviation Awards", gradient: "0A0F1A,1F2937" },
  { year: "2023", title: "Safety Innovation Recognition", org: "ICAO Regional Forum", gradient: "05080F,111827" },
  { year: "2023", title: "Outstanding Contribution to Aviation", org: "West African Aviation Conference", gradient: "0A0F1A,1A2D4A" },
  { year: "2022", title: "Best Airline Route Development", org: "African Airlines Association", gradient: "05080F,1F2937" },
  { year: "2022", title: "Young Aviation Professional Award", org: "Youth in Aviation Summit", gradient: "0A0F1A,111827" },
  { year: "2021", title: "Operational Excellence Award", org: "Ghana Aviation Awards", gradient: "05080F,1A2D4A" },
  { year: "2021", title: "Community Impact Recognition", org: "Aviation Social Responsibility Forum", gradient: "0A0F1A,1F2937" },
  { year: "2020", title: "Pandemic Response Leadership", org: "ICAO Regional Office", gradient: "05080F,111827" },
  { year: "2019", title: "Emerging Leader in Aviation", org: "African Business Aviation Association", gradient: "0A0F1A,1A2D4A" },
  { year: "2019", title: "Passenger Experience Innovation", org: "World Aviation Summit", gradient: "05080F,1F2937" },
  { year: "2018", title: "Rising Star Award", org: "Ghana Aviation Excellence Awards", gradient: "0A0F1A,111827" },
];

const years = [...new Set(awards.map((a) => a.year))].sort().reverse();

function AwardCard({ award, index, onSelect }: {
  award: Award;
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={onSelect}
      className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-input/50 hover:border-primary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-left"
      style={{ contentVisibility: "auto" }}
    >
      <img
        src={awardImages[index % awardImages.length]}
        alt={`${award.title} — ${award.org}, ${award.year}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
          {award.year}
        </span>
        <h3 className="text-sm font-semibold text-white mt-0.5 leading-tight">
          {award.title}
        </h3>
        <p className="text-xs text-white/50 mt-0.5">{award.org}</p>
      </div>
    </motion.button>
  );
}

function Lightbox({
  awards,
  initialIndex,
  onClose,
}: {
  awards: Award[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const imgRef = useRef<HTMLImageElement>(null);
  const award = awards[idx];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i > 0 ? i - 1 : awards.length - 1));
      if (e.key === "ArrowRight") setIdx((i) => (i < awards.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, awards.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="size-5 text-white" />
      </button>

      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5 text-white" />
        </button>
      )}
      {idx < awards.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label="Next"
        >
          <ChevronRight className="size-5 text-white" />
        </button>
      )}

      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={awardImages[idx % awardImages.length]}
          alt={`${award.title} — ${award.org}`}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
          <span className="text-xs font-semibold text-white/40 tracking-wider uppercase">
            {award.year} &middot; {award.org}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {award.title}
          </h2>
        </div>

        <div className="absolute top-4 left-4 text-xs text-white/30 tabular-nums">
          {idx + 1} / {awards.length}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AwardsPage() {
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = yearFilter
    ? awards.filter((a) => a.year === yearFilter)
    : awards;

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
              <Award className="size-4" />
              Recognition
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              Awards &
              <br />
              <span className="text-foreground/50">honours.</span>
            </h1>
            <p className="mt-6 text-foreground/40 leading-relaxed">
              A record of industry recognition spanning {Math.min(...awards.map((a) => +a.year))}&ndash;
              {Math.max(...awards.map((a) => +a.year))}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Year filter */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setYearFilter(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                yearFilter === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 border-input text-foreground/50 hover:border-foreground/30"
              }`}
            >
              All
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  yearFilter === y
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 border-input text-foreground/50 hover:border-foreground/30"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={yearFilter ?? "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((award, i) => (
                <AwardCard
                  key={`${award.year}-${award.title}`}
                  award={award}
                  index={i}
                  onSelect={() => openLightbox(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-foreground/30 text-sm py-20">
              No awards found for {yearFilter}.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            awards={filtered}
            initialIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
