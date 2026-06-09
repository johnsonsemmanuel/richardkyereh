import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Richard Kyereh, aerospace and aviation consultant with 15+ years of global experience.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
                About
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Richard
                <br />
                <span className="text-white/50">Kyereh.</span>
              </h1>
            </div>
            <div className="space-y-6">
              <p className="text-white/60 leading-relaxed text-lg">
                Richard Kyereh is an aerospace and aviation consultant with over
                15 years of experience across airlines, regulatory authorities,
                and investment firms. He has worked on four continents,
                advising on fleet strategies valued at over $2.8 billion.
              </p>
              <p className="text-white/40 leading-relaxed">
                His career spans commercial airlines, business aviation, and
                government aviation authorities. He has led safety audits,
                designed fleet acquisition strategies, and advised on market
                entry for startups and established carriers alike.
              </p>
              <p className="text-white/40 leading-relaxed">
                Richard holds advanced certifications in aviation safety
                management, aircraft asset management, and airline operations.
                He is a recognized speaker at industry conferences and
                contributes to regulatory working groups on safety and
                sustainability.
              </p>
              <Link
                href="/booking"
                className="mt-8 inline-flex items-center px-8 py-4 bg-gold text-navy-900 font-semibold hover:bg-gold-light transition-colors text-sm"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Experience",
                value: "15+ years",
                desc: "Across airlines, regulators, and investment firms on four continents.",
              },
              {
                label: "Expertise",
                value: "Full spectrum",
                desc: "From safety management systems to fleet strategy and sustainability.",
              },
              {
                label: "Impact",
                value: "$2.8B+",
                desc: "Fleet value advised across commercial and business aviation.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-8 bg-navy-800/30 border border-white/5"
              >
                <p className="text-xs text-gold uppercase tracking-widest font-medium">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
