"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { experiments } from "@/data/experiments";
import { FlaskConical } from "lucide-react";

export default function ExperimentsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "CYBERSECURITY",
    "PHYSICS & SIM",
    "AI & SPEECH",
    "STRANGE HARDWARE",
  ];

  const filteredExperiments =
    selectedCategory === "ALL"
      ? experiments
      : experiments.filter((e) => e.category === selectedCategory);

  return (
    <section
      id="experiments"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        <SectionHeader
          number="03"
          label="LABORATORY"
          category="EMPIRICAL PROTOCOLS"
        />

        {/* Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
            NOT EVERYTHING I BUILD <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-accent">
              IS SUPPOSED TO WORK.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed border-l border-editorial pl-3 font-light max-w-sm hidden md:block">
            &ldquo;Some ideas are prototypes. Some are experiments. Some fail spectacularly. That&apos;s part of the process.&rdquo;
          </p>
        </div>

        {/* Dynamic Content: Square Coming Soon if Empty, or Filterable Grid */}
        {experiments.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-lg aspect-auto sm:aspect-[2/1] border border-editorial p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-3 bg-canvas-muted/20">
              <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold tracking-widest uppercase">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>LAB BENCH // IDLE</span>
              </div>
              <h3 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink">
                COMING SOON.
              </h3>
              <p className="font-serif italic text-sm sm:text-base text-ink-secondary max-w-md">
                Empirical hardware telemetry, acoustic synthesis modules, and adversarial protocols will be indexed here.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-4 pb-3 border-b border-editorial font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`transition-colors uppercase tracking-wider text-[11px] ${
                    selectedCategory === cat
                      ? "text-ink font-bold underline underline-offset-4"
                      : "text-ink-muted hover:text-ink"
                  }`}
                  data-cursor="hover"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Experiment Squares / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-auto">
              {filteredExperiments.slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="aspect-[4/3] border border-editorial p-5 flex flex-col justify-between bg-canvas hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-accent font-bold">{exp.code}</span>
                    <span className="text-ink-muted">[{exp.category}]</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-sans text-lg font-bold uppercase tracking-tight text-ink">
                      {exp.title}
                    </h4>
                    <p className="font-sans text-xs text-ink-secondary line-clamp-2">
                      {exp.hypothesis}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-editorial flex items-center justify-between font-mono text-[10px] text-ink-muted">
                    <span>{exp.status}</span>
                    <span className="text-accent">TELEMETRY →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Minimal Bottom Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 03 // OPEN LABORATORY</span>
          <span>{experiments.length} EXPERIMENTS ACTIVE</span>
        </div>
      </div>
    </section>
  );
}
