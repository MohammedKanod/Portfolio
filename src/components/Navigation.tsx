"use client";

import React, { useEffect, useState } from "react";
import content from "@/data/content.json";

import ThemeSwitcher from "./ThemeSwitcher";

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

  return (
    <header
      className="fixed top-0 left-0 w-full z-40 transition-colors duration-300 py-2.5 sm:py-4 px-3 sm:px-8 lg:px-12 flex justify-center pointer-events-none"
    >
      <div
        className="max-w-7xl w-full px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center justify-between transition-all duration-300 apple-glass text-ink shadow-sm pointer-events-auto"
      >
        {/* Brand / Logo */}
        <a
          href="#human"
          onClick={handleCardClick(0)}
          className="group flex items-center gap-2 sm:gap-2.5 font-sans font-bold tracking-tight text-xs sm:text-sm uppercase"
        >
          <img
            src="/icon-192.png"
            alt="Mohammed Kanod Logo"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-110 ring-1 ring-accent/30 shrink-0"
          />
          <span className="truncate max-w-[150px] sm:max-w-none">{site.name}</span>
          <span className="hidden sm:inline-block font-mono text-[10px] font-normal tracking-widest text-ink-muted">
            // 2026
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={handleCardClick(1)}
            className={`transition-colors ${
              currentCard === 1
                ? "font-bold text-accent"
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
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            LAB
          </button>
          <button
            onClick={handleCardClick(3)}
            className={`transition-colors ${
              currentCard === 3
                ? "font-bold text-accent"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            THINKING
          </button>
          <button
            onClick={handleCardClick(4)}
            className={`transition-colors ${
              currentCard === 4
                ? "font-bold text-accent"
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

          {/* Desktop Theme Switcher */}
          <div className="border-l border-editorial pl-3">
            <ThemeSwitcher />
          </div>

          {/* Minimal Time stamp */}
          {time && (
            <span className="hidden lg:inline-block text-[10px] border-l border-editorial pl-3 text-ink-muted">
              {time} UTC
            </span>
          )}
        </nav>

        {/* Mobile Header Right (Theme Switcher only, navigation is in Bottom Dock) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher compact />
        </div>
      </div>
    </header>
  );
}
