import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { PlaneIcon } from "@/components/ui/aviation-icons";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and partners say about working with Richard Kyereh.",
};

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
          <Reveal className="max-w-xl mx-auto text-center py-16">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <PlaneIcon className="size-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Testimonials Coming Soon
            </h2>
            <p className="text-foreground/40 leading-relaxed">
              We are currently gathering authentic feedback from our clients and
              partners. Check back soon to hear directly from those who have
              worked with Richard Kyereh.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
