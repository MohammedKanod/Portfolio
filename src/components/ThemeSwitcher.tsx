"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, THEMES, Theme } from "@/context/ThemeContext";
import { Palette, Check } from "lucide-react";

export default function ThemeSwitcher({
  compact = false,
  dropUp = false,
}: {
  compact?: boolean;
  dropUp?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentMeta = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select website theme mode"
        className={`apple-glass rounded-full flex items-center gap-2 transition-all hover:scale-105 ${
          compact
            ? "px-2.5 py-1 text-xs"
            : "px-3 py-1.5 text-xs font-mono tracking-wider"
        }`}
      >
        <span className="text-sm">{currentMeta.icon}</span>
        {!compact && (
          <span className="font-medium uppercase text-ink hidden sm:inline-block text-[11px]">
            {currentMeta.name.split(" ")[0]}
          </span>
        )}
        <span
          className="w-2 h-2 rounded-full ring-1 ring-black/20"
          style={{ backgroundColor: currentMeta.dotColor }}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 z-50 min-w-[190px] apple-glass p-2 rounded-2xl shadow-2xl backdrop-blur-2xl border border-white/20 animate-fadeIn ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="px-2 py-1 mb-1 border-b border-editorial flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-ink-muted">
            <span>APPEARANCE</span>
            <Palette className="w-3 h-3 text-accent" />
          </div>

          <div className="space-y-1">
            {THEMES.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs font-sans transition-all text-left ${
                    isActive
                      ? "bg-accent/15 text-accent font-semibold shadow-xs"
                      : "text-ink hover:bg-black/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{t.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs leading-none">
                        {t.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: t.dotColor }}
                    />
                    {isActive && <Check className="w-3.5 h-3.5 text-accent" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
