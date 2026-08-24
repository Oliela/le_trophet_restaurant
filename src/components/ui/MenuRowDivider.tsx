/**
 * Séparateur fin inspiré des motifs géométriques du bogolan (et non de la
 * texture photographiée), pour ponctuer une longue liste sans l'alourdir.
 * Pour la texture réelle, voir `BogolanDivider`.
 */
export function MenuRowDivider({ className = "" }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`h-px w-full opacity-70 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, currentColor 0 5px, transparent 5px 13px)",
        color: "#A84324",
      }}
    />
  );
}
