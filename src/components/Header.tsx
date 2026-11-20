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
    aria-label="Blue Perfumery ana sayfa"
    className="flex min-h-11 flex-col justify-center leading-none"
  >
    <span
      className={`font-display text-[1.75rem] font-medium tracking-[0.08em] ${onDark ? "text-gold" : "text-bordo"}`}
    >
      BLUE
    </span>
    <span className="mt-1 text-[0.625rem] font-medium tracking-[0.42em]">
      PERFUMERY
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
    const update = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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
      className={`fixed inset-x-0 top-0 z-50 h-[4.5rem] transition-colors duration-300 ease-pour ${
        transparent
          ? "bg-gradient-to-b from-bordo-deep/85 to-transparent text-ivory"
          : "border-b border-ink/10 bg-ivory text-ink"
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
                  className="py-3 text-[0.9375rem] tracking-wide underline-offset-[0.5em] decoration-gold hover:underline aria-[current=page]:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/satin-al"
            aria-current={isActive("/satin-al") ? "page" : undefined}
            className={transparent ? "btn-line-ivory" : "btn-bordo"}
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
          className="fixed inset-0 z-50 flex animate-fade flex-col overflow-y-auto bg-bordo-deep px-5 pb-10 text-ivory sm:px-10 lg:hidden"
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
          <p className="mt-10 text-[0.6875rem] tracking-[0.42em] text-bordo-mute">
            MADE WITH LOVE
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
