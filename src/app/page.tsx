import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StackedCardsInteraction } from "@/components/StackedCards";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AviationBackground } from "@/components/AviationBackground";
import { images, serviceImageUrls } from "@/lib/images";
import { articles } from "@/lib/articles";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight } from "lucide-react";
import { CompassIcon, WingsIcon, AltitudeIcon, GlobeIcon, ShieldIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";

const services = [
  {
    title: "Career Consultancy",
    slug: "career-consultancy",
    description: "Personalized career guidance for aviation professionals seeking to advance in the aerospace industry.",
    gradient: "05080F,1A2D4A",
  },
  {
    title: "Speaking Engagement",
    slug: "speaking-engagement",
    description: "Expert keynote speaking and panel participation for conferences, corporate events, and industry summits.",
    gradient: "0A0F1A,111827",
  },
  {
    title: "Face To Face Meeting",
    slug: "face-to-face-meeting",
    description: "Confidential one-on-one meetings for strategic discussions, partnership exploration, or advisory sessions.",
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
    description: "Advisory on aircraft leasing strategies, lease vs. buy analysis, and portfolio optimization.",
    gradient: "05080F,111827",
  },
  {
    title: "Charters Services",
    slug: "charters-services",
    description: "Consulting on charter operations, fleet configuration, and premium service delivery standards.",
    gradient: "0A0F1A,1F2937",
  },
];

const statIcons = [null, CompassIcon, GlobeIcon, ShieldIcon];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
        <AviationBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary to-background" />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left" className="max-w-xl">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6 flex items-center gap-2">
                <CompassIcon className="size-4" />
                Aerospace & Aviation Consultancy
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
                Strategic Clarity
                <br />
                <span className="text-foreground/50">for the skies.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-foreground/40 leading-relaxed">
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
            </Reveal>
            <Reveal direction="right" delay={0.15} className="hidden lg:block">
              <HeroCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      <WavePath />

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              ["200+", "Projects Delivered"],
              ["15+", "Years Experience"],
              ["40+", "Global Clients"],
              ["99.7%", "Safety Record"],
            ].map(([stat, label], i) => {
              const Icon = statIcons[i];
              return (
                <StaggerItem key={stat} className="group">
                  {Icon && <Icon className="size-6 text-primary/20 group-hover:text-primary/40 transition-colors mb-3" />}
                  <p className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                    {stat}
                  </p>
                  <p className="mt-2 text-sm text-foreground/50 uppercase tracking-wider">
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
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <WingsIcon className="size-4" />
              Core Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Aerospace expertise,
              <br />
              <span className="text-foreground/50">delivered.</span>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block bg-secondary/50 hover:bg-secondary transition-colors border border-input rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={serviceImageUrls[service.title]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/40 leading-relaxed">
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
            </Reveal>
            <Reveal direction="right" delay={0.1} className="relative h-[420px]">
              <StackedCardsInteraction
                cards={[
                  {
                    image: images.controlPanel,
                    title: "15+ Years Experience",
                    description: "Across airlines, regulators, and investment firms on four continents.",
                  },
                  {
                    image: images.wingClouds,
                    title: "40+ Global Clients",
                    description: "From startups to established carriers across commercial and business aviation.",
                  },
                  {
                    image: images.wingWindow,
                    title: "$2.8B+ Fleet Value",
                    description: "Advised on fleet acquisition and asset management strategies worldwide.",
                  },
                ]}
              />
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
              <span className="text-foreground/50">perspective.</span>
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
            <AltitudeIcon className="size-8 text-primary/20 mx-auto mb-6" />
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
