import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  external?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  external = false,
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold tracking-tight rounded-full transition-all duration-200 ease-out select-none active:scale-[0.98] cursor-pointer";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-brand-teal text-brand-dark shadow-sm hover:bg-[#9de1e0] hover:shadow-md hover:shadow-brand-teal/20",
    secondary:
      "bg-brand-dark text-white shadow-sm hover:bg-brand-charcoal hover:shadow-md hover:shadow-black/20",
    outline:
      "bg-white text-brand-dark border border-brand-border shadow-sm hover:bg-brand-surface hover:border-brand-grayMuted hover:shadow",
    white:
      "bg-white text-brand-dark shadow-sm hover:bg-brand-surface hover:shadow-md",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          onClick={onClick}
        >
          {icon}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
