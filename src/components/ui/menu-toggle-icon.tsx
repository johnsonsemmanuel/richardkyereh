"use client";

interface MenuToggleIconProps {
  open: boolean;
  className?: string;
  duration?: number;
}

export function MenuToggleIcon({ open, className, duration = 300 }: MenuToggleIconProps) {
  const d = duration / 1000;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        style={{
          transition: `all ${d}s ease`,
          transformOrigin: "center",
          translate: open ? "0 -2px" : "0",
          rotate: open ? "45deg" : "0deg",
        }}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        style={{
          transition: `all ${d}s ease`,
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        style={{
          transition: `all ${d}s ease`,
          transformOrigin: "center",
          translate: open ? "0 2px" : "0",
          rotate: open ? "-45deg" : "0deg",
        }}
      />
    </svg>
  );
}
