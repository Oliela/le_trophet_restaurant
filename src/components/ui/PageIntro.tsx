import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brun pb-16 pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brun via-brun/70 to-brun/30" />
      </div>
      <Container className="relative">
        <span className="eyebrow text-ocre-light">{eyebrow}</span>
        <h1 className="section-title text-ivoire">{title}</h1>
        <p className="section-text text-ivoire/75">{text}</p>
      </Container>
    </section>
  );
}
