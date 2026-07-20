"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

interface Props {
  value: PortableTextBlock[];
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 my-6 text-foreground/70 italic">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/70 leading-relaxed mb-4">{children}</p>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <img
          src={value.asset?.url || ""}
          alt={value.alt || ""}
          className="w-full rounded-xl"
        />
        {value.caption && (
          <figcaption className="text-sm text-foreground/40 text-center mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

export function PortableTextRenderer({ value }: Props) {
  return <PortableText value={value} components={components} />;
}
