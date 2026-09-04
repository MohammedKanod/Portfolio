"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
}

export default function CybersecuritySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cybersecurity } = content;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    const labels = ["KERNEL", "GATEWAY", "SOCKET", "DAEMON", "ROUTER", "VMM"];
    const nodes: Node[] = labels.map((label) => ({
      x: 40 + Math.random() * (width - 80),
      y: 30 + Math.random() * (height - 60),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      label,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 20 || n1.x > width - 20) n1.vx *= -1;
        if (n1.y < 20 || n1.y > height - 20) n1.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.28;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "9px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="cybersecurity"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 bg-canvas-dark text-canvas border-b border-editorial-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="05"
          label={cybersecurity.label}
          category={cybersecurity.category}
          dark
        />

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-4 sm:mb-6">
          <div className="lg:col-span-8">
            <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-canvas">
              {cybersecurity.headlinePart1} <br className="hidden sm:inline" />
              {cybersecurity.headlinePart2} <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal apple-gradient-ice">
                {cybersecurity.headlinePart3}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {cybersecurity.narrative}
            </p>
          </div>
        </div>

        {/* Apple Dark Glassmorphism Topology Frame */}
        <div className="flex-1 min-h-[160px] max-h-[220px] apple-glass-dark rounded-3xl flex flex-col my-auto overflow-hidden">
          <div className="p-3 border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>SOCKET TOPOLOGY // TELEMETRY</span>
            </div>
            <span>STATUS: NOMINAL</span>
          </div>
          <div className="flex-1 relative w-full">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-3 border-t border-editorial-dark flex items-center justify-between font-mono text-[11px] text-zinc-500">
          <span>CARD 05 // LOW-LEVEL SYSTEMS</span>
          <span>KERNEL SPACE MONITORING</span>
        </div>
      </div>
    </section>
  );
}
