import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { GlobeIcon, CompassIcon, ShieldIcon, PlaneIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Richard Kyereh, aviation expert with 20+ years of experience across Africa's airline industry.",
};

const highlights = [
  { label: "Experience", value: "20+ years", desc: "Across airlines, regulators, and investment firms across West Africa and beyond.", Icon: GlobeIcon },
  { label: "Expertise", value: "Full spectrum", desc: "From network development and route launches to safety management and aero politics.", Icon: CompassIcon },
  { label: "Impact", value: "35x weekly", desc: "Grew Accra-Lagos route from 3x weekly to 35x weekly in 18 months and introduced Passenger Re-Protection Agreements.", Icon: ShieldIcon },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <Reveal direction="left" className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden border border-input bg-secondary/50 shadow-2xl shadow-primary/10 before:absolute before:inset-0 before:bg-gradient-to-t before:from-background/20 before:to-transparent before:z-10">
                <img
                  src="/photos/aviadev-profile.jpg"
                  alt="Richard Kyereh"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal direction="right" className="lg:col-span-3 space-y-4">
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
                <PlaneIcon className="size-4" />
                About
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Richard Kyereh
                <br />
                <span className="text-foreground/50 text-2xl lg:text-3xl font-medium">MBA, PMP</span>
              </h1>
              <p className="text-foreground/60 leading-relaxed text-lg mt-4">
                Richard Kyereh exemplifies everything good about the business side of aviation.
              </p>
              <div className="space-y-4 text-foreground/60 leading-relaxed">
                <p>
                  Richard Kyereh is an aviation expert, aircraft broker, and aero-politics specialist based in Ghana, with 20 years of senior leadership experience across Africa&apos;s airline industry. A certified project manager, he brings deep expertise in commercial airline strategy, network development, and aviation consulting for West Africa&apos;s fast-growing travel market and Africa at large.
                </p>
                <p>
                  He is well-placed to coach, mentor, and guide young people with a passion for aviation or anyone simply wondering whether the aviation industry holds any promise for the degree they earned in school.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WavePath />

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-5 text-foreground/60 leading-relaxed">
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Airline Leadership Experience</h2>
              <p>
                Richard has led commercial teams at Africa World Airlines, Antrak Air, Westair Aviation, and Turkish Airlines. He has also served as Brand Ambassador for major aviation brands across Africa, including Hitit CS, the third-largest passenger service system in the world.
              </p>
              <p className="mt-4">
                He currently sits within the Corporate Sales and Marketing team at Turkish Airlines, while also serving as Country Manager, Ghana for Westair Aviation. For five years, he served as Head of Commercial at Africa World Airlines (AWA), joining in December 2015 as Deputy Head of Commercial. Before that, he spent eight years at Antrak Air, starting as a Project/Safety Officer in 2007 and rising to Head of Commercial by 2015.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Aviation Consulting Expertise</h2>
              <p>
                Across these roles, Richard has built a deep repertoire of airline business functions, including:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Network Development and Route launches</li>
                <li>Hub Operations</li>
                <li>Project Management</li>
                <li>Sales &amp; Marketing Strategy</li>
                <li>Interline Agreements</li>
                <li>Aero-politics and Industry Diplomacy</li>
              </ul>
              <p className="mt-4">
                His firm grasp of the African travel market is a rare asset; knowledge that has proven invaluable in growing airlines from startups into regional players.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Route Development &amp; Network Growth in Ghana and West Africa</h2>
              <p>
                While at Africa World Airlines, Richard spearheaded the growth of the regional network from a single route in 2016 to five destinations across four African cities. That&apos;s Lagos, Abuja, Monrovia, Freetown, and Abidjan - alongside expansion of key domestic Ghana routes: Kumasi-Tamale direct, Takoradi, and Wa.
              </p>
              <p className="mt-4">
                Leading a team of dedicated AWA staff, he grew the once-struggling Accra-Lagos-Accra route from 3 weekly flights to 35 weekly flights within 18 months. He diversified distribution channels and maximized revenue by championing GDS implementation, securing eight airline partners for SPA and IET agreements, and leading successful membership applications to IATA, ICH, and MITA.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Industry Roles &amp; Affiliations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Advisory Board Member, Aviation Development (AviaDev) Africa (2020-2021)</li>
                <li>African Representative, Lombok Institute of Flight Technology (LIFT), Indonesia</li>
                <li>Executive Director, Centre for Aviation Policy &amp; Development, Africa (CAPD-Africa)</li>
                <li>CEO, iCount Aerospace Limited</li>
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">A Legacy of Industry Innovation</h2>
              <p>
                Richard&apos;s most notable contribution to Ghana&apos;s aviation industry is the introduction of Passenger Re-Protection Agreements among competing airlines. A framework that reduced operational losses during downtime and remains in use today. He is a regular guest speaker and panelist at aviation conferences across the continent speaking on commercial strategy.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Education &amp; Certifications</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Three IATA Diplomas: Airline Management, Airline Revenue Accounting and Controls, and Airline Business Development</li>
                <li>MBA in Project Management from the Ghana Institute of Management and Public Administration (GIMPA)</li>
                <li>Alumnus, Kwame Nkrumah University of Science and Technology (KNUST)</li>
                <li>Certified member, Project Management Institute (PMI), USA</li>
                <li>Flight Dispatch Certification from the Ghana Civil Aviation Authority</li>
              </ul>
            </Reveal>

            <Reveal delay={0.4}>
              <Button asChild size="lg" className="mt-8">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => {
              const Icon = item.Icon;
              return (
                <StaggerItem key={item.label}>
                  <div className="p-8 bg-background/50 border border-input group hover:bg-secondary transition-colors rounded-xl shadow-card">
                    <Icon className="size-6 text-primary/20 group-hover:text-primary/40 transition-colors mb-4" />
                    <p className="text-xs text-primary uppercase tracking-widest font-medium">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-foreground/50">{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
