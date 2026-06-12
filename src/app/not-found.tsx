import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CompassIcon } from "@/components/ui/aviation-icons";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
          <CompassIcon className="size-4" />
          404 Error
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-foreground">
          Off
          <span className="text-foreground/50"> course.</span>
        </h1>
        <p className="mt-6 text-foreground/50 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Let us navigate you back to familiar airspace.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
