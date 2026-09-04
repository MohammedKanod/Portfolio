"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";

export default function AboutSection() {
  const { about } = content;

  return (
    <section
      id="about"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="06"
          label={about.label}
          category={about.category}
        />

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-4 sm:mb-6">
          <div className="lg:col-span-8">
            <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
              {about.headlinePart1} <br />
              <span className="font-serif italic font-normal apple-gradient-text">
                {about.headlinePart2}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
              {about.narrativeLead}
            </p>
          </div>
        </div>

        {/* Narrative Split with Glass Pill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-6 border-t border-editorial items-start my-auto">
          <div className="lg:col-span-7 space-y-3 apple-glass rounded-3xl p-6 sm:p-8">
            <p className="font-sans text-sm sm:text-base text-ink leading-relaxed font-normal">
              {about.narrativeBody1}
            </p>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
              {about.narrativeBody2}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3 font-mono text-xs text-ink-secondary">
            <div className="apple-glass rounded-2xl p-4 flex justify-between items-center">
              <span className="text-ink-muted">ACADEMICS</span>
              <span className="text-ink font-semibold">{about.academics}</span>
            </div>
            <div className="apple-glass rounded-2xl p-4 flex justify-between items-center">
              <span className="text-ink-muted">PRIMARY FOCUS</span>
              <span className="text-ink font-semibold">{about.focus}</span>
            </div>
            <div className="apple-glass rounded-2xl p-4 flex justify-between items-center">
              <span className="text-ink-muted">MINDSET</span>
              <span className="text-accent font-semibold">{about.mindset}</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 06 // THE UNFINISHED HUMAN</span>
          <span>AUTONOMOUS EXPLORATION</span>
        </div>
      </div>
    </section>
  );
}
