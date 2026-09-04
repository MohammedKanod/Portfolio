"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";

export default function PhilosophySection() {
  const { philosophy } = content;

  return (
    <section
      id="philosophy"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="04"
          label="MANIFESTO"
          category="OPERATING PRINCIPLES"
        />

        {/* Large Typographic Loop Statement */}
        <div className="mb-4 sm:mb-6">
          <span className="font-mono text-xs text-accent font-semibold uppercase tracking-widest block mb-1">
            {philosophy.eyebrow}
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tightest uppercase text-ink leading-tight">
            {philosophy.loopHeadline}
          </h2>
        </div>

        {/* The 4 Principles — Apple Glass Squircle 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-editorial my-auto">
          {philosophy.principles.map((principle) => (
            <div
              key={principle.number}
              className="apple-glass rounded-3xl p-5 sm:p-6 space-y-1.5 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-accent font-bold">
                <span className="px-2 py-0.5 rounded-full bg-accent/10">[{principle.number}]</span>
                <span className="text-ink font-sans uppercase font-bold tracking-tight text-sm sm:text-base">
                  {principle.statement}
                </span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-ink font-normal">
                &ldquo;{principle.tagline}&rdquo;
              </p>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 04 // EPISTEMOLOGY</span>
          <span>4 OPERATING PRINCIPLES</span>
        </div>
      </div>
    </section>
  );
}
