import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { serviceImageUrls } from "@/lib/images";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CompassIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";

export const metadata: Metadata = {
  title: "Services",
  description: "Aviation consultancy services by Richard Kyereh.",
};

const services = [
  {
    title: "Career Consultancy",
    slug: "career-consultancy",
    rate: "RATE: 10mins Free / $20 per 30mins",
    gradient: "05080F,1A2D4A",
    isFree: false,
    description: "Whether you are pursuing a career upgrade, transitioning into management, or entering the industry for the first time, we provide structured, one-on-one coaching tailored to your goals.",
  },
  {
    title: "Speaking Engagement",
    slug: "speaking-engagement",
    rate: "RATE: Free or paid depending on location and logistics",
    gradient: "0A0F1A,111827",
    isFree: true,
    description: "Expert keynote speaking and panel participation for conferences, media discussions, corporate events, industry summits, and academic institutions. Richard brings decades of operational experience, strategic insight, and a compelling personal story that resonates with any audience.",
  },
  {
    title: "Face To Face Meeting",
    slug: "face-to-face-meeting",
    rate: "RATE: Negotiable",
    gradient: "05080F,1F2937",
    isFree: false,
    description: "Confidential one-on-one meetings for strategic discussions, partnership exploration, airline start-up development or executive advisory sessions. These private engagements are designed for decision-makers who need direct, unfiltered access to Richard's expertise.",
  },
  {
    title: "Mentorship",
    slug: "mentorship",
    rate: "RATE: 10mins Free / $20 per 30mins",
    gradient: "0A0F1A,1A2D4A",
    isFree: false,
    description: "Structured mentorship for emerging aviation leaders, covering technical and leadership development.",
  },
  {
    title: "Aircraft Leases",
    slug: "aircraft-leases",
    rate: "RATE: Free or paid depending on location and logistics",
    gradient: "05080F,111827",
    isFree: true,
    description: "Advisory on aircraft leasing strategies, wet lease vs dry lease, fleet optimization, and portfolio management. Whether you are a startup airline or an established operator, we help you make informed, data-driven decisions.",
  },
  {
    title: "Charters Services",
    slug: "charters-services",
    rate: "RATE: Free or paid depending on location and logistics",
    gradient: "0A0F1A,1F2937",
    isFree: true,
    description: "Amongst our range of available aircraft is a Beech 1900 to support charters operators, corporate clients and individuals.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
              <CompassIcon className="size-4" />
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              What we
              <br />
              <span className="text-foreground/50">deliver.</span>
            </h1>
            <p className="mt-6 text-foreground/60 leading-relaxed">
              Every engagement is tailored to the client&apos;s specific
              operating environment and objectives.
            </p>
          </Reveal>
        </div>
      </section>

      <WavePath />

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block bg-secondary/50 hover:bg-secondary transition-colors border border-input rounded-xl overflow-hidden shadow-card"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={serviceImageUrls[service.title]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          service.isFree
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}>
                          {service.isFree ? "Free" : "Paid"}
                        </span>
                      </div>
                      <p className="text-xs mb-2 text-red-500 font-bold">
                        {service.rate}
                      </p>
                      <p className="text-sm text-foreground/50 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                          Book
                        </Button>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
