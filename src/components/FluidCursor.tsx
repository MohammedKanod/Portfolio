"use client";

import React, { useEffect, useRef, useState } from "react";

export default function FluidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const orbPos = useRef({ x: -100, y: -100 });
  const orbVel = useRef({ vx: 0, vy: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[data-cursor]") ||
        target?.closest("[role='button']") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animId: number;

    const loop = () => {
      const ease = 0.18;
      const dx = mouse.current.x - orbPos.current.x;
      const dy = mouse.current.y - orbPos.current.y;

      orbVel.current.vx = dx * ease;
      orbVel.current.vy = dy * ease;

      orbPos.current.x += orbVel.current.vx;
      orbPos.current.y += orbVel.current.vy;

      // Calculate speed for fluid squash and stretch
      const speed = Math.hypot(orbVel.current.vx, orbVel.current.vy);
      const angle = Math.atan2(orbVel.current.vy, orbVel.current.vx);
      const stretch = Math.min(speed * 0.04, 0.35);

      // Dot: immediate precision
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      // Orb: fluid trailing inertia with squash & stretch
      if (orbRef.current) {
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.7;
        const rotation = (angle * 180) / Math.PI;

        orbRef.current.style.transform = `translate3d(${orbPos.current.x}px, ${orbPos.current.y}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision fluid core dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent transition-transform duration-100 ease-out ${
          isClicking ? "scale-75" : isHovered ? "scale-0" : "scale-100"
        }`}
      />

      {/* Fluid trailing magnetic orb with Apple glass styling */}
      <div
        ref={orbRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-200 ease-out ${
          isHovered
            ? "-ml-6 -mt-6 h-12 w-12 border border-accent/80 bg-accent/15 backdrop-blur-sm shadow-md"
            : isClicking
            ? "-ml-3.5 -mt-3.5 h-7 w-7 border-2 border-accent bg-accent/25"
            : "-ml-4 -mt-4 h-8 w-8 border border-ink/30 bg-ink/5 backdrop-blur-[1px]"
        }`}
      />
    </div>
  );
}
