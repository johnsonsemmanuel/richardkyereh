import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PlaneIcon } from "@/components/ui/aviation-icons";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and partners say about working with Richard Kyereh.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="section-bg-light">
        <div className="premium-container py-12 lg:pt-40 lg:pb-16">
          <SectionHeader
            title="Trusted by"
            subtitle="industry leaders."
            description="Hear from the airlines, regulators, and organisations that have partnered with Richard Kyereh to elevate their operations."
            icon={PlaneIcon}
          />
        </div>
      </section>

      <section className="section-bg-light section-padding">
        <div className="premium-container">
          <Reveal className="max-w-xl mx-auto text-center py-16">
            <div className="size-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <PlaneIcon className="size-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Testimonials Coming Soon
            </h2>
            <p className="text-muted-foreground leading-relaxed">
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
