function svgData(contents: string): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">${contents}</svg>`
  )}`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function placeholderImage(
  label: string,
  subtitle: string,
  gradient: string = "05080F,0A0F1A"
): string {
  return svgData(
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${gradient.split(",")[0]}"/>
      <stop offset="100%" stop-color="#${gradient.split(",")[1]}"/>
    </linearGradient></defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <rect x="1" y="1" width="1198" height="798" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    <text x="600" y="370" text-anchor="middle" fill="white" font-family="Inter,system-ui,sans-serif" font-size="48" font-weight="700">${escapeXml(label)}</text>
    <text x="600" y="420" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Inter,system-ui,sans-serif" font-size="18">${escapeXml(subtitle)}</text>`
  );
}

export function serviceImage(
  title: string,
  gradient: string = "05080F,1A2D4A"
): string {
  return svgData(
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${gradient.split(",")[0]}"/>
      <stop offset="100%" stop-color="#${gradient.split(",")[1]}"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.03)"/>
    </pattern></defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <rect width="1200" height="800" fill="url(#dots)"/>
    <circle cx="600" cy="350" r="120" fill="rgba(255,255,255,0.02)"/>
    <circle cx="600" cy="350" r="80" fill="rgba(255,255,255,0.03)"/>
    <text x="600" y="360" text-anchor="middle" fill="white" font-family="Inter,system-ui,sans-serif" font-size="36" font-weight="700">${escapeXml(title)}</text>`
  );
}

export function portrait(label: string = "R", gradient: string = "05080F,1A2D4A"): string {
  return svgData(
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${gradient.split(",")[0]}"/>
      <stop offset="100%" stop-color="#${gradient.split(",")[1]}"/>
    </linearGradient>
    <clipPath id="c"><circle cx="300" cy="300" r="300"/></clipPath></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <g clip-path="url(#c)">
      <circle cx="300" cy="240" r="100" fill="rgba(255,255,255,0.08)"/>
      <ellipse cx="300" cy="430" rx="140" ry="80" fill="rgba(255,255,255,0.05)"/>
    </g>
    <text x="300" y="480" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-family="Inter,system-ui,sans-serif" font-size="120" font-weight="700">${escapeXml(label)}</text>`
  );
}

export function heroBg(gradient: string = "05080F,0A0F1A"): string {
  return svgData(
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${gradient.split(",")[0]}"/>
      <stop offset="100%" stop-color="#${gradient.split(",")[1]}"/>
    </linearGradient>
    <pattern id="hex" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M40 0L80 23v46L40 92 0 69V23z" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
    </pattern></defs>
    <rect width="1200" height="800" fill="#05080F"/>
    <rect width="1200" height="800" fill="url(#g)" opacity="0.6"/>
    <rect width="1200" height="800" fill="url(#hex)"/>`
  );
}

export function awardImage(
  title: string,
  year: string,
  gradient: string = "0A0F1A,1A2D4A"
): string {
  const colors = gradient.split(",").map((c) => `#${c}`);
  return svgData(
    `<defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="100%" stop-color="${colors[1]}"/>
      </linearGradient>
      <pattern id="grain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="1" height="1" fill="rgba(255,255,255,0.02)"/>
        <rect x="2" y="2" width="1" height="1" fill="rgba(255,255,255,0.015)"/>
      </pattern>
      <linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.6)"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" fill="url(#grain)"/>
    <circle cx="400" cy="200" r="160" fill="rgba(255,255,255,0.03)"/>
    <circle cx="300" cy="450" r="100" fill="rgba(255,255,255,0.02)"/>
    <circle cx="580" cy="380" r="80" fill="rgba(255,255,255,0.02)"/>
    <rect x="0" y="380" width="800" height="220" fill="url(#f)"/>
    <text x="40" y="460" fill="rgba(255,255,255,0.5)" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="600" letter-spacing="2">${escapeXml(year)}</text>
    <text x="40" y="490" fill="white" font-family="Inter,system-ui,sans-serif" font-size="22" font-weight="700">${escapeXml(title)}</text>`
  );
}

export const heroSlides = [
  {
    id: 0,
    gradient: "05080F,1A2D4A",
    title: "Richard Kyereh",
    quote:
      "Every great achievement in aviation began with a single decision to fly higher.",
  },
  {
    id: 1,
    gradient: "0A0F1A,1F2937",
    title: "Strategic Leadership",
    quote:
      "In the skies and in business, clarity of vision determines the altitude you reach.",
  },
  {
    id: 2,
    gradient: "05080F,111827",
    title: "Global Perspective",
    quote:
      "Four continents of experience taught me that excellence has no borders.",
  },
  {
    id: 3,
    gradient: "0A0F1A,1A2D4A",
    title: "Safety First",
    quote:
      "The best risk is the one you anticipated. The safest flight is the one you planned for.",
  },
];
