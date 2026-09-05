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
    <div className={`w-full mb-3 sm:mb-6 ${dark ? "text-white" : "text-ink"}`}>
      <div
        className={`flex items-center justify-between pb-2 sm:pb-3 border-b ${
          dark ? "border-white/10" : "border-editorial"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-xs sm:text-sm font-bold text-accent tracking-wider">
            {number}
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
            — {label}
          </span>
        </div>
        {category && (
          <span className="font-mono text-[9px] sm:text-[11px] tracking-widest uppercase text-ink-muted">
            [{category}]
          </span>
        )}
      </div>
    </div>
  );
}
