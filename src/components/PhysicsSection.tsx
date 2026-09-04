"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";

export default function PhysicsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physics = (content as any).physics;

  useEffect(() => {
    if (!physics) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    const centerX = width / 2;
    const centerY = height / 2;

    let angle1 = 0;
    let angle2 = Math.PI;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Center orbits
      ctx.strokeStyle = "rgba(13, 14, 17, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();

      angle1 += 0.015;
      angle2 += 0.009;

      const p1x = centerX + Math.cos(angle1) * 60;
      const p1y = centerY + Math.sin(angle1) * 60;

      const p2x = centerX + Math.cos(angle2) * 100;
      const p2y = centerY + Math.sin(angle2) * 100;

      // Connecting line
      ctx.strokeStyle = "rgba(29, 78, 216, 0.25)";
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();

      // Bodies
      ctx.fillStyle = "#0D0E11";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1D4ED8";
      ctx.beginPath();
      ctx.arc(p1x, p1y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#4A4D55";
      ctx.beginPath();
      ctx.arc(p2x, p2y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [physics]);

  if (!physics) return null;

  return (
    <section
      id="physics"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 bg-canvas relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        <SectionHeader
          number="06"
          label={physics.label}
          category={physics.category}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-4 sm:mb-6">
          <div className="lg:col-span-8">
            <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
              {physics.headlinePart1} <br className="hidden sm:inline" />
              {physics.headlinePart2} <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-accent">
                {physics.headlinePart3}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
              {physics.narrative}
            </p>
          </div>
        </div>

        {/* Minimal Orbital Trajectory Viewport */}
        <div className="flex-1 min-h-[160px] max-h-[220px] border border-editorial relative overflow-hidden bg-canvas flex flex-col my-auto">
          <div className="p-2.5 border-b border-editorial flex items-center justify-between font-mono text-[10px] text-ink-muted">
            <span>ORBITAL EQUILIBRIUM // GRAVITATIONAL DYNAMICS</span>
            <span>PERIODIC HARMONIC</span>
          </div>
          <div className="flex-1 relative w-full">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 06 // FIRST PRINCIPLES</span>
          <span>THERMODYNAMIC & WAVE MECHANICS</span>
        </div>
      </div>
    </section>
  );
}
