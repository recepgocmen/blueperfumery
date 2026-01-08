"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex flex-col items-start">
              <span
                className={`font-heading text-2xl font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  isScrolled ? "text-navy" : "text-white"
                }`}
              >
                BLUE
              </span>
              <span
                className={`font-heading text-sm font-light tracking-[0.15em] -mt-1 transition-colors duration-300 ${
                  isScrolled ? "text-gold" : "text-gold-light"
                }`}
              >
                PERFUMERY
              </span>
              <div
                className={`h-[1px] w-0 group-hover:w-full transition-all duration-500 mt-1 ${
                  isScrolled ? "bg-gold" : "bg-gold-light"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/erkek-parfum"
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold relative group ${
                isScrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              Erkek
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/kadin-parfum"
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold relative group ${
                isScrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              Kadın
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/nis-parfum"
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold relative group ${
                isScrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              Niş Koleksiyon
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
            
            <div className="w-[1px] h-5 bg-gray-300/50 mx-2" />

            <Link
              href="/parfumunu-bul"
              className={`text-sm font-medium tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-navy text-white hover:bg-navy-light"
                  : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
              }`}
            >
              Parfümünü Bul
            </Link>

            <Link
              href="/satin-al"
              className="text-sm font-medium tracking-wide px-5 py-2.5 rounded-full bg-gold text-navy hover:bg-gold-light transition-all duration-300 btn-luxury"
            >
              Satın Al
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? "text-navy hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full bg-white shadow-xl transition-all duration-300 transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 space-y-1">
            <Link
              href="/erkek-parfum"
              className="block text-gray-700 hover:text-gold px-4 py-3 text-sm font-medium tracking-wide border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Erkek Parfümleri
            </Link>
            <Link
              href="/kadin-parfum"
              className="block text-gray-700 hover:text-gold px-4 py-3 text-sm font-medium tracking-wide border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Kadın Parfümleri
            </Link>
            <Link
              href="/nis-parfum"
              className="block text-gray-700 hover:text-gold px-4 py-3 text-sm font-medium tracking-wide border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Niş Koleksiyon
            </Link>

            <div className="pt-4 space-y-3">
              <Link
                href="/parfumunu-bul"
                className="block bg-navy text-white px-4 py-3 rounded-lg text-sm font-medium tracking-wide text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Parfümünü Bul
              </Link>
              <Link
                href="/satin-al"
                className="block bg-gold text-navy px-4 py-3 rounded-lg text-sm font-medium tracking-wide text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Satın Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
