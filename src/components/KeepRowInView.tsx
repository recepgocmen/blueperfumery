"use client";

import { useEffect } from "react";

// Opening one <details name> row closes the one above it; without this the page
// collapses under the visitor and the row they chose jumps out of view.
const KeepRowInView = ({ target }: { target: string }) => {
  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const summary = (event.target as Element).closest("summary");
      if (!summary) return;
      const before = summary.getBoundingClientRect().top;
      requestAnimationFrame(() => {
        const shift = summary.getBoundingClientRect().top - before;
        if (shift) window.scrollBy({ top: shift, behavior: "instant" });
      });
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [target]);

  return null;
};

export default KeepRowInView;
