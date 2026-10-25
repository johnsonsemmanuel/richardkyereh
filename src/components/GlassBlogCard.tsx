"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock, User } from "lucide-react";

interface GlassBlogCardProps {
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
  title: "The Future of UI Design",
  excerpt:
    "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
  image:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%231c1308' width='800' height='400'/%3E%3Ctext x='50%25' y='50%25' fill='%23fef3c7' font-family='system-ui' font-size='20' text-anchor='middle' dominant-baseline='middle'%3EArticle%3C/text%3E%3C/svg%3E",
  author: {
    name: "Moumen Soliman",
    avatar: "https://github.com/shadcn.png",
  },
  date: "Dec 2, 2025",
  readTime: "5 min read",
  tags: ["Design", "UI/UX"],
};

export function GlassBlogCard({
  title = defaultPost.title,
  excerpt = defaultPost.excerpt,
  image = defaultPost.image,
  author = defaultPost.author,
  date = defaultPost.date,
  readTime = defaultPost.readTime,
  tags = defaultPost.tags,
  className,
}: GlassBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[400px]", className)}
    >
      <Card className="group relative h-full overflow-hidden shadow-premium-hover hover:border-primary/50">
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%231c1308' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' fill='%23fef3c7' font-family='system-ui' font-size='24' text-anchor='middle' dominant-baseline='middle'%3EArticle%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags?.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-background/80 hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-card/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg"
            >
              <BookOpen className="h-4 w-4" />
              Read Article
            </motion.button>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {excerpt}
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-4 pb-0">
          <div className="flex items-center justify-between">
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
    </motion.div>
  );
}
