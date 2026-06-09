import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { serviceImage } from "@/lib/images";
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
    duration: "1 hr",
    price: "Free",
    gradient: "05080F,1A2D4A",
    description:
      "Personalized career guidance for aviation professionals seeking to advance in the aerospace industry.",
  },
  {
    title: "Speaking Engagement",
    duration: "1 hr",
    price: "Free",
    gradient: "0A0F1A,111827",
    description:
      "Expert keynote speaking and panel participation for conferences, corporate events, and industry summits.",
  },
  {
    title: "Face To Face Meeting",
    duration: "30 mins",
    price: "Free",
    gradient: "05080F,1F2937",
    description:
      "Confidential one-on-one meetings for strategic discussions, partnership exploration, or advisory sessions.",
  },
  {
    title: "Mentorship",
    duration: "1 hr",
    price: "Free",
    gradient: "0A0F1A,1A2D4A",
    description:
      "Structured mentorship for emerging aviation leaders, covering technical and leadership development.",
  },
  {
    title: "Aircraft Leases",
    duration: "1 hr",
    price: "Free",
    gradient: "05080F,111827",
    description:
      "Advisory on aircraft leasing strategies, lease vs. buy analysis, and portfolio optimization.",
  },
  {
    title: "Charters Services",
    duration: "1 hr",
    price: "Free",
    gradient: "0A0F1A,1F2937",
    description:
      "Consulting on charter operations, fleet configuration, and premium service delivery standards.",
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
            <p className="mt-6 text-foreground/40 leading-relaxed">
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
                    href="/booking"
                    className="group block bg-secondary/50 hover:bg-secondary transition-colors border border-input rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={serviceImage(service.title, service.gradient)}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-xs text-foreground/30 bg-background/50 px-2 py-1 rounded">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/40 mb-2">
                        Duration: {service.duration}
                      </p>
                      <p className="text-sm text-foreground/40 leading-relaxed">
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
