import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "light";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  light: "btn-light",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${VARIANT_CLASS[variant]} ${className}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${VARIANT_CLASS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
