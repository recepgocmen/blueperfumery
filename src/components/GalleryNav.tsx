"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

const GalleryNav = ({ target }: { target: string }) => {
  const scroll = (direction: 1 | -1) => {
    const list = document.getElementById(target);
    list?.scrollBy({ left: direction * list.clientWidth * 0.8 });
  };

  return (
    <div className="hidden gap-2 lg:flex">
      {([-1, 1] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          onClick={() => scroll(direction)}
          aria-controls={target}
          aria-label={direction < 0 ? "Önceki aileler" : "Sonraki aileler"}
          className="inline-flex size-12 items-center justify-center border border-ivory/50 text-ivory transition-colors duration-200 hover:border-gold hover:text-gold"
        >
          {direction < 0 ? (
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
          ) : (
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
          )}
        </button>
      ))}
    </div>
  );
};

export default GalleryNav;
