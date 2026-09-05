"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/projects";
import { X, ArrowUpRight, Github, ExternalLink, Cpu } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto apple-glass rounded-3xl p-6 sm:p-12 lg:p-16 text-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full apple-glass text-ink-muted hover:text-ink transition-colors"
          data-cursor="hover"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Modal Header */}
        <div className="space-y-4 pb-8 border-b border-editorial">
          <div className="flex items-center gap-3 font-mono text-xs text-accent uppercase tracking-wider">
            <span>PROJECT // {project.number}</span>
            <span className="text-ink-muted">[{project.category}]</span>
            <span className="text-ink-muted">// {project.year}</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-ink">
            {project.title}
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-ink-secondary">
            {project.subtitle}
          </p>
        </div>

        {/* Overview & Description */}
        <div className="py-8 space-y-6 border-b border-editorial">
          <p className="font-sans text-lg sm:text-xl text-ink leading-relaxed font-light">
            {project.description}
          </p>

          {/* Metrics if present */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-mono text-[11px] text-ink-muted uppercase block">
                    {m.label}
                  </span>
                  <span className="font-sans text-xl sm:text-2xl font-bold text-ink">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlights / Technical Depth */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="py-8 space-y-4 border-b border-editorial">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              ARCHITECTURAL HIGHLIGHTS
            </h3>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-ink-secondary">
                  <span className="font-mono text-xs text-accent mt-1">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Takeaway */}
        {project.takeaway && (
          <div className="py-8 space-y-2 border-b border-editorial">
            <span className="font-mono text-[11px] text-accent uppercase tracking-wider block">
              EMPIRICAL TAKEAWAY
            </span>
            <blockquote className="font-serif italic text-lg sm:text-xl text-ink leading-relaxed">
              &ldquo;{project.takeaway}&rdquo;
            </blockquote>
          </div>
        )}

        {/* Tags & Action Links */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-canvas-muted/60 border border-editorial font-mono text-[11px] text-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-ink hover:text-accent uppercase transition-colors"
                data-cursor="hover"
              >
                <Github className="w-4 h-4" />
                <span>SOURCE</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-canvas hover:bg-accent font-mono text-xs uppercase transition-colors"
                data-cursor="hover"
              >
                <span>OPEN PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
