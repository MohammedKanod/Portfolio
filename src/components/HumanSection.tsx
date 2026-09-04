"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, Minus, Plus } from "lucide-react";

interface InterestItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  focus: string[];
}

const interests: InterestItem[] = [
  {
    id: "cybersecurity",
    number: "01",
    name: "CYBERSECURITY",
    tagline: "Adversarial systems & defensive fault tolerance",
    description: "I am drawn to systems when they are stressed under hostile conditions. Investigating binary mechanics, memory layout boundaries, reverse engineering protocols, and understanding how subtle configuration flaws collapse complex networks.",
    focus: ["Linux eBPF", "Packet Telemetry", "Memory Safety", "Reverse Engineering"],
  },
  {
    id: "physics",
    number: "02",
    name: "PHYSICS",
    tagline: "The original engineering foundation",
    description: "Computers are physical artifacts governed by thermodynamic and electromagnetic laws. Studying orbital mechanics, field theories, and entropy shapes how I conceptualize data propagation, state machines, and system limits.",
    focus: ["Gravitational Dynamics", "Wave Simulation", "Thermodynamics", "Signal DSP"],
  },
  {
    id: "ai",
    number: "03",
    name: "ARTIFICIAL INTELLIGENCE",
    tagline: "Autonomous cognitive architectures at the edge",
    description: "Not interested in repackaging commercial APIs. I build experiments with local edge inference, vector knowledge spaces, quantized speech pipelines, and deterministic narrative state machines.",
    focus: ["Local LLM Inference", "Quantization", "Acoustic VAD", "Vector Space Proximity"],
  },
  {
    id: "software",
    number: "04",
    name: "SOFTWARE ARCHITECTURE",
    tagline: "Clean, unencumbered first-principles code",
    description: "Writing code that treats hardware with respect. Avoiding bloated frameworks when a tight 100-line native loop solves the problem with microsecond latency and zero unexpected dependencies.",
    focus: ["Systems Programming", "TypeScript & Rust", "Zero-Copy Data", "Concurrency"],
  },
  {
    id: "business",
    number: "05",
    name: "BUSINESS & VENTURE",
    tagline: "Translating prototypes into real-world momentum",
    description: "An elegant technical experiment is hollow if nobody can use it. I care about commercial viability, unit economics, distribution channels, and turning weird technological prototypes into sustainable ventures.",
    focus: ["Product Strategy", "Distribution Velocity", "Unit Economics", "Market Arbitrage"],
  },
  {
    id: "experimentation",
    number: "06",
    name: "EXPERIMENTATION",
    tagline: "Rapid empirical probes over endless debate",
    description: "The fastest path to certainty is empirical collision with the physical world. I build disposable prototypes to test wild hypotheses before others finish their slides.",
    focus: ["Rapid Hardware Prototyping", "Ablation Studies", "Failure Analysis", "Novel Paradigms"],
  },
];

export default function HumanSection() {
  const [activeInterest, setActiveInterest] = useState<string>("cybersecurity");

  return (
    <section
      id="human"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-editorial bg-canvas relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="01" label="THE HUMAN" category="FOUNDATIONS & DRIVES" />

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <div className="lg:col-span-8">
            <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
              CURIOUS BY DEFAULT. <br />
              <span className="font-serif italic font-normal text-accent">
                OBSESSED WITH HOW THINGS WORK.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="font-mono text-xs text-ink-muted uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>THE OPERATING THESIS</span>
            </div>
            <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
              I have never been content just running an installer and clicking &lsquo;Accept&rsquo;. I need to know what happens in memory when an interrupt fires, how a radio wave scatters against a concrete wall, and why an algorithm behaves unpredictably under pressure.
            </p>
          </div>
        </div>

        {/* Narrative Manifesto Paragraph & Quote */}
        <div className="p-8 sm:p-12 border border-editorial bg-canvas-muted/40 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-[11px] text-accent font-semibold uppercase tracking-widest">
                PERSPECTIVE // NON-CONVENTIONAL
              </span>
              <p className="font-sans text-lg sm:text-xl text-ink leading-relaxed">
                Most education encourages students to memorize categories and regurgitate solved problems. My instinct has always been the inverse: take the machine apart, remove an essential component, and watch where the smoke comes out. That is where real learning begins.
              </p>
            </div>
            <div className="md:col-span-4 border-l-0 md:border-l md:border-editorial md:pl-8">
              <div className="font-mono text-xs text-ink-muted uppercase tracking-wider mb-2">
                CORE MANTRA
              </div>
              <p className="font-serif italic text-2xl text-ink leading-tight">
                &ldquo;I don&apos;t just learn technology. I build things with it.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Interest Matrix — Pure Typography, Lines, and Spacing (No Cards) */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-editorial font-mono text-xs text-ink-muted uppercase">
            <span>INDEX OF INQUIRY // 6 VECTORS</span>
            <span>SELECT TO INSPECT DETAILS</span>
          </div>

          <div className="divide-y divide-editorial">
            {interests.map((item) => {
              const isOpen = activeInterest === item.id;
              return (
                <div
                  key={item.id}
                  className={`group py-6 transition-all duration-300 ${
                    isOpen ? "bg-canvas-muted/30 px-4 sm:px-6" : "hover:px-2"
                  }`}
                >
                  <button
                    onClick={() => setActiveInterest(isOpen ? "" : item.id)}
                    className="w-full flex items-start sm:items-center justify-between text-left gap-4"
                    data-cursor="hover"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                      <span className="font-mono text-xs sm:text-sm text-accent font-semibold">
                        {item.number}
                      </span>
                      <span className="font-sans text-xl sm:text-3xl font-bold tracking-tight uppercase text-ink group-hover:text-accent transition-colors">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="hidden md:inline font-mono text-xs text-ink-muted">
                        {item.tagline}
                      </span>
                      <div className="p-1 border border-editorial rounded-none text-ink group-hover:border-accent group-hover:text-accent transition-colors">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Typography Details */}
                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-editorial/60 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
                      <div className="md:col-span-7">
                        <p className="font-sans text-base text-ink-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest block mb-2">
                            ACTIVE INVESTIGATION DOMAINS
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {item.focus.map((f) => (
                              <span
                                key={f}
                                className="px-2.5 py-1 bg-canvas border border-editorial font-mono text-xs text-ink"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
