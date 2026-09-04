import React from "react";

interface SectionHeaderProps {
  number: string;
  label: string;
  category?: string;
  dark?: boolean;
}

export default function SectionHeader({
  number,
  label,
  category,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`w-full mb-10 sm:mb-14 ${dark ? "text-canvas" : "text-ink"}`}>
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          dark ? "border-editorial-dark" : "border-editorial"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm font-semibold text-accent tracking-wider">
            {number}
          </span>
          <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase font-medium">
            — {label}
          </span>
        </div>
        {category && (
          <span
            className={`font-mono text-[10px] sm:text-[11px] tracking-widest uppercase ${
              dark ? "text-ink-muted" : "text-ink-muted"
            }`}
          >
            [{category}]
          </span>
        )}
      </div>
    </div>
  );
}
