import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "soft" | "strong";
  blur?: "sm" | "md" | "lg";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, variant = "default", blur = "md", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-white/20 shadow-glass",
          {
            // Backdrop blur variants
            "backdrop-blur-sm": blur === "sm",
            "backdrop-blur-md": blur === "md",
            "backdrop-blur-lg": blur === "lg",

            // Background variants
            "bg-white/10": variant === "default",
            "bg-white/5": variant === "soft",
            "bg-white/20": variant === "strong",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
