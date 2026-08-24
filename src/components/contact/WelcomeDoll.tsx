import Image from "next/image";

export function WelcomeDoll() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-ocre/25 bg-ocre/10 p-6 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
      <div className="relative order-2 h-24 w-16 shrink-0 sm:order-1 sm:h-32 sm:w-20">
        <Image
          src="/images/poupee-africaine-3.png"
          alt="Poupée africaine accueillant les visiteurs du restaurant Le Trophée"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>
      <p className="order-1 font-display text-lg italic text-brun sm:order-2">
        « Akwaaba ! Notre équipe vous accueille dans une ambiance chaleureuse et
        conviviale. »
      </p>
    </div>
  );
}
