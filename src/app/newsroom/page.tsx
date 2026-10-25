import type { Metadata } from "next";
import { articles } from "@/lib/articles";
import { NewsroomFilter } from "./filter";
import { SectionHeader } from "@/components/ui/section-header";
import { WingsIcon } from "@/components/ui/aviation-icons";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, media coverage, and announcements from Richard Kyereh.",
};

const allTags = [...new Set(articles.flatMap((a) => a.tags))];

export default function NewsroomPage() {
  return (
    <>
      <section className="section-bg-light">
        <div className="premium-container py-12 lg:pt-40 lg:pb-20">
          <SectionHeader
            title="Newsroom"
            subtitle="&amp; insights."
            description="Press coverage, industry analysis, and thought leadership from Richard Kyereh."
            icon={WingsIcon}
          />
        </div>
      </section>

      <NewsroomFilter articles={articles} allTags={allTags} />
    </>
  );
}
