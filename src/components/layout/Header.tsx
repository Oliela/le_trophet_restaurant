"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons/Icons";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ivoire/95 shadow-soft backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Le Trophée — restaurant ivoirien à Dakar"
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <span
            className={`font-display text-2xl font-semibold tracking-wide ${
              solid ? "text-brun" : "text-ivoire"
            }`}
          >
            {SITE.name}
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-9 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm font-semibold uppercase tracking-wide transition-colors ${
                  solid ? "text-brun" : "text-ivoire"
                } hover:text-terracotta ${
                  isActive ? "text-terracotta" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] w-full bg-terracotta transition-transform origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter Le Trophée sur WhatsApp"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              solid
                ? "border-brun/15 text-olive hover:border-olive"
                : "border-ivoire/30 text-ivoire hover:border-ivoire"
            }`}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Button href="/contact" variant="primary">
            Réserver une table
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            solid ? "text-brun" : "text-ivoire"
          }`}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </Container>

      <div
        id="menu-mobile"
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-brun/10 bg-ivoire`}
      >
        <Container className="flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-base font-semibold ${
                  isActive ? "bg-terracotta/10 text-terracotta" : "text-brun"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4 flex items-center gap-3">
            <Button href="/contact" variant="primary" className="flex-1">
              Réserver une table
            </Button>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter Le Trophée sur WhatsApp"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-olive/40 text-olive"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
