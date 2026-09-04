"use client";

import React, { useEffect, useState, useRef } from "react";

export type CursorMode = "default" | "hover" | "view" | "inspect" | "copy" | "drag" | "link";

export default function CustomCursor() {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device is touch or coarse pointer
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute("data-cursor") as CursorMode;
        const text = cursorTarget.getAttribute("data-cursor-text") || "";
        setCursorMode(mode || "hover");
        setCursorText(text);
      } else if (target.closest("button, a, input, textarea, [role='button']")) {
        setCursorMode("hover");
        setCursorText("");
      } else {
        setCursorMode("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth RAF loop for cursor ring lag
    let animationFrameId: number;
    const render = () => {
      // Ring follows mouse with smooth interpolation
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch) return null;

  const isView = cursorMode === "view";
  const isInspect = cursorMode === "inspect";
  const isCopy = cursorMode === "copy";
  const isSpecial = isView || isInspect || isCopy;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent transition-transform duration-150 ease-out ${
          isSpecial ? "scale-0" : "scale-100"
        }`}
      />

      {/* Responsive interactive ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          isView
            ? "-ml-8 -mt-8 h-16 w-16 border border-accent bg-accent/90 text-white shadow-lg"
            : isInspect
            ? "-ml-7 -mt-7 h-14 w-14 border border-ink bg-ink/90 text-white"
            : isCopy
            ? "-ml-6 -mt-6 h-12 w-12 border border-accent bg-accent text-white"
            : cursorMode === "hover"
            ? "-ml-4 -mt-4 h-8 w-8 border border-accent/60 bg-accent/5"
            : "-ml-3 -mt-3 h-6 w-6 border border-ink/20"
        }`}
      >
        {isSpecial && (
          <span className="font-mono text-[9px] tracking-widest uppercase font-semibold text-center px-1">
            {cursorText || (isView ? "VIEW →" : isInspect ? "PROBE" : "COPY")}
          </span>
        )}
      </div>
    </div>
  );
}
