import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "accent" | "dark-outline";
  size?: "default" | "icon" | "sm";
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-[#0f172a] text-white hover:bg-[#334155] active:opacity-90 rounded-ui",
      secondary: "bg-white text-[#0f172a] border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-ui",
      ghost: "hover:bg-white/10 hover:text-white border-transparent",
      outline: "border border-slate-600 bg-transparent hover:bg-white/10 text-white",
      accent: "bg-[#ff6d00] text-white hover:bg-[#e56200] active:bg-[#cc5700] rounded-ui transition-transform duration-200 hover:scale-[1.02]",
      "dark-outline": "border border-white/30 bg-transparent text-white hover:bg-white/10 rounded-ui transition-transform duration-200 hover:scale-[1.02]",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      icon: "h-9 w-9",
      sm: "h-8 px-3 text-xs",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant as keyof typeof variants],
          size && sizes[size as keyof typeof sizes],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
