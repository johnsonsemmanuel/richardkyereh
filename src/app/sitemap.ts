import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://richardkyereh.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/booking`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/awards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/newsroom`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
