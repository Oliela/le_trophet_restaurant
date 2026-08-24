"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fait apparaître son contenu (léger fondu + déplacement vertical) lorsqu'il
 * entre dans le viewport. Respecte `prefers-reduced-motion` : les classes
 * `motion-safe:` ne s'appliquent jamais pour les visiteurs qui préfèrent
 * moins de mouvement, qui voient donc le contenu directement, sans transition.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`motion-safe:duration-700 motion-safe:ease-out motion-safe:transition-all ${
        visible
          ? "opacity-100 translate-y-0"
          : "motion-safe:translate-y-6 motion-safe:opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
