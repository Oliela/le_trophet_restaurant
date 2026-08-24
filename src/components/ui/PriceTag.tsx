import { formatPrice } from "@/lib/format";

export function PriceTag({
  amount,
  size = "md",
  className = "",
}: {
  amount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "lg"
      ? "h-20 w-20 text-sm"
      : size === "sm"
        ? "h-12 w-12 text-[10px]"
        : "h-16 w-16 text-xs";

  return (
    <span
      className={`inline-flex shrink-0 flex-col items-center justify-center rounded-full bg-ocre text-center font-bold leading-tight text-brun shadow-soft ${sizeClass} ${className}`}
    >
      {formatPrice(amount)
        .replace(" F CFA", "")
        .split(" ")
        .map((part, i) => (
          <span key={i}>{part}</span>
        ))}
      <span className="text-[0.6em] font-semibold uppercase tracking-wide">F CFA</span>
    </span>
  );
}
