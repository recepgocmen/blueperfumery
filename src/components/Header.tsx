"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-stone-100/90 to-emerald-50/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center">
            <Link href="/" className="relative group">
              <div className="flex flex-col items-center">
                <div className="font-serif font-bold text-xl sm:text-2xl relative">
                  <span className="bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-800 bg-clip-text text-transparent tracking-widest drop-shadow-lg group-hover:from-purple-800 group-hover:via-indigo-600 group-hover:to-blue-800 transition-all duration-700 ease-in-out transform group-hover:scale-105">
                    BLUE
                  </span>
                </div>
                <div className="font-serif font-light text-lg sm:text-xl italic bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent -mt-1 relative">
                  Perfumery
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-blue-500/0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-all duration-700"></span>
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-1 transform scale-x-75 group-hover:scale-x-100 transition-all duration-500"></div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-0.5 transform scale-x-50 group-hover:scale-x-75 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Normal Links */}
            <div className="flex items-center space-x-3 mr-6">
              <Link
                href="/erkek-parfum"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                Erkek Parfüm
              </Link>
              <Link
                href="/kadin-parfum"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                Kadın Parfüm
              </Link>
              <Link
                href="/nis-parfum"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                Niş Parfüm
              </Link>
            </div>

            {/* Highlighted Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/parfumunu-bul"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">Parfümünü Bul</span>
                <span className="absolute inset-0 h-[200%] w-[200%] -translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
              </Link>

              <Link
                href="https://www.shopier.com/blueperfumery"
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  Satın Al
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 h-[200%] w-[200%] -translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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
          className={`md:hidden absolute left-0 right-0 top-full bg-gradient-to-r from-stone-100/95 to-emerald-50/95 backdrop-blur-md border-t border-white/20 shadow-lg transition-all duration-300 transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {/* Highlighted Mobile Buttons */}
            <Link
              href="/parfumunu-bul"
              className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Parfümünü Bul
            </Link>

            <Link
              href="https://www.shopier.com/blueperfumery"
              className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Satın Al
            </Link>

            {/* Regular Mobile Links */}
            <div className="pt-2 space-y-1">
              <Link
                href="/erkek-parfum"
                className="block text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Erkek Parfüm
              </Link>
              <Link
                href="/kadin-parfum"
                className="block text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Kadın Parfüm
              </Link>
              <Link
                href="/nis-parfum"
                className="block text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Niş Parfüm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
