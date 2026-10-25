import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serviceImageUrls } from "@/lib/images";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
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
    isFree: false,
    amount: 20,
    description: "Whether you are pursuing a career upgrade, transitioning into management, or entering the industry for the first time, we provide structured, one-on-one coaching tailored to your goals.",
  },
  {
    title: "Speaking Engagement",
    slug: "speaking-engagement",
    rate: "RATE: Free or paid depending on location and logistics",
    isFree: true,
    amount: 0,
    description: "Expert keynote speaking and panel participation for conferences, media discussions, corporate events, industry summits, and academic institutions. Richard brings decades of operational experience, strategic insight, and a compelling personal story that resonates with any audience.",
  },
  {
    title: "Face To Face Meeting",
    slug: "face-to-face-meeting",
    rate: "RATE: Negotiable",
    isFree: false,
    amount: 20,
    description: "Confidential one-on-one meetings for strategic discussions, partnership exploration, airline start-up development or executive advisory sessions. These private engagements are designed for decision-makers who need direct, unfiltered access to Richard's expertise.",
  },
  {
    title: "Mentorship",
    slug: "mentorship",
    rate: "RATE: 10mins Free / $20 per 30mins",
    isFree: false,
    amount: 20,
    description: "Structured mentorship for emerging aviation leaders, covering technical and leadership development.",
  },
  {
    title: "Aircraft Leases",
    slug: "aircraft-leases",
    rate: "RATE: Free or paid depending on location and logistics",
    isFree: true,
    amount: 0,
    description: "Advisory on aircraft leasing strategies, wet lease vs dry lease, fleet optimization, and portfolio management. Whether you are a startup airline or an established operator, we help you make informed, data-driven decisions.",
  },
  {
    title: "Charters Services",
    slug: "charters-services",
    rate: "RATE: NEGOTIABLE",
    isFree: true,
    amount: 0,
    description: "Amongst our range of available aircraft is a Beech 1900 to support charters operators, corporate clients and individuals.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-bg-light section-padding">
        <div className="premium-container">
          <SectionHeader
            title="What we"
            subtitle="deliver."
            description="Every engagement is tailored to the client&apos;s specific operating environment and objectives."
            icon={CompassIcon}
          />
        </div>
      </section>

      <WavePath />

      <section className="section-bg-light section-padding">
        <div className="premium-container">
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title} className="h-full">
                <Card variant="elevated" className="h-full overflow-hidden">
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full"
                  >
                    <div className="card-image">
                      <img
                        src={serviceImageUrls[service.title]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          service.isFree
                            ? "bg-emerald-500 text-emerald-400 border border-emerald-500"
                            : "bg-primary text-primary-foreground border border-primary"
                        }`}>
                          {service.isFree ? "Free" : "Paid"}
                        </span>
                      </div>
                      <p className="text-xs mb-2 text-red-500 font-bold">
                        {service.rate}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {service.description}
                      </p>
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                          Book
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
