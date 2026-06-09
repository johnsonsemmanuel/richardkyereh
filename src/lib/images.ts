function svgData(contents: string): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">${contents}</svg>`
  )}`;
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
    <rect width="800" height="600" fill="url(#g)"/>
    <rect x="1" y="1" width="798" height="598" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    <text x="400" y="270" text-anchor="middle" fill="white" font-family="Inter,system-ui,sans-serif" font-size="32" font-weight="700">${escapeXml(label)}</text>
    <text x="400" y="310" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="Inter,system-ui,sans-serif" font-size="14">${escapeXml(subtitle)}</text>`
  );
}

export function carouselSlide(
  title: string,
  quote: string,
  gradient: string = "05080F,1A2D4A"
): string {
  return svgData(
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${gradient.split(",")[0]}"/>
      <stop offset="100%" stop-color="#${gradient.split(",")[1]}"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.03)"/>
    </pattern></defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" fill="url(#dots)"/>
    <circle cx="400" cy="200" r="80" fill="rgba(255,255,255,0.03)"/>
    <circle cx="400" cy="200" r="50" fill="rgba(255,255,255,0.05)"/>
    <text x="400" y="320" text-anchor="middle" fill="white" font-family="Inter,system-ui,sans-serif" font-size="24" font-weight="700">${escapeXml(title)}</text>
    <text x="400" y="360" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Inter,system-ui,sans-serif" font-size="14" font-style="italic">"${escapeXml(quote)}"</text>`
  );
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
