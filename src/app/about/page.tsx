import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { placeholderImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Richard Kyereh, aerospace and aviation consultant with 15+ years of global experience.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                About
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Richard
                <br />
                <span className="text-foreground/50">Kyereh.</span>
              </h1>
            </div>
            <div className="space-y-6">
              <p className="text-foreground/60 leading-relaxed text-lg">
                Richard Kyereh is an aerospace and aviation consultant with over
                15 years of experience across airlines, regulatory authorities,
                and investment firms. He has worked on four continents,
                advising on fleet strategies valued at over $2.8 billion.
              </p>
              <p className="text-foreground/40 leading-relaxed">
                His career spans commercial airlines, business aviation, and
                government aviation authorities. He has led safety audits,
                designed fleet acquisition strategies, and advised on market
                entry for startups and established carriers alike.
              </p>
              <p className="text-foreground/40 leading-relaxed">
                Richard holds advanced certifications in aviation safety
                management, aircraft asset management, and airline operations.
                He is a recognized speaker at industry conferences and
                contributes to regulatory working groups on safety and
                sustainability.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Experience",
                value: "15+ years",
                desc: "Across airlines, regulators, and investment firms on four continents.",
              },
              {
                label: "Expertise",
                value: "Full spectrum",
                desc: "From safety management systems to fleet strategy and sustainability.",
              },
              {
                label: "Impact",
                value: "$2.8B+",
                desc: "Fleet value advised across commercial and business aviation.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-8 bg-secondary/30 border border-input"
              >
                <p className="text-xs text-primary uppercase tracking-widest font-medium">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-foreground/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Press & Media
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Featured
              <br />
              <span className="text-foreground/50">coverage.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            <GlassBlogCard
              title="Aviation Safety in a Growing Market"
              excerpt="Richard Kyereh shares insights on safety management challenges facing rapidly expanding African carriers."
              image={placeholderImage("Aviation Safety", "Featured interview", "05080F,1A2D4A")}
              author={{ name: "Aviation Week", avatar: "" }}
              date="Feb 2026"
              readTime="Featured"
              tags={["Safety", "Interview"]}
            />
            <GlassBlogCard
              title="The Future of Fleet Financing in Africa"
              excerpt="An in-depth look at emerging lease structures and investment vehicles for the continent's airlines."
              image={placeholderImage("Fleet Financing", "Africa focus", "0A0F1A,111827")}
              author={{ name: "Airline Economics", avatar: "" }}
              date="Jan 2026"
              readTime="Featured"
              tags={["Fleet", "Finance"]}
            />
            <GlassBlogCard
              title="Sustainability Targets: Realistic Pathways"
              excerpt="Richard Kyereh on what realistic carbon reduction looks like for airlines in emerging markets."
              image={placeholderImage("Sustainability", "Realistic pathways", "05080F,1F2937")}
              author={{ name: "Green Aviation", avatar: "" }}
              date="Dec 2025"
              readTime="Featured"
              tags={["Sustainability", "Analysis"]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
