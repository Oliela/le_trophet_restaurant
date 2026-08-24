import { Reveal } from "@/components/ui/Reveal";

type Align = "left" | "center";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: Align;
  light?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <span className={`eyebrow ${light ? "text-ocre-light" : ""}`}>{eyebrow}</span>
      <h2 className={`section-title ${light ? "text-ivoire" : ""}`}>{title}</h2>
      {text ? (
        <p
          className={`section-text ${align === "center" ? "mx-auto" : ""} ${
            light ? "text-ivoire/75" : ""
          }`}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}
