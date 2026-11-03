"use client";

import { useState } from "react";

const PLACEHOLDER = "/photos/richard-speaking-1.jpeg";

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function FallbackImage({ src, alt, ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  return (
    <img
      src={imgSrc}
      alt={alt ?? ""}
      onError={() => setImgSrc(PLACEHOLDER)}
      {...props}
    />
  );
}
