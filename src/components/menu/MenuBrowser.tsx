"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CategorySection } from "@/components/menu/CategorySection";
import { MenuDollBreak } from "@/components/menu/MenuDollBreak";
import type { MenuCategorySlug, MenuItem } from "@/lib/menu-data";

type Category = { slug: MenuCategorySlug; label: string };

const DOLL_BREAK_AFTER: MenuCategorySlug = "grillades";

export function MenuBrowser({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItem[];
}) {
  const [activeSlug, setActiveSlug] = useState<MenuCategorySlug>(categories[0]?.slug);
  const tabRefs = useRef<Partial<Record<MenuCategorySlug, HTMLAnchorElement>>>({});

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSlug(visible[0].target.id as MenuCategorySlug);
        }
      },
      { rootMargin: "-180px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    tabRefs.current[activeSlug]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug]);

  const handleSelect = (event: MouseEvent, slug: MenuCategorySlug) => {
    event.preventDefault();
    setActiveSlug(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav
        aria-label="Catégories de la carte"
        className="sticky top-20 z-30 -mx-6 border-b border-brun/10 bg-ivoire/95 px-6 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
      >
        <ul className="no-scrollbar mx-auto flex max-w-content list-none gap-2 overflow-x-auto py-4">
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.slug} className="shrink-0">
                <a
                  ref={(el) => {
                    if (el) tabRefs.current[category.slug] = el;
                  }}
                  href={`#${category.slug}`}
                  onClick={(event) => handleSelect(event, category.slug)}
                  aria-current={isActive ? "location" : undefined}
                  className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-terracotta bg-terracotta text-ivoire"
                      : "border-brun/15 text-grisbrun hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {category.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        {categories.map((category, index) => (
          <div key={category.slug}>
            <CategorySection
              slug={category.slug}
              label={category.label}
              index={index}
              items={items.filter((item) => item.categorie === category.slug)}
            />
            {category.slug === DOLL_BREAK_AFTER ? <MenuDollBreak /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
