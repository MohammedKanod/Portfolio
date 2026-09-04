"use client";

import React, { useEffect, useRef } from "react";
import content from "@/data/content.json";
import { ArrowDown, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function HeroSection({ onNext }: { onNext?: () => void }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { hero, site } = content;
  const photoUrl = (hero as any).photo || "/profile.jpg";

  useEffect(() => {
    if (!headlineRef.current) return;

    gsap.fromTo(
      headlineRef.current.children,
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
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Minimal Meta Label */}
        <div className="flex items-center gap-3 font-mono text-xs text-ink-muted uppercase tracking-widest pt-1">
          <span className="text-accent font-bold px-2 py-0.5 rounded-full bg-accent/10">[01]</span>
          <span>{hero.label}</span>
        </div>

        {/* Center Stage: Hero Typography + Apple Frosted Glass Photo Frame */}
        <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left / Center: Headline */}
          <div className="lg:col-span-8">
            <h1
              ref={headlineRef}
              className="display-title font-sans font-bold tracking-tightest uppercase text-ink select-none"
            >
              <span className="block overflow-hidden">
                {hero.headlinePart1}
              </span>
              <span className="block overflow-hidden font-serif italic font-normal apple-gradient-text">
                {hero.headlinePart2}
              </span>
              <span className="block overflow-hidden">
                {hero.headlinePart3}
              </span>
            </h1>
          </div>

          {/* Right: Apple Glass Photo Frame */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div
              ref={photoRef}
              className="group apple-glass rounded-3xl p-2 sm:p-2.5 shadow-2xl relative w-36 h-48 sm:w-48 sm:h-64 lg:w-56 lg:h-72 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-canvas-muted/40">
                <img
                  src={photoUrl}
                  alt={site.name}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase font-semibold">
                    {site.name}
                  </span>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className="absolute -bottom-2.5 -right-2 sm:bottom-3 sm:right-3 px-2.5 py-1 rounded-full apple-glass shadow-md flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold uppercase">BUILDER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Two-Column Editorial Narrative with Glass Pill CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-end pt-4 border-t border-editorial">
          <div className="lg:col-span-7">
            <p className="font-sans text-sm sm:text-lg lg:text-xl text-ink leading-snug font-normal">
              {hero.narrativeLead}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <p className="font-sans text-xs text-ink-secondary leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
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
          <span>SCROLL OR USE ARROW KEYS TO ADVANCE ↓</span>
        </div>
      </div>
    </section>
  );
}
