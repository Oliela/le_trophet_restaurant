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
    <section className="bg-brun pb-16 pt-32 sm:pt-40">
      <Container>
        <span className="eyebrow text-ocre-light">{eyebrow}</span>
        <h1 className="section-title text-ivoire">{title}</h1>
        <p className="section-text text-ivoire/75">{text}</p>
      </Container>
    </section>
  );
}
