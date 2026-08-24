type Variant = "bande" | "carre" | "angle" | "coin-carte";

type Props = {
  variant?: Variant;
  className?: string;
  /** Pour la variante "bande" : orientation de la bande. */
  orientation?: "horizontal" | "vertical";
};

const VARIANT_CLASS: Record<Exclude<Variant, "bande">, string> = {
  carre: "h-9 w-9 rounded-lg shadow-soft",
  angle: "h-16 w-16 rounded-2xl shadow-soft sm:h-20 sm:w-20",
  "coin-carte": "h-10 w-10 opacity-90 [clip-path:polygon(100%_0,100%_100%,0_0)]",
};

/**
 * Signature visuelle du restaurant : bande décorative utilisant la véritable
 * photographie du tissu bogolan (/images/bogolan-texture.jpg).
 *
 * Quatre usages, toujours avec sobriété :
 * - "bande" : fine bande horizontale (héros, séparateurs de section, footer)
 * - "carre" : petit carré décoratif à placer près d'un titre
 * - "angle" : accent d'angle plus large, en fond de carte ou de bloc
 * - "coin-carte" : petit triangle glissé dans l'angle d'une carte plat
 *
 * Chaque variante porte sa propre taille pour éviter tout conflit de classes
 * Tailwind : ne jamais imposer de hauteur ou largeur via `className`, seul le
 * placement (position, marges) doit être passé de l'extérieur.
 *
 * Ne jamais placer derrière un long paragraphe : la texture reste un accent,
 * jamais un fond de lecture.
 */
export function BogolanDivider({ variant = "bande", className = "", orientation = "horizontal" }: Props) {
  if (variant === "bande") {
    const size = orientation === "horizontal" ? "h-3 w-full" : "h-full w-3";
    return <div role="presentation" aria-hidden="true" className={`bogolan-bg ${size} ${className}`} />;
  }

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`bogolan-bg shrink-0 ${VARIANT_CLASS[variant]} ${className}`}
    />
  );
}
