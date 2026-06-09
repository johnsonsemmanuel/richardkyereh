import { images } from "./images";

export interface Article {
  title: string;
  excerpt: string;
  image: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    title: "Richard Kyereh Speaks at Global Aviation Summit 2026",
    excerpt:
      "Keynote address on the future of fleet management and sustainable aviation in emerging markets.",
    image: images.emirates,
    author: { name: "Press Team", avatar: "" },
    date: "Jun 2026",
    readTime: "3 min read",
    tags: ["Speaking", "Industry"],
  },
  {
    title: "The State of Global Fleet Management in 2026",
    excerpt:
      "An analysis of fleet utilization trends, lease rates, and emerging market dynamics shaping aerospace investment decisions.",
    image: images.cargoPlane,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "May 2026",
    readTime: "6 min read",
    tags: ["Fleet", "Markets"],
  },
  {
    title: "New Advisory Framework for African Carriers Launched",
    excerpt:
      "A comprehensive framework designed to help African carriers meet international safety and operational standards.",
    image: images.cockpitInstruments,
    author: { name: "Press Team", avatar: "" },
    date: "Apr 2026",
    readTime: "4 min read",
    tags: ["Advisory", "Africa"],
  },
  {
    title: "Safety Management Systems Beyond Compliance",
    excerpt:
      "How leading carriers are transforming SMS from a regulatory requirement into a competitive advantage in operations.",
    image: images.controlPanel,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "Apr 2026",
    readTime: "4 min read",
    tags: ["Safety", "Compliance"],
  },
  {
    title: "Interview: The State of Aerospace in West Africa",
    excerpt:
      "An in-depth conversation on regional aviation growth, infrastructure challenges, and investment opportunities.",
    image: images.wingWindow,
    author: { name: "Press Team", avatar: "" },
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["Interview", "Markets"],
  },
  {
    title: "Sustainable Aviation Fuel: Realities & Roadmap",
    excerpt:
      "A practical assessment of SAF adoption timelines, infrastructure requirements, and cost trajectories for airlines.",
    image: images.wingAbove,
    author: { name: "Richard Kyereh", avatar: "" },
    date: "Mar 2026",
    readTime: "5 min read",
    tags: ["Sustainability", "Fuel"],
  },
];
