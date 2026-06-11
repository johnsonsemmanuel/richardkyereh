"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAwardImagePaths,
  getAllAwardHeroImages,
} from "@/lib/images";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";

type Award = { year: string; title: string; org: string; folder: string };

const awards: Award[] = [
  { year: "2024", title: "Aviation Leadership Award", org: "African Aviation Summit", folder: "african-union-saatm-2019" },
  { year: "2024", title: "Excellence in Aerospace Consulting", org: "Global Aviation Awards", folder: "airline-business-summit-mauritius-2019" },
  { year: "2023", title: "Safety Innovation Recognition", org: "ICAO Regional Forum", folder: "iata-regional-forum-accra-2019" },
  { year: "2023", title: "Outstanding Contribution to Aviation", org: "West African Aviation Conference", folder: "accra-weizo-2018" },
  { year: "2022", title: "Best Airline Route Development", org: "African Airlines Association", folder: "routes-africa-accra-2018" },
  { year: "2022", title: "Young Aviation Professional Award", org: "Youth in Aviation Summit", folder: "aviadev-cape-town-2019" },
  { year: "2021", title: "Operational Excellence Award", org: "Ghana Aviation Awards", folder: "aviation-festival-africa-2017" },
  { year: "2021", title: "Community Impact Recognition", org: "Aviation Social Responsibility Forum", folder: "media-engagement" },
  { year: "2020", title: "Pandemic Response Leadership", org: "ICAO Regional Office", folder: "aviadev-cape-town-2018" },
  { year: "2019", title: "Emerging Leader in Aviation", org: "African Business Aviation Association", folder: "apg-monaco-2018" },
  { year: "2019", title: "Passenger Experience Innovation", org: "World Aviation Summit", folder: "airline-business-seminar-seychelles-2018" },
  { year: "2018", title: "Rising Star Award", org: "Ghana Aviation Excellence Awards", folder: "routes-africa-mombasa-2019" },
];

const years = [...new Set(awards.map((a) => a.year))].sort().reverse();
const heroImages = getAllAwardHeroImages();

function AwardCard({ award, index, onSelect }: {
  award: Award;
  index: number;
  onSelect: () => void;
}) {
  const images = getAwardImagePaths(award.folder);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onSelect}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/50 border border-border hover:border-foreground/20 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 text-left shadow-card"
    >
      <motion.img
        src={images[0]}
        alt={`${award.title} — ${award.org}, ${award.year}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[10px] font-semibold text-foreground/50 tracking-[0.15em] uppercase">
          {award.year}
        </span>
        <h3 className="text-sm font-semibold text-foreground mt-1 leading-tight">
          {award.title}
        </h3>
        <p className="text-xs text-foreground/50 mt-0.5">{award.org}</p>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500 rounded-2xl pointer-events-none" />
    </motion.button>
  );
}

function Lightbox({
  award,
  onClose,
}: {
  award: Award;
  onClose: () => void;
}) {
  const images = getAwardImagePaths(award.folder);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i > 0 ? i - 1 : images.length - 1));
      if (e.key === "ArrowRight") setIdx((i) => (i < images.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="size-5 text-foreground" />
      </button>

      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>
      )}
      {idx < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="size-5 text-foreground" />
        </button>
      )}

      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-5xl w-full max-h-[85vh] mx-4 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt={`${award.title} — ${award.org}`}
          className="w-full h-full max-h-[85vh] object-contain bg-background"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6 pt-16">
          <span className="text-xs font-semibold text-foreground/50 tracking-[0.15em] uppercase">
            {award.year} &middot; {award.org}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
            {award.title}
          </h2>
        </div>
        <div className="absolute top-4 left-4 text-xs text-foreground/50 tabular-nums">
          {idx + 1} / {images.length}
        </div>
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? "w-6 h-1.5 bg-foreground"
                  : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function HeroBackground({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

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
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}

export default function AwardsPage() {
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [lightboxAward, setLightboxAward] = useState<Award | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filtered = yearFilter
    ? awards.filter((a) => a.year === yearFilter)
    : awards;

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
        <HeroBackground images={heroImages} />
        <div
          className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <p className="text-foreground/60 text-sm font-medium tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
              <Award className="size-4" />
              Recognition
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              Awards &
              <br />
              <span className="text-foreground/60">honours.</span>
            </h1>
            <p className="mt-6 text-foreground/60 leading-relaxed max-w-lg">
              A record of industry recognition spanning {Math.min(...awards.map((a) => +a.year))}&ndash;
              {Math.max(...awards.map((a) => +a.year))}.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={scrollRef} className="relative pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none"
          >
            <button
              onClick={() => setYearFilter(null)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                yearFilter === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent border-border text-foreground/50 hover:border-foreground/30 hover:text-foreground/70"
              }`}
            >
              All
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                  yearFilter === y
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-foreground/50 hover:border-foreground/30 hover:text-foreground/70"
                }`}
              >
                {y}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={yearFilter ?? "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((award, i) => (
                <AwardCard
                  key={`${award.year}-${award.title}`}
                  award={award}
                  index={i}
                  onSelect={() => setLightboxAward(award)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-foreground/50 text-sm py-20"
            >
              No awards found for {yearFilter}.
            </motion.p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxAward && (
          <Lightbox
            award={lightboxAward}
            onClose={() => setLightboxAward(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
