import { About } from "@/components/sections/About";
import { BestSellers } from "@/components/sections/BestSellers";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { SpacesServices } from "@/components/sections/SpacesServices";
import { WhyUs } from "@/components/sections/WhyUs";
import { BogolanDivider } from "@/components/ui/BogolanDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <div className="flex justify-center">
        <BogolanDivider variant="bande" className="max-w-content" />
      </div>
      <SpacesServices />
      <About />
      <Events />
      <WhyUs />
      <ReservationCta />
    </>
  );
}
