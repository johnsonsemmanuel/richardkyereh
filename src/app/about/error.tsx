"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CompassIcon } from "@/components/ui/aviation-icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
          <CompassIcon className="size-4" />
          Something went wrong
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
          System
          <br />
          <span className="text-foreground/50">anomaly.</span>
        </h1>
        <p className="mt-6 text-foreground/50 leading-relaxed">
          An unexpected error has occurred. Our team has been notified.
          Please try again or return to the homepage.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
