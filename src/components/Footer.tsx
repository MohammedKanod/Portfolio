"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-canvas border-t border-editorial text-ink py-16 px-6 sm:px-8 lg:px-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="font-sans font-bold uppercase tracking-tight text-ink text-sm sm:text-base">
            {siteConfig.name}
          </span>
          <span className="text-ink-muted block text-xs mt-0.5">
            Computer Science × Cybersecurity × Experimentation
          </span>
        </div>

        <div className="flex items-center gap-6 text-ink-muted">
          <span>© 2026</span>
          <button
            onClick={scrollToTop}
            className="text-ink hover:text-accent transition-colors inline-flex items-center gap-1.5 uppercase"
            data-cursor="hover"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
