"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PlaneIcon } from "@/components/ui/aviation-icons";
import { ExternalLink } from "lucide-react";

const SETMORE_URL = "https://richardkyereh.setmore.com/en";

const services = [
  { name: "Career Consultancy", duration: "1 hr" },
  { name: "Speaking Engagement", duration: "1 hr" },
  { name: "Face To Face Meeting", duration: "30 mins" },
  { name: "Mentorship", duration: "1 hr" },
  { name: "Aircraft Leases", duration: "1 hr" },
  { name: "Charters Services", duration: "1 hr" },
];

export default function BookingPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = SETMORE_URL;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <PlaneIcon className="size-8 text-primary/20 mx-auto mb-6" />
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Booking
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Book a session
                <br />
                <span className="text-foreground/50">with Richard.</span>
              </h1>
              <p className="mt-6 text-foreground/40 leading-relaxed max-w-md mx-auto">
                You are being redirected to our secure booking portal. Select your
                service, pick a time, and confirm in seconds.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {services.map((s) => (
                  <span
                    key={s.name}
                    className="text-xs bg-secondary/50 border border-input px-3 py-1.5 rounded-full text-foreground/50"
                  >
                    {s.name} &middot; {s.duration}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={SETMORE_URL} target="_blank" rel="noopener noreferrer">
                    Book on Setmore
                    <ExternalLink className="size-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Need Help Deciding?</Link>
                </Button>
              </div>

              <p className="mt-6 text-xs text-foreground/30">
                Redirecting to Setmore booking portal in a few seconds&hellip;
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
