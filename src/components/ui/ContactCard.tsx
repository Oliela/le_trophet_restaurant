import type { ComponentType, SVGProps } from "react";

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function ContactCard({ icon: Icon, label, value, href, external = false }: Props) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-ivoire">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-grisbrun">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-brun">{value}</span>
      </span>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-2xl border border-brun/10 bg-ivoire-card p-4 shadow-soft transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-terracotta/30 hover:shadow-card";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
