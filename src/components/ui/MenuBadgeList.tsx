import type { MenuBadge } from "@/lib/menu-data";

const BADGE_STYLE: Record<MenuBadge, string> = {
  Populaire: "bg-terracotta text-ivoire border-transparent",
  Épicé: "bg-transparent text-terracotta border-terracotta/40",
  Végétarien: "bg-transparent text-olive border-olive/40",
  "Sur commande": "bg-transparent text-grisbrun border-brun/25",
};

export function MenuBadgeList({
  badges,
  className = "",
}: {
  badges: MenuBadge[];
  className?: string;
}) {
  if (badges.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge) => (
        <li
          key={badge}
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${BADGE_STYLE[badge]}`}
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}
