"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";
import { projects, Project } from "@/data/projects";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";

export default function SelectedWorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="min-h-full w-full flex flex-col justify-between pt-16 sm:pt-20 pb-24 sm:pb-8 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="INDEX"
          category="SELECTED WORK"
        />

        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="section-headline font-sans font-bold tracking-tightest uppercase text-ink">
            ENGINEERING & <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal apple-gradient-text">
              SYSTEMS ARCHITECTURE.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-ink-secondary max-w-sm leading-relaxed font-light hidden sm:block">
            Curated prototypes, ambient intelligence, and defensive software. Tap or hover over any tile for technical details.
          </p>
        </div>

        {/* Dynamic Square Grid Content */}
        {projects.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 my-auto">
            <div className="w-full max-w-md aspect-auto sm:aspect-square py-8 sm:py-10 px-6 sm:px-10 apple-glass rounded-3xl flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-accent font-semibold tracking-widest uppercase block">
                  ARCHIVE IN PREPARATION
                </span>
                <h3 className="font-sans text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink">
                  COMING SOON.
                </h3>
              </div>

              <p className="font-serif italic text-sm text-ink-secondary max-w-xs leading-relaxed">
                Selected engineering dossiers, prototypes, and systems architectures are currently being compiled.
              </p>

              <div className="pt-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-[10px] text-accent font-medium">
                  STATUS: IN ACTIVE DEVELOPMENT
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group aspect-square apple-glass rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Default Resting State */}
                <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span className="text-accent font-semibold px-2 py-0.5 rounded-full bg-accent/10">
                    {project.number}
                  </span>
                  <span>{project.year}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider block">
                    {project.category}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-ink-secondary line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
                  <span>INSPECT DOSSIER</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </div>

                {/* Hover Reveal Overlay with Apple Frosted Glass */}
                <div className="absolute inset-0 p-6 bg-zinc-950/85 text-canvas backdrop-blur-xl flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto rounded-3xl">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs text-blue-300">
                      <span>PROJECT // {project.number}</span>
                      <span>{project.year}</span>
                    </div>
                    <h4 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                      {project.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-300 line-clamp-3 leading-relaxed font-light">
                      {project.oneLiner}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(project.tags || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-[10px] text-zinc-300"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between font-mono text-xs text-blue-300">
                      <span>OPEN DOSSIER</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Minimal Footer Stamp */}
        <div className="pt-3 border-t border-editorial flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>CARD 02 // ARCHIVE</span>
          <span>{projects.length} SYSTEMS INDEXED</span>
        </div>
      </div>

      {/* Modal Deep-Dive Container */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
