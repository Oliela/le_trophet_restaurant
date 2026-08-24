import Image from "next/image";

export function MenuDollBreak() {
  return (
    <div className="relative my-4 flex items-center justify-center overflow-hidden rounded-[2rem] bg-brun py-14">
      <div aria-hidden="true" className="bogolan-bg absolute inset-0 opacity-15" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative h-40 w-28 sm:h-48 sm:w-32">
          <Image
            src="/images/poupee-africaine-1.png"
            alt="Poupée africaine faisant partie de la décoration du restaurant Le Trophée"
            fill
            sizes="140px"
            className="object-contain"
          />
        </div>
        <p className="mt-4 max-w-xs font-display text-lg italic text-ivoire/85">
          « Chaque plat raconte un peu de notre histoire. »
        </p>
      </div>
    </div>
  );
}
