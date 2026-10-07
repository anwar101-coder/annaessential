import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export function BackButton({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Back to home page"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-300",
        tone === "light"
          ? "border-hero-line text-hero-foreground hover:border-gold hover:text-gold"
          : "border-border bg-background text-primary hover:border-gold hover:text-gold-deep",
        className,
      )}
    >
      <ArrowLeft className="size-5" />
    </Link>
  );
}
