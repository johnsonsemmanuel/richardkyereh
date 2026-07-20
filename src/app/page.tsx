import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { serviceImageUrls, homeHeroImages } from "@/lib/images";
import { articles } from "@/lib/articles";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { CompassIcon, WingsIcon, AltitudeIcon, GlobeIcon, ShieldIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";
import { HeroBackground } from "@/components/HeroBackground";

const services = [
  {
    title: "Career Consultancy",
    slug: "career-consultancy",
    description: "Whether you are pursuing a career upgrade, transitioning into management, or entering the industry for the first time, we provide structured, one-on-one coaching tailored to your goals.",
    gradient: "05080F,1A2D4A",
  },
  {
    title: "Speaking Engagement",
    slug: "speaking-engagement",
    description: "Expert keynote speaking and panel participation for conferences, media discussions, corporate events, industry summits, and academic institutions. Richard brings decades of operational experience, strategic insight, and a compelling personal story that resonates with any audience.",
    gradient: "0A0F1A,111827",
  },
  {
    title: "Face To Face Meeting",
    slug: "face-to-face-meeting",
    description: "Confidential one-on-one meetings for strategic discussions, partnership exploration, airline start-up development or executive advisory sessions. These private engagements are designed for decision-makers who need direct, unfiltered access to Richard's expertise.",
    gradient: "05080F,1F2937",
  },
  {
    title: "Mentorship",
    slug: "mentorship",
    description: "Structured mentorship for emerging aviation leaders, covering technical and leadership development.",
    gradient: "0A0F1A,1A2D4A",
  },
  {
    title: "Aircraft Leases",
    slug: "aircraft-leases",
    description: "Advisory on aircraft leasing strategies, wet lease vs dry lease, fleet optimization, and portfolio management. Whether you are a startup airline or an established operator, we help you make informed, data-driven decisions.",
    gradient: "05080F,111827",
  },
  {
    title: "Charters Services",
    slug: "charters-services",
    description: "Amongst our range of available aircraft is a Beech 1900 to support charters operators, corporate clients and individuals.",
    gradient: "0A0F1A,1F2937",
  },
];

const statIcons = [CheckCircle, CompassIcon, GlobeIcon, ShieldIcon];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroBackground images={[homeHeroImages[0]]} />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <Reveal className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
              <CompassIcon className="size-4" />
              Airline & Aviation Expert | Africa
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              Strategic Clarity
              <br />
              <span className="text-muted-foreground">for the skies</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Richard Kyereh advises on aviation policy, aero-politics, aircraft brokerage, and airline start-ups - bringing deep expertise in fleet strategy and operational excellence to airlines and operators across Africa.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <WavePath />

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              ["30+", "Projects Delivered"],
              ["20+", "Years of Experience"],
              ["40+", "Global Clients"],
              ["99.7%", "IATA, GCAA Certified"],
            ].map(([stat, label], i) => {
              const Icon = statIcons[i];
              return (
                <StaggerItem key={stat} className="group">
                  {Icon && <Icon className="size-6 text-primary/40 group-hover:text-primary transition-colors mb-3" />}
                  <p className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                    {stat}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
                    {label}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <Reveal direction="left" className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-input bg-secondary/50 shadow-2xl shadow-primary/5">
                <img
                  src="/photos/aviadev-profile.jpg"
                  alt="Richard Kyereh"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="right" className="lg:col-span-3">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <CompassIcon className="size-4" />
                Profile
              </p>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-foreground border-l-4 border-primary pl-6 py-2">
                &ldquo;Aviation is not just a career - it demands absolute mastery, strategic vision, and the courage to pioneer where others have not dared.&rdquo;
              </blockquote>
              <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Richard Kyereh is a leading expert consultant in Africa with two decades of experience across international and African airlines. He has held key commercial and leadership roles at Turkish Airlines (Corporate Sales & Marketing), Africa World Airlines (Head of Commercial), Antrak Air (Head of Commercial & Projects and Safety Officer initially), and Westair Aviation (Ghana Country Manager).
                </p>
                <p>
                  At Africa World Airlines, he led the airline&apos;s regional expansion strategy and grew the Accra-Lagos route from 3x weekly to 35x weekly in just 18 months - a landmark achievement in regional aviation connectivity. He also spearheaded network expansion to 5 destinations across 4 countries.
                </p>
                <p>
                  He is also the African Representative for Lombok Institute of Flight Technology (LIFT), Indonesia, Executive Director of the Centre for Aviation Policy &amp; Development, Africa (CAPD-Africa), and Brand Ambassador for major aviation brands across Africa, including Hitit CS, the world&apos;s third-largest passenger service system.
                </p>
                <p>
                  Richard harnesses his experience in these markets to provide aviation advisory to airlines, operators and persons seeking career inputs across Ghana and Africa at large.
                </p>
                <p className="text-sm text-muted-foreground">
                  - Richard Kyereh, MBA, PMP | Accra, Ghana, West Africa
                </p>
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="/about">Full Biography</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <WingsIcon className="size-4" />
              Core Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Aviation expertise,
              <br />
              <span className="text-muted-foreground">delivered.</span>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col h-full bg-secondary/50 hover:bg-secondary transition-colors border border-input rounded-xl overflow-hidden shadow-card"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={serviceImageUrls[service.title]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
                <GlobeIcon className="size-4" />
                About
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                Decisions that
                <br />
                <span className="text-muted-foreground">define the flight path.</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                With almost two decades in aviation, Richard Kyereh has advised airlines, regulators, operators and mentees across the African continent. His work bridges technical depth and strategic foresight.
              </p>
              <Button asChild variant="link" className="mt-8 px-0">
                <Link href="/about">Full Bio &rarr;</Link>
              </Button>
            </Reveal>
            <Reveal direction="right" delay={0.1} className="relative h-[420px]">
              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-foreground">20 Years Experience</p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Across airlines, regulators and professionals on the continent.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <WingsIcon className="size-4" />
              Insights
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Analysis &
              <br />
              <span className="text-muted-foreground">perspective.</span>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-3 gap-8 justify-items-center">
            {articles.slice(0, 3).map((article) => (
              <StaggerItem key={article.title}>
                <GlassBlogCard
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  author={article.author}
                  date={article.date}
                  readTime={article.readTime}
                  tags={article.tags}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <Reveal className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/newsroom">
                View All Articles
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <AltitudeIcon className="size-8 text-primary/30 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Ready to elevate
              <br />
              <span className="text-muted-foreground">your operations?</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
              Book a confidential consultation. We will assess your needs and
              outline a path forward.
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href="/booking">Schedule a Consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
