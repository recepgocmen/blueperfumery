"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-blue-600 font-bold text-lg sm:text-xl"
              >
                Blue Perfumery
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/parfumunu-bul"
                className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm whitespace-nowrap"
              >
                Parfümünü Bul
              </Link>
              <Link
                href="https://www.shopier.com/blueperfumery"
                className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap"
              >
                Satın Al
              </Link>
              <Link
                href="/hakkimizda"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              >
                Hakkımızda
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
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
            className={`md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-lg transition-all duration-300 transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                href="/parfumunu-bul"
                className="block text-blue-600 font-medium px-3 py-2 rounded-md text-sm hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Parfümünü Bul
              </Link>
              <Link
                href="https://www.shopier.com/blueperfumery"
                className="block text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg px-4 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Satın Al
              </Link>
              <Link
                href="/hakkimizda"
                className="block text-gray-600 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
