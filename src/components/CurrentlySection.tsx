"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";
import { Activity, Radio, Cpu, ShieldCheck } from "lucide-react";

export default function CurrentlySection() {
  const { currently } = content;
  const items = currently.items || [];

  return (
    <section
      id="currently"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="07"
          label={currently.label}
          category={currently.category}
        />

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
            {currently.headline}
          </h2>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full apple-glass font-mono text-xs text-accent">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>REAL-TIME DISPATCH</span>
          </div>
        </div>

        {/* Apple-Style Widget Grid Structure */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-auto items-center">
          {items.map((item, idx) => (
            <div
              key={item.key || idx}
              className="apple-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-editorial">
                <span className="text-accent font-semibold px-2.5 py-0.5 rounded-full bg-accent/10">
                  [{item.key}]
                </span>
                <span className="text-ink-muted text-[10px] uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              <div className="py-4 space-y-2">
                <h3 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-accent" />
                  <span>ACTIVE TELEMETRY</span>
                </div>
                <span className="text-emerald-600 font-semibold">SYNCHRONIZED</span>
              </div>
            </div>
          ))}

          {/* If there is only 1 item, fill the second grid slot with a sleek Apple-style telemetry widget */}
          {items.length === 1 && (
            <div className="apple-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-editorial">
                <span className="text-ink-muted px-2.5 py-0.5 rounded-full bg-black/5">
                  [SYSTEM STATUS]
                </span>
                <span className="text-ink-muted text-[10px]">GLOBAL UPTIME</span>
              </div>

              <div className="py-4 space-y-2">
                <h3 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
                  LAB INFRASTRUCTURE
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
                  Low-latency nodes, kernel monitoring, and private model inference running in continuous integration.
                </p>
              </div>

              <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>INTEGRITY VERIFIED</span>
                </div>
                <span>NODE 01</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 07 // DISPATCH GRID</span>
          <span>APPLE WIDGET ARCHITECTURE</span>
        </div>
      </div>
    </section>
  );
}
