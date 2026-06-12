import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { images } from "@/lib/images";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { GlobeIcon, WingsIcon, CompassIcon, ShieldIcon, PlaneIcon } from "@/components/ui/aviation-icons";
import { WavePath } from "@/components/ui/wave-path";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Richard Kyereh, aerospace and aviation consultant with 15+ years of global experience.",
};

const highlights = [
  { label: "Experience", value: "15+ years", desc: "Across airlines, regulators, and investment firms across West Africa and beyond.", Icon: GlobeIcon },
  { label: "Expertise", value: "Full spectrum", desc: "From network development and route launches to safety management and aero politics.", Icon: CompassIcon },
  { label: "Impact", value: "35x weekly", desc: "Grew Accra-Lagos route from 3x weekly to 35x weekly in 18 months.", Icon: ShieldIcon },
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
            </Reveal>
          </div>
        </div>
      </section>

      <WavePath />

      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-5 text-foreground/60 leading-relaxed">
            <Reveal>
              <p>
                With over 15 years of experience at various managerial levels of the aviation
                industry in Ghana and the West Africa Sub-region, he is well-placed to coach,
                mentor and guide young people with a passion for aviation or those who just would
                like to know if the world of aviation holds any promise for the degrees they
                acquired in school.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                For five years, he worked for Africa World Airlines (AWA) as the Head of
                Commercial, having joined AWA in December 2015 as the Deputy Head of Commercial.
                He also served in various capacities during his 8-year stint with Antrak Air,
                starting as a Project/Safety Officer in 2007 and exiting as the Head of
                Commercial in 2015.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                During those periods, he mastered a repertoire of airline business functions
                particularly in network development and route launches, hub operations, project
                management, sales &amp; marketing strategies, interline, aero politics and
                diplomacy in industry affairs. He is a man of many hats and has a firm
                understanding of the West African travel market; knowledge that is priceless in
                Africa World Airlines&apos; strategy for regional network expansion.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                While at Africa World Airlines he spearheaded the growth in the regional network
                from a single route in 2016 to five destinations across four countries by
                February 2020 (Lagos, Abuja, Monrovia, Freetown and Abidjan) and the expansion
                of some key domestic routes in Ghana - Kumasi to Tamale direct, Takoradi,
                and Wa operations.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Leading a team of highly trained and dedicated AWA staff, he exponentially grew
                the Accra-Lagos-Accra dying route from 3x weekly flights to 35x weekly
                over 18 months. He diversified distribution channels and maximised revenue by
                championing the implementation of commercial distributions such GDS, and
                succeeded in seeking out eight (8) airline partners for SPAs and IET agreements
                and successful membership application to IATA, ICH and MITA while at Africa
                World Airlines.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>
                He has also served as an Advisory Board Member for Aviation Development
                (AviaDev) Africa from 2020 - 2021. He is an Aviation Consultant who
                currently holds the following positions: Country Manager - Ghana for
                Westair Aviation, African Representative for the Indonesian pilot training
                school, Lombok Institute of Flight Technology (LIFT) and an Executive Director
                for Centre for Aviation Policy &amp; Development, Africa (CAPD-Africa).
                Additionally, he is the CEO of iCount Aerospace Limited.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Mr Kyereh&apos;s notable contribution to the aviation industry in Ghana is the
                introduction and establishment of the Passenger Re-Protection Agreements among
                airline competitors to cut down operational losses during downtime which has
                come to stay. He actively shares his expertise and manages an active speaking
                portfolio as a guest speaker and panelist at aviation conferences on the
                continent.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p>
                Mr Kyereh holds three IATA Diplomas - Airline Management, Airline Revenue
                Accounting and Controls, and Airlines Business Development. He also holds an MBA
                in Project Management from GIMPA and Alumni of the Kwame Nkrumah University of
                Science and Technology (KNUST). He is a certified member of the Project
                Management Institute (PMI), USA.
              </p>
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

      <section className="bg-secondary py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <WingsIcon className="size-4" />
              Press & Media
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Featured
              <br />
              <span className="text-foreground/50">coverage.</span>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-3 gap-8 justify-items-center">
            <StaggerItem>
              <GlassBlogCard
                title="Aviation Safety in a Growing Market"
                excerpt="Richard Kyereh shares insights on safety management challenges facing rapidly expanding African carriers."
                image={images.controlPanel}
                author={{ name: "Aviation Week", avatar: "" }}
                date="Feb 2026"
                readTime="Featured"
                tags={["Safety", "Interview"]}
              />
            </StaggerItem>
            <StaggerItem>
              <GlassBlogCard
                title="The Future of Fleet Financing in Africa"
                excerpt="An in-depth look at emerging lease structures and investment vehicles for the continent's airlines."
                image={images.cargoPlane}
                author={{ name: "Airline Economics", avatar: "" }}
                date="Jan 2026"
                readTime="Featured"
                tags={["Fleet", "Finance"]}
              />
            </StaggerItem>
            <StaggerItem>
              <GlassBlogCard
                title="Sustainability Targets: Realistic Pathways"
                excerpt="Richard Kyereh on what realistic carbon reduction looks like for airlines in emerging markets."
                image={images.wingAbove}
                author={{ name: "Green Aviation", avatar: "" }}
                date="Dec 2025"
                readTime="Featured"
                tags={["Sustainability", "Analysis"]}
              />
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
