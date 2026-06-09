import type { Metadata } from "next";
import { ElitePlanCard } from "@/components/ElitePlanCard";
import { placeholderImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive aerospace and aviation consultancy services by Richard Kyereh.",
};

const services = [
  {
    title: "Strategic Advisory",
    subtitle: "Core Service",
    description:
      "Fleet planning, route optimization, and market entry strategy for airlines and aerospace organizations.",
    image: placeholderImage("Strategic Advisory", "Fleet planning & M&A"),
    highlights: [
      "Fleet Planning",
      "Route Optimization",
      "Market Entry",
      "M&A Advisory",
    ],
  },
  {
    title: "Safety & Compliance",
    subtitle: "Core Service",
    description:
      "Safety management systems, regulatory audits, and ICAO certification support for global operators.",
    image: placeholderImage("Safety & Compliance", "SMS & audits", "0A0F1A,111827"),
    highlights: [
      "SMS Design",
      "EASA/FAA/ICAO",
      "Accident Investigation",
      "Security Protocols",
    ],
  },
  {
    title: "Fleet Management",
    subtitle: "Core Service",
    description:
      "End-to-end aircraft acquisition, lease negotiation, and asset lifecycle management services.",
    image: placeholderImage("Fleet Management", "Acquisition & leasing", "05080F,1F2937"),
    highlights: [
      "Acquisition",
      "Lease Negotiation",
      "Asset Valuation",
      "End-of-Life",
    ],
  },
  {
    title: "Operations Consulting",
    subtitle: "Core Service",
    description:
      "Operational audits, crew management optimization, and turnaround time reduction programs.",
    image: placeholderImage("Operations", "Efficiency & optimization", "0A0F1A,1A2D4A"),
    highlights: [
      "Efficiency Audits",
      "Crew Management",
      "Ground Operations",
      "Turnaround",
    ],
  },
  {
    title: "Training & Development",
    subtitle: "Core Service",
    description:
      "Custom training programs for flight crews, ground staff, and management in safety best practices.",
    image: placeholderImage("Training", "Crew & management", "05080F,111827"),
    highlights: [
      "Crew Training",
      "Management Programs",
      "Regulatory Training",
      "Emergency Procedures",
    ],
  },
  {
    title: "Sustainability Advisory",
    subtitle: "Core Service",
    description:
      "Carbon management, sustainable aviation fuel adoption, and ESG framework implementation.",
    image: placeholderImage("Sustainability", "SAF & ESG", "0A0F1A,1F2937"),
    highlights: [
      "Carbon Management",
      "SAF Adoption",
      "ESG Frameworks",
      "Sustainability Strategy",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              What we
              <br />
              <span className="text-foreground/50">deliver.</span>
            </h1>
            <p className="mt-6 text-foreground/40 leading-relaxed">
              Every engagement is tailored to the client&apos;s specific
              operating environment, regulatory landscape, and strategic
              objectives.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service) => (
              <ElitePlanCard
                key={service.title}
                imageUrl={service.image}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                highlights={service.highlights}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
