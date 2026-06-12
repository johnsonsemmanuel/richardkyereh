import { PlaneIcon } from "@/components/ui/aviation-icons";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <PlaneIcon className="size-8 text-primary/40 animate-pulse" />
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
