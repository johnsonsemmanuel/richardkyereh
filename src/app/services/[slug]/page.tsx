import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { serviceImageUrls } from "@/lib/images";
import { Reveal } from "@/components/ui/reveal";
import {
  CompassIcon, GlobeIcon, WingsIcon, ShieldIcon, RadarIcon, PlaneIcon,
} from "@/components/ui/aviation-icons";
import { CheckCircle, HeadsetIcon, ArrowRight } from "lucide-react";

const services = [
  {
    slug: "career-consultancy",
    title: "Career Consultancy",
    subtitle: "Chart your course in aviation",
    icon: CompassIcon,
    gradient: "05080F,1A2D4A",
    duration: "1 hr",
    price: "Free",
    description:
      "Personalized career guidance for aviation professionals seeking to advance in the aerospace industry. Whether you are pursuing a command upgrade, transitioning into management, or entering the industry for the first time, we provide structured, one-on-one coaching tailored to your goals.",
    features: [
      "Career path assessment and action planning",
      "Resume and interview preparation",
      "Type-rating and certification roadmap",
      "Industry networking introductions",
      "Salary and contract negotiation advice",
      "Follow-up support and progress tracking",
    ],
    ideal: "Pilots, cabin crew, ground operations staff, and aviation graduates looking to accelerate their career trajectory.",
  },
  {
    slug: "speaking-engagement",
    title: "Speaking Engagement",
    subtitle: "Keynotes that inspire action",
    icon: GlobeIcon,
    gradient: "0A0F1A,1F2937",
    duration: "1 hr",
    price: "Free",
    description:
      "Expert keynote speaking and panel participation for conferences, corporate events, industry summits, and academic institutions. Richard brings decades of operational experience, strategic insight, and a compelling personal story that resonates with any audience.",
    features: [
      "Customized keynote tailored to your theme",
      "Panel moderation and participant engagement",
      "Pre-event briefing and audience research",
      "Post-event Q&A and networking participation",
      "Travel and logistics coordination included",
      "Recording and media release permission",
    ],
    ideal: "Conference organizers, corporate event planners, universities, and industry associations seeking a dynamic, credible voice in aviation.",
  },
  {
    slug: "face-to-face-meeting",
    title: "Face To Face Meeting",
    subtitle: "Strategic conversations that matter",
    icon: WingsIcon,
    gradient: "05080F,111827",
    duration: "30 mins",
    price: "Free",
    description:
      "Confidential one-on-one meetings for strategic discussions, partnership exploration, or executive advisory sessions. These private engagements are designed for decision-makers who need direct, unfiltered access to Richard's expertise.",
    features: [
      "Private, confidential setting",
      "Pre-meeting brief to align on agenda",
      "Strategic advisory on your specific challenge",
      "Actionable takeaways and follow-up memo",
      "Flexible format — in-person or via video call",
      "No obligation — pure advisory value",
    ],
    ideal: "C-suite executives, government officials, investors, and entrepreneurs exploring aviation ventures or partnerships.",
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    subtitle: "Develop the next generation of leaders",
    icon: ShieldIcon,
    gradient: "0A0F1A,1A2D4A",
    duration: "1 hr",
    price: "Free",
    description:
      "Structured mentorship for emerging aviation leaders, covering both technical excellence and leadership development. Our mentorship program is designed to build competence, confidence, and connections in the aviation industry.",
    features: [
      "Personalized development plan",
      "Regular one-on-one mentoring sessions",
      "Leadership and management skill building",
      "Industry insight and market intelligence",
      "Network expansion introductions",
      "Progress reviews and milestone tracking",
    ],
    ideal: "Mid-career aviation professionals, aspiring managers, and young leaders committed to long-term growth in the aerospace sector.",
  },
  {
    slug: "aircraft-leases",
    title: "Aircraft Leases",
    subtitle: "Strategic fleet solutions",
    icon: RadarIcon,
    gradient: "05080F,1F2937",
    duration: "1 hr",
    price: "Free",
    description:
      "Advisory on aircraft leasing strategies, lease-versus-buy analysis, fleet optimization, and portfolio management. Whether you are a startup airline or an established operator, we help you make informed, data-driven decisions.",
    features: [
      "Lease vs. buy financial analysis",
      "Dry lease, wet lease, and sale-leaseback structuring",
      "Fleet planning and optimization strategy",
      "Lessor negotiation and contract review support",
      "Regional market intelligence (Africa focus)",
      "Regulatory compliance guidance",
    ],
    ideal: "Airline executives, fleet planners, lessors, and investors involved in aircraft acquisition or fleet restructuring.",
  },
  {
    slug: "charters-services",
    title: "Charters Services",
    subtitle: "Excellence in charter operations",
    icon: PlaneIcon,
    gradient: "0A0F1A,1F2937",
    duration: "1 hr",
    price: "Free",
    description:
      "Consulting on charter operations, fleet configuration, premium service delivery standards, and operational efficiency. We help charter operators and aspiring entrants build world-class operations from the ground up.",
    features: [
      "Charter operation feasibility study",
      "Fleet configuration and cabin layout advisory",
      "Service standards and SOP development",
      "Regulatory pathway and certification support",
      "Route profitability analysis",
      "Crew training and recruitment strategy",
    ],
    ideal: "Charter operators, VIP transport providers, tour operators, and entrepreneurs entering the charter aviation market.",
  },
];

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description.slice(0, 160),
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="flex items-center gap-2 text-xs text-foreground/30 mb-4">
                <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                <span>/</span>
                <span className="text-foreground/50">{service.title}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Icon className="size-5 text-primary" />
                <span className="text-primary text-sm font-medium tracking-widest uppercase">
                  {service.duration} &middot; {service.price}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                {service.title}
                <br />
                <span className="text-foreground/50">{service.subtitle}.</span>
              </h1>
              <p className="mt-6 text-foreground/40 leading-relaxed max-w-lg">
                {service.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/booking">
                    Book Now
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <HeadsetIcon className="size-4 mr-2" />
                    Need Support?
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative rounded-xl overflow-hidden border border-input/40">
                <img
                  src={serviceImageUrls[service.title]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                What you get
                <br />
                <span className="text-foreground/50">with this service.</span>
              </h2>
              <p className="mt-4 text-foreground/40 leading-relaxed">
                Every engagement is structured around your specific needs. Our
                goal is to deliver actionable value from the very first session.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-input/50">
                    <CheckCircle className="size-4 text-primary/60 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/60">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent border border-primary/10">
              <p className="text-xs text-foreground/30 font-semibold tracking-wider uppercase mb-2">Ideal For</p>
              <p className="text-sm text-foreground/60 leading-relaxed">{service.ideal}</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/booking">
                    Book a {service.title} Session
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/services">
                    Browse All Services
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
