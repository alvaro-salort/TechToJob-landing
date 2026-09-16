import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "dark" | "outline";
  className?: string;
}

export function Badge({ children, variant = "teal", className = "" }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-medium tracking-wide rounded-full select-none border transition-colors";

  const variants = {
    teal: "bg-brand-teal/15 text-brand-dark border-brand-teal/30",
    dark: "bg-brand-dark text-white border-brand-dark/20",
    outline: "bg-white text-brand-grayText border-brand-border",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
      {children}
    </span>
  );
}
