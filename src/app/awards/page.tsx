"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAwardMediaPaths,
} from "@/lib/images";
import { X, ChevronLeft, ChevronRight, Award, Images } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { SectionHeader } from "@/components/ui/section-header";

type EventItem = {
  year: string;
  title: string;
  org: string;
  folder: string;
  captions?: Record<number, string>;
};

const events: EventItem[] = [
  {
    year: "2019",
    title: "African Union Summit for the Implementation of SAATM by Heads of States",
    org: "Addis Ababa, Ethiopia",
    folder: "african-union-saatm-2019",
  },
  {
    year: "2019",
    title: "AviaDev Aviation Development Conference",
    org: "Cape Town, South Africa",
    folder: "aviadev-cape-town-2019",
  },
  {
    year: "2019",
    title: "Airline Business Summit",
    org: "Mauritius",
    folder: "airline-business-summit-mauritius-2019",
  },
  {
    year: "2019",
    title: "IATA Regional Forum",
    org: "Accra, Ghana",
    folder: "iata-regional-forum-accra-2019",
  },
  {
    year: "2019",
    title: "Routes Africa",
    org: "Mombasa, Kenya",
    folder: "routes-africa-mombasa-2019",
  },
  {
    year: "2018",
    title: "APG World Connect Aviation Conference",
    org: "Monaco",
    folder: "apg-monaco-2018",
  },
  {
    year: "2018",
    title: "Routes Africa",
    org: "Accra, Ghana",
    folder: "routes-africa-accra-2018",
  },
  {
    year: "2018",
    title: "AviaDev Aviation Development Conference",
    org: "Cape Town, South Africa",
    folder: "aviadev-cape-town-2018",
  },
  {
    year: "2018",
    title: "Airline Business Seminar",
    org: "Seychelles",
    folder: "airline-business-seminar-seychelles-2018",
  },
  {
    year: "2018",
    title: "Accra Weizo Aviation Day Conference",
    org: "Accra, Ghana",
    folder: "accra-weizo-2018",
  },
  {
    year: "2017",
    title: "Aviation Festival - Africa",
    org: "Sandton, Johannesburg, South Africa",
    folder: "aviation-festival-africa-2017",
  },
  {
    year: "Media & Others",
    title: "Media Engagement / Others",
    org: "Asaase Radio, Metro TV, Aviatour, Young Aviators Ghana & More",
    folder: "media-engagement",
    captions: {
      0: "Aviation and AfCFTA — Asaase Radio",
      1: "Aviators Ghana",
      2: "Aviatour Conference",
      3: "Metro TV Ghana — AfCFTA and Aviation",
      4: "Kharkov National Airforce University Aviation Seminar",
      5: "SAATM and Aviation",
      6: "Industry Engagement",
      7: "Young Aviators Ghana",
    },
  },
];

const years = ["2019", "2018", "2017", "Media & Others"];

function EventCard({ event, index, onSelect }: {
  event: EventItem;
  index: number;
  onSelect: () => void;
}) {
  const media = getAwardMediaPaths(event.folder);
  const videoCount = media.filter((m) => m.type === "video").length;
  const imageCount = media.length - videoCount;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onSelect}
      className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border hover:border-primary/60 transition-all duration-300 text-left shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <img
        src={media[0].src}
        alt={`${event.title} - ${event.org}, ${event.year}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white border border-white/15">
        <Images className="size-3" />
        <span>
          {imageCount} {imageCount === 1 ? "Photo" : "Photos"}
          {videoCount > 0 ? ` · ${videoCount} Video` : ""}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <span className="text-[10px] font-semibold text-amber-300 tracking-[0.15em] uppercase">
          {event.year}
        </span>
        <h3 className="text-sm font-semibold text-white mt-1 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-xs text-white/80 mt-0.5 line-clamp-1">{event.org}</p>
      </div>
    </motion.button>
  );
}

function Lightbox({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const media = getAwardMediaPaths(event.folder);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i > 0 ? i - 1 : media.length - 1));
      if (e.key === "ArrowRight") setIdx((i) => (i < media.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, media.length]);

  const current = media[idx];
  const currentCaption = event.captions?.[idx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 size-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="size-5" />
      </button>

      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      {idx < media.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      )}

      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-5xl w-full max-h-[85vh] mx-4 rounded-2xl overflow-hidden flex items-center justify-center bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "video" ? (
          <video
            src={current.src}
            controls
            className="w-full max-h-[85vh] object-contain"
            style={{ maxHeight: "85vh" }}
          />
        ) : (
          <img
            src={current.src}
            alt={`${event.title} - ${event.org}`}
            className="w-full h-full max-h-[85vh] object-contain bg-black"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 pt-16 pointer-events-none">
          <span className="text-xs font-semibold text-amber-300 tracking-[0.15em] uppercase">
            {event.year} &middot; {event.org}
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">
            {currentCaption ? `${event.title} — ${currentCaption}` : event.title}
          </h2>
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-black/65 px-3 py-1 text-xs text-white tabular-nums">
          {idx + 1} / {media.length}
          {current.type === "video" && (
            <span className="ml-2 inline-flex items-center gap-1 text-amber-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3"><path d="M8 5v14l11-7z"/></svg>
              Video
            </span>
          )}
        </div>
      </motion.div>

      {media.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {media.map((item, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className={`rounded-full transition-[width,height,background-color] duration-150 ease-out flex items-center justify-center ${
                i === idx
                  ? "w-6 h-1.5 bg-white"
                  : item.type === "video"
                    ? "size-2 bg-amber-400 hover:bg-amber-300"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Media ${i + 1}`}
            >
              {item.type === "video" && i !== idx && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-1.5"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

const PAGE_SIZE = 12;

export default function AwardsPage() {
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [lightboxEvent, setLightboxEvent] = useState<EventItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = yearFilter
    ? events.filter((a) => a.year === yearFilter)
    : events;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleYearFilter(year: string | null) {
    setYearFilter(year);
    setCurrentPage(1);
  }

  return (
    <>
      <section className="section-bg-light pt-20 pb-8 sm:pt-28 sm:pb-12 lg:pt-36 lg:pb-16">
        <div className="premium-container">
          <SectionHeader
            title="Events &"
            subtitle="conferences."
            description="Keynote speaking, panel sessions, international aviation summits, and media engagements across Africa and the globe."
            icon={Award}
          />
        </div>
      </section>

      <section className="relative pb-16 sm:pb-24 lg:pb-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none"
          >
            <button
              onClick={() => handleYearFilter(null)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium border transition-[background-color,border-color,color] duration-150 ease-out ${
                yearFilter === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All ({events.length})
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => handleYearFilter(y)}
                className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium border transition-[background-color,border-color,color] duration-150 ease-out ${
                  yearFilter === y
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:border-foreground hover:text-foreground"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginated.map((event, i) => (
                <EventCard
                  key={`${event.folder}-${event.title}`}
                  event={event}
                  index={i}
                  onSelect={() => setLightboxEvent(event)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={currentPage <= 1 ? "pointer-events-none opacity-30" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-30" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-sm py-20"
            >
              No events found for {yearFilter}.
            </motion.p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxEvent && (
          <Lightbox
            event={lightboxEvent}
            onClose={() => setLightboxEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
