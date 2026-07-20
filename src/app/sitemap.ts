import type { MetadataRoute } from "next";

const lastModified = new Date("2026-07-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://richardkyereh.vercel.app";

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/booking`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/awards`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/testimonials`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/newsroom`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
