"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const NAV_LINKS = [
  { href: "/kadin-parfum", label: "Kadın" },
  { href: "/erkek-parfum", label: "Erkek" },
  { href: "/nis-parfum", label: "Niş" },
  { href: "/parfumunu-bul", label: "Parfümünü Bul" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

const Wordmark = ({ onDark }: { onDark: boolean }) => (
  <Link
    href="/"
    aria-label="Blue Parfümeri ana sayfa"
    className="flex min-h-11 flex-col justify-center leading-none"
  >
    <span
      className={`font-display text-[1.75rem] font-medium tracking-[0.08em] ${onDark ? "foil animate-sheen" : "text-brand"}`}
    >
      BLUE
    </span>
    <span className="mt-1 text-[0.625rem] font-medium tracking-[0.42em]">
      PARFÜMERİ
    </span>
  </Link>
);

const Header = () => {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The bar turns solid when the hero's bottom edge reaches it, not before.
    const update = () => {
      const hero = document.querySelector("main > section");
      const bottom = hero?.getBoundingClientRect().bottom ?? 0;
      setPastHero(bottom <= 72);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const button = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [menuOpen]);

  const transparent = pathname === "/" && !pastHero;
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[4.5rem] ${
        transparent
          ? "hero-scrim text-ivory"
          : "border-b border-ink/10 bg-ground text-ink"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between gap-8 px-5 sm:px-10 lg:px-16">
        <Wordmark onDark={transparent} />

        <nav aria-label="Ana menü" className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`py-3 text-[0.9375rem] tracking-wide underline-offset-[0.5em] hover:underline aria-[current=page]:underline ${transparent ? "decoration-gold" : "decoration-brand"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/satin-al"
            aria-current={isActive("/satin-al") ? "page" : undefined}
            className={transparent ? "btn-line-ivory" : "btn-brand"}
          >
            Koleksiyon
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="min-h-11 px-1 text-[0.9375rem] font-medium tracking-[0.2em] lg:hidden"
        >
          MENÜ
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="fixed inset-0 z-50 flex animate-fade flex-col overflow-y-auto bg-brand-deep px-5 pb-10 text-ivory sm:px-10 lg:hidden"
        >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between">
            <Wordmark onDark />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center gap-2 px-1 text-[0.9375rem] font-medium tracking-[0.2em]"
            >
              KAPAT
              <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobil menü" className="mt-auto">
            <ul className="flex flex-col gap-1">
              {[...NAV_LINKS, { href: "/satin-al", label: "Koleksiyon" }].map(
                ({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(href) ? "page" : undefined}
                      className="block py-1 font-display text-[clamp(2.25rem,10vw,3.5rem)] italic leading-[1.1] text-ivory hover:text-gold aria-[current=page]:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <p
            aria-hidden="true"
            className="mt-10 flex items-center text-[0.6875rem] tracking-[0.42em] text-brand-mute"
          >
            MADE WITH L
            <svg viewBox="0 0 24 22" className="mr-[0.42em] h-[0.8em] w-[0.9em] fill-current">
              <path d="M12 21.6 10.3 20C4.2 14.5 0 10.8 0 6.4 0 2.8 2.8 0 6.4 0c2 0 4 .9 5.6 2.4C13.6.9 15.6 0 17.6 0 21.2 0 24 2.8 24 6.4c0 4.4-4.2 8.1-10.3 13.6L12 21.6Z" />
            </svg>
            VE
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
