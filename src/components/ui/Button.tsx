import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "default" | "icon" | "sm";
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-primary text-white hover:bg-brand-secondary active:opacity-90 rounded-ui",
      secondary: "bg-white text-brand-primary border border-surface-border hover:bg-background active:bg-slate-100 rounded-ui",
      ghost: "hover:bg-slate-100 hover:text-slate-900 border-transparent",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
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
