"use client";

import { useEffect, useState } from "react";

export function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-14 left-0 right-0 z-50 h-0.5 bg-border">
      <div
        className="h-full bg-foreground transition-all duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
