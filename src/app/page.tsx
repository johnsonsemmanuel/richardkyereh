import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { serviceImageUrls, homeHeroImages } from "@/lib/images";
import { articles } from "@/lib/articles";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { CompassIcon, WingsIcon, AltitudeIcon, GlobeIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";

const services = [
  {
    title: "Career Consultancy",
    slug: "career-consultancy",
    description: "Whether you are pursuing a career upgrade, transitioning into management, or entering the industry for the first time, we provide structured, one-on-one coaching tailored to your goals.",
  },
  {
    title: "Speaking Engagement",
    slug: "speaking-engagement",
    description: "Expert keynote speaking and panel participation for conferences, media discussions, corporate events, industry summits, and academic institutions. Richard brings decades of operational experience, strategic insight, and a compelling personal story that resonates with any audience.",
  },
  {
    title: "Face To Face Meeting",
    slug: "face-to-face-meeting",
    description: "Confidential one-on-one meetings for strategic discussions, partnership exploration, airline start-up development or executive advisory sessions. These private engagements are designed for decision-makers who need direct, unfiltered access to Richard's expertise.",
  },
  {
    title: "Mentorship",
    slug: "mentorship",
    description: "Structured mentorship for emerging aviation leaders, covering technical and leadership development.",
  },
  {
    title: "Aircraft Leases",
    slug: "aircraft-leases",
    description: "Advisory on aircraft leasing strategies, wet lease vs dry lease, fleet optimization, and portfolio management. Whether you are a startup airline or an established operator, we help you make informed, data-driven decisions.",
  },
  {
    title: "Charters Services",
    slug: "charters-services",
    description: "Amongst our range of available aircraft is a Beech 1900 to support charters operators, corporate clients and individuals.",
  },
];

const statIcons = [CheckCircle, CompassIcon, GlobeIcon];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroBackground images={[homeHeroImages[0]]} overlay="bg-gradient-to-r from-background/98 via-background/90 to-background/40" />
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <Reveal className="max-w-2xl">
            <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-[0.15em] uppercase mb-4 sm:mb-6 flex items-center gap-2">
              <CompassIcon className="size-4" />
              Airline & Aviation Expert | Africa
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              Strategic Clarity
              <br />
              <span className="text-gradient">for the skies</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-foreground/95 leading-relaxed max-w-lg drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] dark:drop-shadow-none">
              Richard Kyereh advises on aviation policy, aero-politics, aircraft brokerage, and airline start-ups - bringing deep expertise in fleet strategy and operational excellence to airlines and operators across Africa.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
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

      <section className="bg-secondary py-14 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              ["30+", "Projects Delivered"],
              ["20+", "Years of Experience"],
              ["40+", "Global Clients"],
            ].map(([stat, label], i) => {
              const Icon = statIcons[i];
              return (
                <StaggerItem key={stat} className="group">
                  <Card variant="outlined" className="p-4 sm:p-6 h-full flex flex-col justify-between hover:border-primary/50 transition-colors">
                    <div>
                      {Icon && <Icon className="size-5 sm:size-6 text-primary group-hover:text-primary transition-colors mb-2 sm:mb-3" />}
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                        {stat}
                      </p>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
            <StaggerItem className="group">
              <Card variant="outlined" className="p-4 sm:p-6 h-full flex flex-col justify-between hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 pt-1 pb-2">
                  <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-center shadow-sm">
                    <img
                      src="/logos/iata.svg"
                      alt="IATA Logo"
                      className="h-7 sm:h-9 w-auto object-contain"
                    />
                  </div>
                  <div className="bg-white rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center justify-center shadow-sm">
                    <img
                      src="/logos/gcaa.png"
                      alt="GCAA Logo"
                      className="h-8 sm:h-10 w-auto object-contain"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                  IATA, GCAA Certified
                </p>
              </Card>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <Reveal direction="left" className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-input bg-secondary shadow-premium">
                <img
                  src="/richardkyereh.jpg"
                  alt="Richard Kyereh"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="right" className="lg:col-span-7">
              <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <CompassIcon className="size-4" />
                Profile
              </p>
              <blockquote className="text-lg sm:text-2xl lg:text-3xl font-medium leading-snug text-foreground border-l-4 border-primary pl-4 sm:pl-6 py-1 sm:py-2">
                &ldquo;Aviation is not just a career - it demands absolute mastery, strategic vision, and the courage to pioneer where others have not dared.&rdquo;
              </blockquote>
              <div className="mt-6 sm:mt-8 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                <p className="text-xs sm:text-sm text-muted-foreground">
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

      <section className="bg-secondary/40 py-14 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
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
                <Card variant="elevated" className="h-full overflow-hidden">
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={serviceImageUrls[service.title]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 items-center">
            <Reveal direction="left">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <GlobeIcon className="size-4" />
                About
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                Decisions that
                <br />
                <span className="text-muted-foreground">define the flight path.</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                With almost two decades in aviation, Richard Kyereh has advised airlines, regulators, operators and mentees across the African continent. His work bridges technical depth and strategic foresight.
              </p>
              <Button asChild variant="link" className="mt-6 sm:mt-8 px-0">
                <Link href="/about">Full Bio &rarr;</Link>
              </Button>
            </Reveal>
            <Reveal direction="right" delay={0.1} className="relative">
              <div className="p-6 sm:p-8 rounded-2xl bg-secondary border border-border/40">
                <div className="space-y-4">
                  <p className="text-3xl sm:text-4xl font-bold text-foreground">20 Years Experience</p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Across airlines, regulators and professionals on the African continent and globally.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-14 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
              <WingsIcon className="size-4" />
              Insights
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Analysis &
              <br />
              <span className="text-muted-foreground">perspective.</span>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {articles.slice(0, 3).map((article) => (
              <StaggerItem key={article.slug} className="w-full flex justify-center">
                <GlassBlogCard
                  slug={article.slug}
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

          <Reveal className="text-center mt-10 sm:mt-12">
            <Button asChild variant="outline">
              <Link href="/newsroom">
                View All Articles
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <AltitudeIcon className="size-7 sm:size-8 text-primary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Ready to elevate
              <br />
              <span className="text-muted-foreground">your operations?</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Book a confidential consultation. We will assess your needs and
              outline a path forward.
            </p>
            <Button asChild size="lg" className="mt-8 sm:mt-10">
              <Link href="/booking">Schedule a Consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
