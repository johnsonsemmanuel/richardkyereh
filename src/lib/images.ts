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

export const awardImages = [
  unsplashUrl("1761813409957-681c1e4376ec"),
  unsplashUrl("1683971113886-ca5883e598b6"),
  unsplashUrl("1770620562966-8414ba9b1f77"),
  unsplashUrl("1761813409478-91163f7100d7"),
  unsplashUrl("1777360082567-6ee5ad429076"),
  unsplashUrl("1778433610719-822331b4f369"),
  unsplashUrl("1768886834010-c577b64ab8e0"),
  unsplashUrl("1759979702262-71e15fa210d4"),
  unsplashUrl("1684426268118-b9f828a96e1e"),
  unsplashUrl("1768637229595-8291ad2b6856"),
  unsplashUrl("1765305743880-c592b9a01756"),
  unsplashUrl("1761813409570-ebc80a41c324"),
];

export function unsplashUrl(id: string, w = 1200): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export const serviceImageUrls: Record<string, string> = {
  "Career Consultancy": unsplashUrl("1769678750254-fc938ce9da7a"),
  "Speaking Engagement": unsplashUrl("1778433610719-822331b4f369"),
  "Face To Face Meeting": unsplashUrl("1764304568191-172041e2e47c"),
  "Mentorship": unsplashUrl("1761813409570-ebc80a41c324"),
  "Aircraft Leases": unsplashUrl("1774698050881-4dc5c07c4d7d"),
  "Charters Services": unsplashUrl("1774995842354-a87e489f45f3"),
};

export const images = {
  // Hero / backgrounds
  heroCockpitDusk: unsplashUrl("1761813409957-681c1e4376ec", 1920),
  heroAerialRunway: unsplashUrl("1683971113886-ca5883e598b6", 1920),
  heroPrivateJet: unsplashUrl("1770620562966-8414ba9b1f77", 1920),
  heroCockpitRunway: unsplashUrl("1761813409478-91163f7100d7", 1920),

  // Cockpit / control
  cockpitInstruments: unsplashUrl("1769678750254-fc938ce9da7a"),
  cockpitHand: unsplashUrl("1764304568191-172041e2e47c"),
  controlPanel: unsplashUrl("1768554591368-292194a9f50c"),
  cockpitRunway2: unsplashUrl("1761813409570-ebc80a41c324"),

  // Aircraft
  cargoPlane: unsplashUrl("1774698050881-4dc5c07c4d7d"),
  emirates: unsplashUrl("1778433610719-822331b4f369"),
  runwaySunset: unsplashUrl("1774995842354-a87e489f45f3"),
  vintageCockpit: unsplashUrl("1777360082567-6ee5ad429076"),

  // Wing / aerial
  wingClouds: unsplashUrl("1768886834010-c577b64ab8e0"),
  wingAbove: unsplashUrl("1684426268118-b9f828a96e1e"),
  wingWindow: unsplashUrl("1759979702262-71e15fa210d4"),
} as const;

export const heroSlides = [
  {
    id: 0,
    gradient: "05080F,1A2D4A",
    image: images.heroCockpitDusk,
    title: "Richard Kyereh",
    quote:
      "Every great achievement in aviation began with a single decision to fly higher.",
  },
  {
    id: 1,
    gradient: "0A0F1A,1F2937",
    image: images.heroAerialRunway,
    title: "Strategic Leadership",
    quote:
      "In the skies and in business, clarity of vision determines the altitude you reach.",
  },
  {
    id: 2,
    gradient: "05080F,111827",
    image: images.heroPrivateJet,
    title: "Global Perspective",
    quote:
      "Four continents of experience taught me that excellence has no borders.",
  },
  {
    id: 3,
    gradient: "0A0F1A,1A2D4A",
    image: images.heroCockpitRunway,
    title: "Safety First",
    quote:
      "The best risk is the one you anticipated. The safest flight is the one you planned for.",
  },
];
