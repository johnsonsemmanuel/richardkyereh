import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive aerospace and aviation consultancy services by Richard Kyereh.",
};

const services = [
  {
    title: "Strategic Advisory",
    description:
      "Fleet planning and acquisition strategy, route network optimization, market entry and expansion planning, merger and acquisition advisory.",
    areas: [
      "Fleet Planning & Acquisition",
      "Route Network Optimization",
      "Market Entry Strategy",
      "M&A Advisory",
    ],
  },
  {
    title: "Safety & Compliance",
    description:
      "Safety management system design and implementation, regulatory compliance audits (EASA, FAA, ICAO), accident investigation support, security protocol development.",
    areas: [
      "SMS Design & Implementation",
      "Regulatory Compliance (EASA, FAA, ICAO)",
      "Accident Investigation",
      "Security Protocols",
    ],
  },
  {
    title: "Fleet Management",
    description:
      "Aircraft acquisition and divestment, lease negotiation and management, asset valuation and trading, end-of-life and part-out strategy.",
    areas: [
      "Acquisition & Divestment",
      "Lease Negotiation",
      "Asset Valuation",
      "End-of-Life Strategy",
    ],
  },
  {
    title: "Operations Consulting",
    description:
      "Operational efficiency audits, crew resource management, ground operations optimization, turnaround time reduction programs.",
    areas: [
      "Efficiency Audits",
      "Crew Resource Management",
      "Ground Operations",
      "Turnaround Optimization",
    ],
  },
  {
    title: "Training & Development",
    description:
      "Custom training curricula for flight and ground crews, management development programs, regulatory training (CRM, SMS, emergency procedures).",
    areas: [
      "Crew Training Programs",
      "Management Development",
      "Regulatory Training",
      "Emergency Procedures",
    ],
  },
  {
    title: "Sustainability Advisory",
    description:
      "Carbon management and offset strategies, sustainable aviation fuel (SAF) adoption, ESG reporting and framework development.",
    areas: [
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
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              What we
              <br />
              <span className="text-white/50">deliver.</span>
            </h1>
            <p className="mt-6 text-white/40 leading-relaxed">
              Every engagement is tailored to the client&apos;s specific
              operating environment, regulatory landscape, and strategic
              objectives.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 lg:p-10 bg-blueblack-800/30 border border-white/5 hover:border-white/10 transition-colors"
              >
                <h2 className="text-xl font-semibold text-white">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.areas.map((area) => (
                    <li
                      key={area}
                      className="text-sm text-white/30 flex items-center gap-3"
                    >
                      <span className="w-1 h-1 bg-white/40 shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blueblack-800 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-white/40 max-w-md mx-auto">
            We begin with a no-obligation discovery call to understand your
            challenges.
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-white text-blueblack-900 font-semibold hover:bg-white/90 transition-colors text-sm"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </>
  );
}
