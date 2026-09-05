"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import { ChevronLeft, ChevronRight, Layers, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

interface MobileBottomDockProps {
  currentCard: number;
  totalCards: number;
  onSelectCard: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MobileBottomDock({
  currentCard,
  totalCards,
  onSelectCard,
  onNext,
  onPrev,
}: MobileBottomDockProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const hasPhysics = Boolean((content as any).physics);

  const sections = [
    { number: "01", label: "IDENTITY", desc: "CS & Cybersecurity" },
    { number: "02", label: "SELECTED WORK", desc: "Engineering & Architecture" },
    { number: "03", label: "LABORATORY", desc: "Empirical Protocols" },
    { number: "04", label: "PHILOSOPHY", desc: "Operating Principles" },
    { number: "05", label: "CYBERSECURITY", desc: "Adversarial Systems" },
    ...(hasPhysics ? [{ number: "06", label: "PHYSICS", desc: "Simulations" }] : []),
    { number: hasPhysics ? "07" : "06", label: "ABOUT", desc: "Beyond The Screen" },
    { number: hasPhysics ? "08" : "07", label: "STATUS", desc: "Active Vectors" },
    { number: hasPhysics ? "09" : "08", label: "CONTACT", desc: "Direct Channels" },
  ];

  const currentSection = sections[currentCard] || sections[0];

  return (
    <>
      {/* Pinned Bottom Glass Dock */}
      <div className="fixed bottom-3 left-0 w-full z-40 px-3 md:hidden flex justify-center pointer-events-none">
        <div className="pointer-events-auto max-w-sm w-full apple-glass rounded-full px-3 py-2 flex items-center justify-between shadow-2xl backdrop-blur-2xl border border-white/20 gap-2">
          {/* Prev Button */}
          <button
            onClick={onPrev}
            disabled={currentCard === 0}
            aria-label="Previous section"
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-black/5 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Center Card Title Pill (Opens Drawer) */}
          <button
            onClick={() => setIsSheetOpen(true)}
            aria-label="Open chapter navigation"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 hover:bg-accent/15 transition-all text-ink min-w-0"
          >
            <span className="font-mono text-xs font-bold text-accent shrink-0">
              {currentSection.number}
            </span>
            <span className="font-sans font-bold text-[11px] uppercase tracking-wide truncate">
              {currentSection.label}
            </span>
            <span className="font-mono text-[9px] text-ink-muted shrink-0">
              /{totalCards.toString().padStart(2, "0")}
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentCard === totalCards - 1}
            aria-label="Next section"
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-black/5 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <div className="shrink-0 border-l border-editorial pl-1.5">
            <ThemeSwitcher compact dropUp />
          </div>
        </div>
      </div>

      {/* Slide-up Chapter Sheet */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          {/* Backdrop dismiss */}
          <div
            className="flex-1"
            onClick={() => setIsSheetOpen(false)}
          />

          {/* Sheet Surface */}
          <div className="apple-glass rounded-t-3xl p-5 border-t border-white/20 shadow-2xl max-h-[80vh] flex flex-col">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-editorial mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-ink">
                  CHAPTER DIRECTORY
                </span>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapters List */}
            <div className="overflow-y-auto space-y-1.5 py-1 pr-1">
              {sections.map((sec, idx) => {
                const isActive = currentCard === idx;
                return (
                  <button
                    key={sec.number}
                    onClick={() => {
                      onSelectCard(idx);
                      setIsSheetOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md font-bold"
                        : "apple-glass hover:bg-black/5 text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-accent/10 text-accent font-bold"
                        }`}
                      >
                        {sec.number}
                      </span>
                      <div>
                        <div className="font-sans text-xs uppercase tracking-wide">
                          {sec.label}
                        </div>
                        <div
                          className={`text-[10px] font-mono ${
                            isActive ? "text-white/80" : "text-ink-muted"
                          }`}
                        >
                          {sec.desc}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs ${
                        isActive ? "text-white" : "text-ink-muted"
                      }`}
                    >
                      {isActive ? "● ACTIVE" : "→"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
