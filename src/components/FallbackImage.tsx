"use client";

import { useState } from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%2305080F' width='1920' height='1080'/%3E%3Ctext x='50%25' y='50%25' fill='%23ffffff10' font-family='system-ui' font-size='32' text-anchor='middle' dominant-baseline='middle'%3EArticle%3C/text%3E%3C/svg%3E";

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function FallbackImage({ src, alt, ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt ?? ""}
      onError={() => setImgSrc(PLACEHOLDER)}
      {...props}
    />
  );
}
