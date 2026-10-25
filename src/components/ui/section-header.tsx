import React from "react";
import { CompassIcon } from "@/components/ui/aviation-icons";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  icon: Icon,
  iconColor = "text-primary",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-muted-foreground text-sm font-medium tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
        {Icon && <Icon className="size-4" />}
        {subtitle || title}
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
        {title}
        <br />
        {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
      </h1>
      {description && (
        <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
