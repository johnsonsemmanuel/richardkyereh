"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useCallback } from "react";

type WavePathProps = React.ComponentProps<"div">;

export function WavePath({ className, ...props }: WavePathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useRef(0);
  const x = useRef(0.2);
  const time = useRef(Math.PI / 2);
  const reqId = useRef<number | null>(null);

  useEffect(() => {
    setPath(0);
  }, []);

  const setPath = useCallback((p: number) => {
    if (pathRef.current) {
      const width = Math.min(window.innerWidth * 0.7, 600);
      pathRef.current.setAttributeNS(
        null,
        "d",
        `M0 50 Q${width * x.current} ${50 + p * 0.6}, ${width} 50`
      );
    }
  }, []);

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const animateOut = useCallback(() => {
    const newProgress = progress.current * Math.sin(time.current);
    progress.current = lerp(progress.current, 0, 0.025);
    time.current += 0.2;
    setPath(newProgress);
    if (Math.abs(progress.current) > 0.75) {
      reqId.current = requestAnimationFrame(animateOut);
    } else {
      time.current = Math.PI / 2;
      progress.current = 0;
    }
  }, [setPath]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.current = (e.clientX - rect.left) / rect.width;
    progress.current += e.movementY;
    setPath(progress.current);
  }, [setPath]);

  const handleMouseLeave = useCallback(() => {
    if (reqId.current) cancelAnimationFrame(reqId.current);
    animateOut();
  }, [animateOut]);

  return (
    <div className={cn("relative h-px w-[70vw] max-w-md mx-auto", className)} {...props}>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative -top-5 z-10 h-10 w-full cursor-crosshair hover:-top-[150px] hover:h-[300px]"
      />
      <svg
        className="absolute -top-[100px] h-[300px] w-full"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          className="fill-none stroke-current text-foreground/10"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
}
