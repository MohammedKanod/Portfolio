"use client";

import React from "react";
import content from "@/data/content.json";

interface CardSection {
  id: string;
  number: string;
  label: string;
}

export default function CardDeckNavigator({
  currentCard,
  onSelectCard,
}: {
  currentCard: number;
  onSelectCard: (index: number) => void;
}) {
  const hasPhysics = Boolean((content as any).physics);

  const sections: CardSection[] = [
    { id: "human", number: "01", label: "IDENTITY" },
    { id: "work", number: "02", label: "WORK" },
    { id: "experiments", number: "03", label: "LAB" },
    { id: "philosophy", number: "04", label: "THINKING" },
    { id: "cybersecurity", number: "05", label: "SECURITY" },
    ...(hasPhysics ? [{ id: "physics", number: "06", label: "PHYSICS" }] : []),
    { id: "about", number: hasPhysics ? "07" : "06", label: "JOURNEY" },
    { id: "currently", number: hasPhysics ? "08" : "07", label: "STATUS" },
    { id: "contact", number: hasPhysics ? "09" : "08", label: "CONNECT" },
  ];

  const isDarkCard = currentCard === 4;

  return (
    <aside
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2 font-mono text-[10px]"
      aria-label="Card navigation"
    >
      {sections.map((sec, idx) => {
        const isActive = currentCard === idx;

        return (
          <button
            key={sec.id}
            onClick={() => onSelectCard(idx)}
            className="group flex items-center gap-2 py-0.5 text-right transition-all"
            aria-label={`Jump to card ${sec.number}: ${sec.label}`}
          >
            <span
              className={`transition-all duration-200 uppercase tracking-wider ${
                isActive
                  ? isDarkCard
                    ? "text-white font-bold opacity-100 translate-x-0"
                    : "text-ink font-bold opacity-100 translate-x-0"
                  : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 text-ink-muted"
              }`}
            >
              {sec.label}
            </span>

            <span
              className={`flex items-center justify-center transition-all duration-200 rounded-full ${
                isActive
                  ? isDarkCard
                    ? "w-6 h-5 bg-white text-zinc-950 font-bold shadow-sm"
                    : "w-6 h-5 bg-ink text-canvas font-bold shadow-sm"
                  : isDarkCard
                  ? "w-5 h-4 text-zinc-500 hover:text-white border border-zinc-800"
                  : "w-5 h-4 text-ink-muted hover:text-ink apple-glass"
              }`}
            >
              {sec.number}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
