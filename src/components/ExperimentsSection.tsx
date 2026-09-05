"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import ExperimentModal from "./ExperimentModal";
import { experiments, Experiment } from "@/data/experiments";
import { FlaskConical, ArrowUpRight } from "lucide-react";

export default function ExperimentsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  // Dynamically include categories present in experiments data alongside preset defaults
  const dynamicCategories = Array.from(
    new Set(experiments.map((e) => e.category.trim().toUpperCase()).filter(Boolean))
  );
  const defaultCategories = [
    "ALL",
    "CYBERSECURITY",
    "PHYSICS & SIM",
    "AI & SPEECH",
    "STRANGE HARDWARE",
  ];
  const categories = [
    "ALL",
    ...defaultCategories.filter((c) => c !== "ALL"),
    ...dynamicCategories.filter((c) => !defaultCategories.includes(c)),
  ];

  const filteredExperiments =
    selectedCategory === "ALL"
      ? experiments
      : experiments.filter((e) => {
          const cat = e.category.trim().toUpperCase();
          if (cat === selectedCategory) return true;
          if (
            selectedCategory === "AI & SPEECH" &&
            (cat.includes("AI") || cat.includes("SPEECH") || cat.includes("INTELLIGENCE"))
          ) {
            return true;
          }
          if (
            selectedCategory === "CYBERSECURITY" &&
            (cat.includes("SECURITY") || cat.includes("CYBER"))
          ) {
            return true;
          }
          return false;
        });

  return (
    <section
      id="experiments"
      className="min-h-full w-full flex flex-col justify-between pt-16 sm:pt-20 pb-24 sm:pb-8 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="03"
          label="LABORATORY"
          category="EMPIRICAL PROTOCOLS"
        />

        {/* Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
            NOT EVERYTHING I BUILD <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-accent">
              IS SUPPOSED TO WORK.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed border-l border-editorial pl-3 font-light max-w-sm hidden sm:block">
            &ldquo;Some ideas are prototypes. Some are experiments. Some fail spectacularly. That&apos;s part of the process.&rdquo;
          </p>
        </div>

        {/* Dynamic Content: Coming Soon if Empty, or Filterable Grid */}
        {experiments.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 my-auto">
            <div className="w-full max-w-lg aspect-auto sm:aspect-[2/1] apple-glass rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <FlaskConical className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-accent font-semibold tracking-widest uppercase block">
                  LAB BENCH // IDLE
                </span>
                <h3 className="font-sans text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink">
                  COMING SOON.
                </h3>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-ink-secondary max-w-md leading-relaxed">
                Empirical hardware telemetry, acoustic synthesis modules, and adversarial protocols will be indexed here.
              </p>
              <div className="pt-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-[10px] text-accent font-medium">
                  BENCH STATUS: CALIBRATING
                </span>
              </div>
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
              {filteredExperiments.slice(0, 6).map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperiment(exp)}
                  data-cursor="hover"
                  className="group relative aspect-auto sm:aspect-[4/3] apple-glass rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-editorial hover:border-accent/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* Default Card Face */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-accent font-bold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                      {exp.code}
                    </span>
                    <span className="text-ink-muted uppercase text-[11px] truncate max-w-[160px]">
                      [{exp.category}]
                    </span>
                  </div>

                  <div className="space-y-1.5 my-2">
                    <h4 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                      {exp.title}
                    </h4>
                    <p className="font-sans text-xs text-ink-secondary line-clamp-2 leading-relaxed font-light">
                      {exp.oneLiner || exp.hypothesis}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
                    <span className="truncate max-w-[140px] text-accent font-medium">
                      {exp.status}
                    </span>
                    <div className="flex items-center gap-1 text-ink group-hover:text-accent transition-colors font-medium">
                      <span>EXPAND</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Frosted Hover Reveal Overlay */}
                  <div className="absolute inset-0 p-6 bg-zinc-950/90 text-white backdrop-blur-xl flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto rounded-3xl">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs text-blue-300">
                        <span className="font-bold">{exp.code}</span>
                        <span>{exp.date || "LAB"}</span>
                      </div>
                      <h4 className="font-sans text-xl font-bold uppercase tracking-tight text-white">
                        {exp.title}
                      </h4>
                      <p className="font-sans text-xs text-zinc-300 line-clamp-3 leading-relaxed font-light">
                        {exp.hypothesis || exp.oneLiner}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-[10px] text-zinc-300"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 border-t border-white/15 flex items-center justify-between font-mono text-xs text-blue-300 font-semibold">
                        <span>OPEN TELEMETRY DOSSIER</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
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

      {/* Experiment Modal Deep-Dive Container */}
      <ExperimentModal
        experiment={selectedExperiment}
        onClose={() => setSelectedExperiment(null)}
      />
    </section>
  );
}

