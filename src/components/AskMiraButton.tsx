"use client";

import type { ReactNode } from "react";
import { askMira } from "@/lib/catalog";

type Props = {
  question: string;
  className?: string;
  children: ReactNode;
};

const AskMiraButton = ({ question, className, children }: Props) => (
  <button type="button" onClick={() => askMira(question)} className={className}>
    {children}
  </button>
);

export default AskMiraButton;
