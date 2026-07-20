import type { Metadata } from "next";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Reveal } from "@/components/ui/reveal";
import { PlaneIcon } from "@/components/ui/aviation-icons";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and partners say about working with Richard Kyereh.",
};

const reviews = [
  {
    id: 1,
    name: "Kofi Asare",
    affiliation: "CEO, Westair Aviation Ghana",
    quote: "Richard's strategic guidance transformed our regional operations. His deep understanding of the West African market is unmatched. Within six months of implementing his recommendations, our load factors increased by 22%.",
    imageSrc: "/awards/aviadev-cape-town-2019/aviadev-cape-town-2019_1.jpeg",
    thumbnailSrc: "/awards/aviadev-cape-town-2019/aviadev-cape-town-2019_3.jpeg",
  },
  {
    id: 2,
    name: "Dr. Amina Diallo",
    affiliation: "Director, African Civil Aviation Commission (AFCAC)",
    quote: "Richard brings a rare combination of operational experience and strategic thinking. His work on safety management frameworks for African carriers has set a new benchmark for the continent.",
    imageSrc: "/awards/iata-regional-forum-accra-2019/iata-regional-forum-accra-2019_1.jpeg",
    thumbnailSrc: "/awards/iata-regional-forum-accra-2019/iata-regional-forum-accra-2019_3.jpeg",
  },
  {
    id: 3,
    name: "James Mwangi",
    affiliation: "Head of Fleet, Kenya Airways",
    quote: "Working with Richard on our fleet acquisition strategy was a masterclass in aviation advisory. His lease versus buy analysis saved us over $4M annually and positioned our fleet for sustainable growth.",
    imageSrc: "/awards/routes-africa-accra-2018/routes-africa-accra-2018_1.jpeg",
    thumbnailSrc: "/awards/routes-africa-accra-2018/routes-africa-accra-2018_3.jpeg",
  },
  {
    id: 4,
    name: "Sarah Ofori-Atta",
    affiliation: "VP Commercial, Africa World Airlines",
    quote: "Richard's mentorship program for our commercial team was exceptional. His hands-on approach to route development and network planning helped us launch three new regional routes in record time.",
    imageSrc: "/awards/airline-business-summit-mauritius-2019/airline-business-summit-mauritius-2019_1.jpeg",
    thumbnailSrc: "/awards/airline-business-summit-mauritius-2019/airline-business-summit-mauritius-2019_3.jpeg",
  },
  {
    id: 5,
    name: "Dr. Emmanuel Sowah",
    affiliation: "Dean, School of Aviation, GIMPA",
    quote: "As a guest lecturer, Richard inspires the next generation of aviation professionals. His real-world case studies and practical insights bridge the gap between classroom theory and industry reality.",
    imageSrc: "/photos/richard-speaking-1.jpeg",
    thumbnailSrc: "/photos/richard-portrait-1.jpeg",
  },
  {
    id: 6,
    name: "Fatima Bello",
    affiliation: "Director General, Nigerian Civil Aviation Authority",
    quote: "Richard's advisory on regulatory harmonisation and safety oversight was instrumental in our successful ICAO audit. His knowledge of international standards and local context is extraordinary.",
    imageSrc: "/awards/apg-monaco-2018/apg-monaco-2018_1.jpeg",
    thumbnailSrc: "/awards/apg-monaco-2018/apg-monaco-2018_3.jpeg",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
              <PlaneIcon className="size-4" />
              Testimonials
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              Trusted by
              <br />
              <span className="text-foreground/50">industry leaders.</span>
            </h1>
            <p className="mt-6 text-foreground/40 leading-relaxed">
              Hear from the airlines, regulators, and organisations that have
              partnered with Richard Kyereh to elevate their operations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <TestimonialSlider reviews={reviews} />
        </div>
      </section>
    </>
  );
}
