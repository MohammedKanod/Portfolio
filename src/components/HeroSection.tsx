"use client";

import React, { useEffect, useRef } from "react";
import content from "@/data/content.json";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export default function HeroSection({ onNext }: { onNext?: () => void }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { hero, site } = content;
  const photoUrl = (hero as any).photo || "/logo.png";

  useEffect(() => {
    if (!headlineRef.current) return;

    const lines = headlineRef.current.querySelectorAll(".headline-line");
    gsap.fromTo(
      lines.length > 0 ? lines : headlineRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }
    );

    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section
      id="human"
      className="min-h-full w-full flex flex-col justify-between pt-16 sm:pt-20 pb-24 sm:pb-8 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Minimal Meta Label */}
        <div className="flex items-center gap-3 font-mono text-xs text-ink-muted uppercase tracking-widest pt-1">
          <span className="text-accent font-bold px-2 py-0.5 rounded-full bg-accent/10">[01]</span>
          <span>{hero.label}</span>
        </div>

        {/* ─── DESKTOP VIEW (Large screens) ─── */}
        <div className="hidden lg:grid my-auto py-2 grid-cols-12 gap-12 items-center">
          {/* Left Headline */}
          <div className="col-span-8">
            <h1
              ref={headlineRef}
              className="display-title font-sans font-bold tracking-tightest uppercase text-ink select-none"
            >
              <span className="sr-only">
                Mohammed Kanod — Cybersecurity Student, Systems Architect &amp; Builder Portfolio
              </span>
              <span className="headline-line block overflow-hidden">
                {hero.headlinePart1}
              </span>
              <span className="headline-line block overflow-hidden font-serif italic font-normal apple-gradient-text">
                {hero.headlinePart2}
              </span>
              <span className="headline-line block overflow-hidden">
                {hero.headlinePart3}
              </span>
            </h1>
          </div>

          {/* Right Photo Frame */}
          <div className="col-span-4 flex justify-end">
            <div
              ref={photoRef}
              className="group apple-glass rounded-full p-2.5 shadow-2xl relative w-60 h-60 lg:w-64 lg:h-64 aspect-square transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-canvas-muted/40">
                <img
                  src={photoUrl}
                  alt={`${site.name} — Computer Science & Cybersecurity Student, Systems Builder`}
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase font-semibold">
                    {site.name}
                  </span>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full apple-glass shadow-md flex items-center gap-1.5 font-mono text-[10px] text-ink z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold uppercase">BUILDER</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE VIEW (Smartphones & compact screens) ─── */}
        <div className="flex lg:hidden flex-col items-center text-center my-auto py-4 space-y-4">
          {/* Logo Avatar with Glowing Halo */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 apple-glass shadow-2xl mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src={photoUrl}
                alt={site.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1.5 right-1 px-2.5 py-0.5 rounded-full apple-glass shadow-sm text-[9px] font-mono text-ink flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">BUILDER</span>
            </div>
          </div>

          {/* Confident Headline */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink uppercase leading-tight">
              <span>{hero.headlinePart1} </span>
              <span className="font-serif italic font-normal apple-gradient-text block sm:inline">
                {hero.headlinePart2}
              </span>{" "}
              <span>{hero.headlinePart3}</span>
            </h1>
          </div>

          {/* Rich Narrative */}
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-normal max-w-md px-2">
            {hero.narrativeLead}
          </p>

          {/* Action Button */}
          <div className="pt-1">
            <button
              onClick={onNext}
              className="apple-glass px-5 py-2 rounded-full inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent shadow-sm active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Desktop Narrative Split */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-end pt-4 border-t border-editorial">
          <div className="col-span-7">
            <p className="font-sans text-lg lg:text-xl text-ink leading-snug font-normal">
              {hero.narrativeLead}
            </p>
          </div>

          <div className="col-span-5 flex flex-col justify-between gap-3">
            <p className="font-sans text-xs text-ink-secondary leading-relaxed font-light">
              {hero.narrativeSub}
            </p>

            <div>
              <button
                onClick={onNext}
                className="apple-glass px-4 py-1.5 rounded-full inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-all hover:scale-105"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Bottom Status Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-ink-muted">
          <span>{hero.status}</span>
          <span className="hidden sm:inline">SCROLL OR USE ARROW KEYS TO ADVANCE ↓</span>
          <span className="sm:hidden">SWIPE TO NAVIGATE ↓</span>
        </div>
      </div>
    </section>
  );
}
