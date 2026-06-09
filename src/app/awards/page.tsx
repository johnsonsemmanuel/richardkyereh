import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards",
  description: "Industry awards and recognitions earned by Richard Kyereh.",
};

const awards = [
  {
    year: "2024",
    title: "Aviation Leadership Award",
    org: "African Aviation Summit",
  },
  {
    year: "2023",
    title: "Excellence in Aerospace Consulting",
    org: "Global Aviation Awards",
  },
  {
    year: "2022",
    title: "Safety Innovation Recognition",
    org: "ICAO Regional Forum",
  },
  {
    year: "2021",
    title: "Outstanding Contribution to Aviation",
    org: "West African Aviation Conference",
  },
];

export default function AwardsPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Recognition
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
            Awards &
            <br />
            <span className="text-foreground/50">honours.</span>
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award) => (
            <div
              key={award.title}
              className="bg-secondary/50 border border-input p-8"
            >
              <p className="text-xs text-foreground/30 font-semibold tracking-wider uppercase mb-2">
                {award.year}
              </p>
              <h3 className="text-xl font-semibold text-foreground">
                {award.title}
              </h3>
              <p className="text-sm text-foreground/40 mt-1">{award.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
