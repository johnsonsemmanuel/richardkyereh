import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StackedCardsInteraction } from "@/components/StackedCards";
import { GlassBlogCard } from "@/components/GlassBlogCard";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary to-background" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6">
              Aerospace & Aviation Consultancy
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
              Strategic Clarity
              <br />
              <span className="text-foreground/50">for the skies.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/40 leading-relaxed max-w-xl">
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
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              ["200+", "Projects Delivered"],
              ["15+", "Years Experience"],
              ["40+", "Global Clients"],
              ["99.7%", "Safety Record"],
            ].map(([stat, label]) => (
              <div key={stat}>
                <p className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                  {stat}
                </p>
                <p className="mt-2 text-sm text-foreground/50 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Core Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Aerospace expertise,
              <br />
              <span className="text-foreground/50">delivered.</span>
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
                className="group p-8 bg-secondary/50 hover:bg-secondary transition-colors border border-input"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                    About
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                Decisions that
                <br />
                <span className="text-foreground/50">define the flight path.</span>
              </h2>
              <p className="mt-6 text-foreground/40 leading-relaxed">
                With over a decade and a half in aerospace and aviation, Richard
                Kyereh has advised airlines, regulators, and investment firms
                across four continents. His work bridges technical depth and
                strategic foresight.
              </p>
              <Button asChild variant="link" className="mt-8 px-0">
                <Link href="/about">Full Bio &rarr;</Link>
              </Button>
            </div>
            <div className="relative h-[420px]">
              <StackedCardsInteraction
                cards={[
                  {
                    image: "https://images.unsplash.com/photo-XrViyzENBIU?q=80&w=800&h=600&fit=crop",
                    title: "15+ Years Experience",
                    description: "Across airlines, regulators, and investment firms on four continents.",
                  },
                  {
                    image: "https://images.unsplash.com/photo-AzMSyv2ikwI?q=80&w=800&h=600&fit=crop",
                    title: "40+ Global Clients",
                    description: "From startups to established carriers across commercial and business aviation.",
                  },
                  {
                    image: "https://images.unsplash.com/photo-qKdWAVgDHSE?q=80&w=800&h=600&fit=crop",
                    title: "$2.8B+ Fleet Value",
                    description: "Advised on fleet acquisition and asset management strategies worldwide.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Insights
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Analysis &
              <br />
              <span className="text-foreground/50">perspective.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            <GlassBlogCard
              title="The State of Global Fleet Management in 2026"
              excerpt="An analysis of fleet utilization trends, lease rates, and emerging market dynamics shaping aerospace investment decisions."
              image="https://images.unsplash.com/photo-qKdWAVgDHSE?q=80&w=800&h=600&fit=crop"
              author={{ name: "Richard Kyereh", avatar: "" }}
              date="May 2026"
              readTime="6 min read"
              tags={["Fleet", "Markets"]}
            />
            <GlassBlogCard
              title="Safety Management Systems Beyond Compliance"
              excerpt="How leading carriers are transforming SMS from a regulatory requirement into a competitive advantage in operations."
              image="https://images.unsplash.com/photo-XrViyzENBIU?q=80&w=800&h=600&fit=crop"
              author={{ name: "Richard Kyereh", avatar: "" }}
              date="Apr 2026"
              readTime="4 min read"
              tags={["Safety", "Compliance"]}
            />
            <GlassBlogCard
              title="Sustainable Aviation Fuel: Realities & Roadmap"
              excerpt="A practical assessment of SAF adoption timelines, infrastructure requirements, and cost trajectories for airlines."
              image="https://images.unsplash.com/photo-AzMSyv2ikwI?q=80&w=800&h=600&fit=crop"
              author={{ name: "Richard Kyereh", avatar: "" }}
              date="Mar 2026"
              readTime="5 min read"
              tags={["Sustainability", "Fuel"]}
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
            Ready to elevate
            <br />
            <span className="text-foreground/50">your operations?</span>
          </h2>
          <p className="mt-6 text-foreground/40 max-w-lg mx-auto">
            Book a confidential consultation. We will assess your needs and
            outline a path forward.
          </p>
          <Button asChild size="lg" className="mt-10">
            <Link href="/booking">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
