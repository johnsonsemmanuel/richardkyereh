import Link from "next/link";
import { StackedCardsInteraction } from "@/components/StackedCards";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blueblack-900 via-blueblack-800 to-blueblack-900" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-6">
              Aerospace & Aviation Consultancy
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Strategic Clarity
              <br />
              <span className="text-white/50">for the skies.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/40 leading-relaxed max-w-xl">
              Richard Kyereh provides world-class aerospace advisory — from
              fleet strategy and safety compliance to operational excellence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blueblack-900 font-semibold hover:bg-white/90 transition-colors text-sm"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white/80 hover:border-white/20 hover:text-white transition-colors text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-blueblack-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              ["200+", "Projects Delivered"],
              ["15+", "Years Experience"],
              ["40+", "Global Clients"],
              ["99.7%", "Safety Record"],
            ].map(([stat, label]) => (
              <div key={stat}>
                <p className="text-3xl lg:text-5xl font-bold tracking-tight">
                  {stat}
                </p>
                <p className="mt-2 text-sm text-blueblack-500 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blueblack-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
              Core Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
              Aerospace expertise,
              <br />
              <span className="text-white/50">delivered.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Strategic Advisory",
                description:
                  "Fleet planning, route optimization, market entry strategy, and merger advisory for airlines and aerospace organizations.",
              },
              {
                title: "Safety & Compliance",
                description:
                  "Full-spectrum safety management systems, regulatory compliance audits, and ICAO standard certification support.",
              },
              {
                title: "Fleet Management",
                description:
                  "End-to-end fleet acquisition, lifecycle management, lease negotiation, and asset valuation services.",
              },
              {
                title: "Operations Consulting",
                description:
                  "Operational audit, crew management optimization, ground operations, and turnaround time reduction.",
              },
              {
                title: "Training & Development",
                description:
                  "Custom training programs for flight crews, ground staff, and management in safety and operational best practices.",
              },
              {
                title: "Sustainability",
                description:
                  "Carbon offset strategies, sustainable aviation fuel adoption, and ESG framework implementation.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group p-8 bg-blueblack-800/50 hover:bg-blueblack-800 transition-colors border border-white/5"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-white/70 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blueblack-800 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-4">
                    About
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                Decisions that
                <br />
                <span className="text-white/50">define the flight path.</span>
              </h2>
              <p className="mt-6 text-white/40 leading-relaxed">
                With over a decade and a half in aerospace and aviation, Richard
                Kyereh has advised airlines, regulators, and investment firms
                across four continents. His work bridges technical depth and
                strategic foresight.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center text-sm text-white/70 hover:text-white transition-colors"
              >
                Full Bio &rarr;
              </Link>
            </div>
            <div className="relative h-[420px]">
              <StackedCardsInteraction
                cards={[
                  {
                    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='288'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23050E1A'/%3E%3Cstop offset='100%25' style='stop-color:%231A2D4A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='350' height='288' fill='url(%23g)'/%3E%3Ctext x='175' y='140' text-anchor='middle' fill='white' font-family='Inter,sans-serif' font-size='28' font-weight='bold'%3E25%2B%3C/text%3E%3Ctext x='175' y='170' text-anchor='middle' fill='%23ffffff80' font-family='Inter,sans-serif' font-size='14'%3EAirlines Advised%3C/text%3E%3C/svg%3E",
                    title: "Strategic Advisory",
                    description: "Fleet planning, market entry, and merger advisory across four continents.",
                  },
                  {
                    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='288'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23050E1A'/%3E%3Cstop offset='100%25' style='stop-color:%231A2D4A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='350' height='288' fill='url(%23g)'/%3E%3Ctext x='175' y='140' text-anchor='middle' fill='white' font-family='Inter,sans-serif' font-size='28' font-weight='bold'%3E18%3C/text%3E%3Ctext x='175' y='170' text-anchor='middle' fill='%23ffffff80' font-family='Inter,sans-serif' font-size='14'%3ECountries%3C/text%3E%3C/svg%3E",
                    title: "Safety & Compliance",
                    description: "Full-spectrum SMS design, audits, and ICAO certification support.",
                  },
                  {
                    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='288'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23050E1A'/%3E%3Cstop offset='100%25' style='stop-color:%231A2D4A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='350' height='288' fill='url(%23g)'/%3E%3Ctext x='175' y='140' text-anchor='middle' fill='white' font-family='Inter,sans-serif' font-size='28' font-weight='bold'%3E%242.8B%3C/text%3E%3Ctext x='175' y='170' text-anchor='middle' fill='%23ffffff80' font-family='Inter,sans-serif' font-size='14'%3EFleet Value Managed%3C/text%3E%3C/svg%3E",
                    title: "Fleet Management",
                    description: "End-to-end acquisition, lease negotiation, and asset lifecycle strategy.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueblack-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Ready to elevate
            <br />
            <span className="text-white/50">your operations?</span>
          </h2>
          <p className="mt-6 text-white/40 max-w-lg mx-auto">
            Book a confidential consultation. We will assess your needs and
            outline a path forward.
          </p>
          <Link
            href="/booking"
            className="mt-10 inline-flex items-center justify-center px-10 py-4 bg-white text-blueblack-900 font-semibold hover:bg-white/90 transition-colors text-sm"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
