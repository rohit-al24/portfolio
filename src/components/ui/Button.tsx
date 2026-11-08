import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon-bright text-white hover:bg-maroon shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5",
  outline:
    "border border-line bg-transparent text-cream hover:border-maroon-bright/70 hover:bg-card-elevated/60 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-cream hover:bg-white/5 hover:-translate-y-0.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

interface LinkButtonProps {
  to?: string;
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Renders a router <Link> for internal routes and an <a> for external/hash links. */
export function LinkButton({
  to,
  href,
  external,
  variant = "primary",
  className,
  children,
  onClick,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
