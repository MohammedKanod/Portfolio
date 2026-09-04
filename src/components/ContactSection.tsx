"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import content from "@/data/content.json";
import { SiteConfig } from "@/data/siteConfig";
import { Copy, Check, ArrowUpRight, ArrowUp, Instagram, Github, Linkedin, Mail } from "lucide-react";

export default function ContactSection({ onReset }: { onReset?: () => void }) {
  const [copied, setCopied] = useState(false);
  const { contact } = content;
  const site = content.site as SiteConfig;

  // Use email from content.json (which is now mohammedkanod53@gmail.com)
  const email = site.email || "mohammedkanod53@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      className="h-full w-full flex flex-col justify-between pt-16 pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <SectionHeader
          number="08"
          label={contact.label}
          category={contact.category}
        />

        {/* Large Typographic Headline with subtle Apple gradient */}
        <div className="my-auto py-2">
          <h2 className="display-title font-sans font-bold tracking-tightest uppercase text-ink select-none">
            {contact.headlinePart1} <br />
            {contact.headlinePart2} <br />
            <span className="font-serif italic font-normal apple-gradient-text">
              {contact.headlinePart3}
            </span>
          </h2>
        </div>

        {/* Apple-Glass Action Pill & Channels */}
        <div className="pt-6 border-t border-editorial flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Email 1-click copy in Apple glass container */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block">
              {contact.subtext}
            </span>

            <button
              onClick={handleCopyEmail}
              className="apple-glass rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-left transition-all hover:scale-[1.01]"
              title="Click to copy email address"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Mail className="w-5 h-5" />
              </div>

              <div className="space-y-0.5 pr-2">
                <span className="font-sans text-lg sm:text-2xl font-bold uppercase tracking-tight text-ink block break-all">
                  {email}
                </span>
                <span className="font-mono text-[10px] text-ink-muted block">
                  {copied ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY ADDRESS"}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-editorial text-ink-muted shrink-0 ml-auto">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </button>
          </div>

          {/* Social Channels in Frosted Glass Pills */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
            {site.github && (
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="apple-glass px-4 py-2.5 rounded-full text-ink hover:text-accent transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}

            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="apple-glass px-4 py-2.5 rounded-full text-ink hover:text-accent transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}

            {(site.instagram || site.twitter) && (
              <a
                href={site.instagram || site.twitter}
                target="_blank"
                rel="noreferrer"
                className="apple-glass px-4 py-2.5 rounded-full text-ink hover:text-accent transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Integrated Sleek Colophon Footer */}
        <div className="pt-4 border-t border-editorial flex items-center justify-between font-mono text-xs text-ink-muted">
          <div>
            <span className="text-ink font-bold uppercase">{site.name}</span>
            <span className="mx-2 hidden sm:inline">//</span>
            <span className="hidden sm:inline">{site.role}</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span>© 2026</span>
            <button
              onClick={onReset}
              className="apple-glass px-3 py-1 rounded-full text-ink hover:text-accent transition-colors inline-flex items-center gap-1 uppercase text-[11px]"
            >
              <span>RETURN TO CARD 01</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
