"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock, User } from "lucide-react";

interface GlassBlogCardProps {
  slug?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  author?: {
    name: string;
    avatar: string;
  };
  date?: string;
  readTime?: string;
  tags?: string[];
  className?: string;
}

const defaultPost = {
  slug: "",
  title: "The Future of UI Design",
  excerpt:
    "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
  image: "/photos/richard-speaking-1.jpeg",
  author: {
    name: "Richard Kyereh",
    avatar: "/photos/richard-biography.jpg",
  },
  date: "Dec 2, 2025",
  readTime: "5 min read",
  tags: ["Aviation", "Strategy"],
};

export function GlassBlogCard({
  slug = defaultPost.slug,
  title = defaultPost.title,
  excerpt = defaultPost.excerpt,
  image = defaultPost.image,
  author = defaultPost.author,
  date = defaultPost.date,
  readTime = defaultPost.readTime,
  tags = defaultPost.tags,
  className,
}: GlassBlogCardProps) {
  const href = slug ? `/newsroom/${slug}` : "/newsroom";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[400px] h-full", className)}
    >
      <Link href={href} className="block h-full">
        <Card className="group relative h-full flex flex-col overflow-hidden shadow-premium-hover hover:border-primary/50">
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/photos/richard-speaking-1.jpeg";
              }}
            />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              {tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-background/85 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-card/85 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg">
                <BookOpen className="h-4 w-4" />
                Read Article
              </span>
            </div>
          </div>

          <CardContent className="p-5 flex-1">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {excerpt}
              </p>
            </div>
          </CardContent>

          <CardFooter className="px-5 pt-0 pb-5">
            <div className="flex w-full items-center justify-between border-t border-border/60 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-medium text-foreground">
                    {author.name}
                  </span>
                  <span className="text-muted-foreground">{date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
