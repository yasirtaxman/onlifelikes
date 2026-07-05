import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-forest text-white hover:bg-forest-dark focus-visible:outline-forest",
  secondary:
    "bg-sage-light text-pine hover:bg-sage/60 focus-visible:outline-sage",
  outline:
    "border-2 border-forest text-forest hover:bg-forest hover:text-white focus-visible:outline-forest",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="nofollow sponsored noopener"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
