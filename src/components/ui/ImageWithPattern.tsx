import Image from "next/image";
import { BogolanDivider } from "@/components/ui/BogolanDivider";

type BackdropColor = "terracotta" | "ocre" | "olive";
type Shape = "organic" | "rounded" | "circle";

const BACKDROP_COLOR: Record<BackdropColor, string> = {
  terracotta: "bg-terracotta/85",
  ocre: "bg-ocre/70",
  olive: "bg-olive/70",
};

const SHAPE_CLASS: Record<Shape, string> = {
  organic: "rounded-organic",
  rounded: "rounded-[2rem]",
  circle: "rounded-full",
};

type Props = {
  src: string;
  alt: string;
  sizes: string;
  aspect?: string;
  shape?: Shape;
  /** Forme colorée abstraite légèrement décalée derrière l'image (idéal pour les poupées détourées). */
  backdrop?: BackdropColor;
  /** Position/taille du backdrop ; par défaut un léger débord sur les 4 côtés. */
  backdropClassName?: string;
  /** Petit accent bogolan glissé dans un angle. */
  bogolanCorner?: boolean;
  bogolanCornerClassName?: string;
  shadow?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Photo (ou poupée détourée) présentée avec sa mise en scène : forme
 * abstraite colorée en fond, ombre douce et accent bogolan optionnel.
 * Sert la fonction narrative des poupées africaines sans jamais surcharger
 * l'écran — un seul backdrop, une seule image à la fois.
 */
export function ImageWithPattern({
  src,
  alt,
  sizes,
  aspect = "aspect-[3/4]",
  shape = "rounded",
  backdrop,
  backdropClassName = "-inset-4",
  bogolanCorner = false,
  bogolanCornerClassName = "-bottom-5 -right-5",
  shadow = true,
  priority = false,
  className = "",
  imgClassName = "",
}: Props) {
  return (
    <div className={`relative ${className}`}>
      {backdrop ? (
        <div
          aria-hidden="true"
          className={`absolute -z-10 ${backdropClassName} ${SHAPE_CLASS.organic} ${BACKDROP_COLOR[backdrop]}`}
        />
      ) : null}
      {bogolanCorner ? (
        <BogolanDivider variant="angle" className={`absolute -z-10 ${bogolanCornerClassName}`} />
      ) : null}
      <div
        className={`relative w-full overflow-hidden ${aspect} ${SHAPE_CLASS[shape]} ${
          shadow ? "shadow-card" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
}
