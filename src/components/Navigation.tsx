"use client";

import React, { useEffect, useState } from "react";
import content from "@/data/content.json";

interface NavigationProps {
  currentCard?: number;
  onSelectCard?: (index: number) => void;
}

export default function Navigation({ currentCard = 0, onSelectCard }: NavigationProps) {
  const [time, setTime] = useState<string>("");
  const { site } = content;
  const hasPhysics = Boolean((content as any).physics);

  const contactIndex = hasPhysics ? 8 : 7;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (cardIndex: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectCard) {
      onSelectCard(cardIndex);
    }
  };

  const isDarkCard = currentCard === 4; // Card 05: Cybersecurity is dark

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 py-3.5 sm:py-4 px-6 sm:px-8 lg:px-12 flex justify-center`}
    >
      <div
        className={`max-w-7xl w-full px-5 py-2.5 rounded-full flex items-center justify-between transition-all duration-300 ${
          isDarkCard
            ? "apple-glass-dark text-canvas shadow-xl"
            : "apple-glass text-ink shadow-sm"
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#human"
          onClick={handleCardClick(0)}
          className="group flex items-center gap-2.5 font-sans font-bold tracking-tight text-xs sm:text-sm uppercase"
        >
          <img
            src="/icon-192.png"
            alt="Mohammed Kanod Logo"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-110 ring-1 ring-accent/30 shrink-0"
          />
          <span>{site.name}</span>
          <span
            className={`hidden sm:inline-block font-mono text-[10px] font-normal tracking-widest ${
              isDarkCard ? "text-zinc-500" : "text-ink-muted"
            }`}
          >
            // 2026
          </span>
        </a>

        {/* Minimal Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-7 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={handleCardClick(1)}
            className={`transition-colors ${
              currentCard === 1
                ? "font-bold text-accent"
                : isDarkCard
                ? "text-zinc-400 hover:text-white"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            WORK
          </button>
          <button
            onClick={handleCardClick(2)}
            className={`transition-colors ${
              currentCard === 2
                ? "font-bold text-accent"
                : isDarkCard
                ? "text-zinc-400 hover:text-white"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            LAB
          </button>
          <button
            onClick={handleCardClick(3)}
            className={`transition-colors hidden sm:inline-block ${
              currentCard === 3
                ? "font-bold text-accent"
                : isDarkCard
                ? "text-zinc-400 hover:text-white"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            THINKING
          </button>
          <button
            onClick={handleCardClick(4)}
            className={`transition-colors hidden md:inline-block ${
              currentCard === 4
                ? "font-bold text-accent-ice"
                : isDarkCard
                ? "text-zinc-400 hover:text-white"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            SECURITY
          </button>
          <button
            onClick={handleCardClick(contactIndex)}
            className={`font-semibold transition-colors px-3 py-1 rounded-full ${
              currentCard === contactIndex
                ? "bg-accent text-white"
                : "hover:text-accent"
            }`}
          >
            CONNECT →
          </button>

          {/* Minimal Time stamp */}
          {time && (
            <span
              className={`hidden lg:inline-block text-[10px] border-l pl-5 ${
                isDarkCard
                  ? "border-zinc-800 text-zinc-500"
                  : "border-editorial text-ink-muted"
              }`}
            >
              {time} UTC
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
