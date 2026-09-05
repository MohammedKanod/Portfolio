"use client";

import React, { useEffect } from "react";
import { Experiment } from "@/data/experiments";
import { X, FlaskConical, Terminal, Activity, ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ExperimentModalProps {
  experiment: Experiment | null;
  onClose: () => void;
}

export default function ExperimentModal({ experiment, onClose }: ExperimentModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (experiment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [experiment, onClose]);

  if (!experiment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto apple-glass rounded-3xl p-6 sm:p-10 lg:p-14 text-ink shadow-2xl space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full apple-glass text-ink-muted hover:text-ink transition-colors"
          data-cursor="hover"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Modal Header */}
        <div className="space-y-4 pb-6 border-b border-editorial">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-accent font-bold px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              {experiment.code}
            </span>
            <span className="text-ink-muted uppercase">[{experiment.category}]</span>
            {experiment.date && (
              <span className="text-ink-muted font-mono">// {experiment.date}</span>
            )}
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-canvas-muted/80 border border-editorial text-[10px] text-accent font-medium tracking-wide uppercase">
              {experiment.status}
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-ink">
            {experiment.title}
          </h2>

          {experiment.oneLiner && (
            <p className="font-serif italic text-lg sm:text-xl text-ink-secondary leading-relaxed">
              {experiment.oneLiner}
            </p>
          )}
        </div>

        {/* Core Laboratory Inquiries: Hypothesis & Findings */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 pb-6 border-b border-editorial">
          {/* Hypothesis */}
          {experiment.hypothesis && (
            <div className="space-y-2.5 p-5 rounded-2xl bg-canvas-muted/40 border border-editorial">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                <FlaskConical className="w-4 h-4" />
                <span>HYPOTHESIS & INQUIRY</span>
              </div>
              <p className="font-sans text-base sm:text-lg text-ink leading-relaxed font-light">
                {experiment.hypothesis}
              </p>
            </div>
          )}

          {/* Findings */}
          {experiment.findings && (
            <div className="space-y-2.5 p-5 rounded-2xl bg-canvas-muted/40 border border-editorial">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                <Activity className="w-4 h-4" />
                <span>EMPIRICAL FINDINGS & ARCHITECTURAL OUTCOME</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed font-normal">
                {experiment.findings}
              </p>
            </div>
          )}
        </div>

        {/* Telemetry Specs Grid */}
        {experiment.specs && Object.keys(experiment.specs).length > 0 && (
          <div className="pb-6 border-b border-editorial space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>TELEMETRY SPECIFICATIONS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(experiment.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3 rounded-xl bg-canvas-muted/30 border border-editorial space-y-1"
                >
                  <span className="font-mono text-[10px] text-ink-muted uppercase block tracking-wider">
                    {key}
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink block break-words">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies & Source/Demo Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          {experiment.technologies && experiment.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experiment.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-canvas-muted/60 border border-editorial font-mono text-[11px] text-ink"
                >
                  #{tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {experiment.github && (
              <a
                href={experiment.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-ink hover:text-accent uppercase transition-colors"
                data-cursor="hover"
              >
                <Github className="w-4 h-4" />
                <span>SOURCE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              </a>
            )}
            {experiment.demo && (
              <a
                href={experiment.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline uppercase transition-all"
                data-cursor="hover"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
