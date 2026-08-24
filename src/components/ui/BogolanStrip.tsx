type Props = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Fine decorative band using the restaurant's real bogolan fabric photo.
 * Used sparingly as a separator — never as a full-bleed background.
 */
export function BogolanStrip({ orientation = "horizontal", className = "" }: Props) {
  const size = orientation === "horizontal" ? "h-3 w-full" : "h-full w-3";
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`bogolan-bg ${size} ${className}`}
    />
  );
}
