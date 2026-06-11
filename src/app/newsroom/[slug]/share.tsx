"use client";

import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";
import { LinkedInIcon, XIcon } from "@/components/ui/social-icons";

interface Props {
  title: string;
  slug: string;
}

export function ArticleShare({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/newsroom/${slug}`
    : `/newsroom/${slug}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/30">
        Share
      </span>
      <div className="flex items-center gap-1.5">
        <a
          href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="size-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="size-3.5 text-foreground/40" />
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="size-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
          aria-label="Share on X"
        >
          <XIcon className="size-3.5 text-foreground/40" />
        </a>
        <button
          onClick={copyLink}
          className="size-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="size-3.5 text-foreground/40" />
          ) : (
            <ClipboardCopy className="size-3.5 text-foreground/40" />
          )}
        </button>
      </div>
    </div>
  );
}
