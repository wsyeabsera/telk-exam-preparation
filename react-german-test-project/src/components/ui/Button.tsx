import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-amber-500 text-black hover:bg-amber-600 focus-visible:ring-amber-500":
              variant === "primary",
            "bg-zinc-700 text-white hover:bg-zinc-600 focus-visible:ring-zinc-500":
              variant === "secondary",
            "border-2 border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-500":
              variant === "outline",
            "hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-500":
              variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
