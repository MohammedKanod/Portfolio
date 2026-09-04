"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FluidCursor from "@/components/FluidCursor";
import Navigation from "@/components/Navigation";
import CardDeckNavigator from "@/components/CardDeckNavigator";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import PhilosophySection from "@/components/PhilosophySection";
import CybersecuritySection from "@/components/CybersecuritySection";
import PhysicsSection from "@/components/PhysicsSection";
import AboutSection from "@/components/AboutSection";
import CurrentlySection from "@/components/CurrentlySection";
import ContactSection from "@/components/ContactSection";
import content from "@/data/content.json";

export default function Home() {
  const hasPhysics = Boolean((content as any).physics);
  const TOTAL_CARDS = hasPhysics ? 9 : 8;

  const [currentCard, setCurrentCard] = useState<number>(0);
  const isTransitioning = useRef<boolean>(false);
  const touchStartY = useRef<number | null>(null);

  const goToCard = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, TOTAL_CARDS - 1));
      isTransitioning.current = true;
      setCurrentCard(target);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 700);
    },
    [TOTAL_CARDS]
  );

  const nextCard = useCallback(() => {
    if (currentCard < TOTAL_CARDS - 1 && !isTransitioning.current) {
      goToCard(currentCard + 1);
    }
  }, [currentCard, goToCard, TOTAL_CARDS]);

  const prevCard = useCallback(() => {
    if (currentCard > 0 && !isTransitioning.current) {
      goToCard(currentCard - 1);
    }
  }, [currentCard, goToCard]);

  // Wheel listener with smooth debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (document.body.style.overflow === "hidden") return;
      if (Math.abs(e.deltaY) < 18) return;
      if (isTransitioning.current) return;

      if (e.deltaY > 0) {
        nextCard();
      } else {
        prevCard();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextCard, prevCard]);

  // Touch swipe listener for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextCard, prevCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextCard();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevCard();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToCard(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToCard(TOTAL_CARDS - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, goToCard, TOTAL_CARDS]);

  // Helper to render card wrapper with morph and fade transition
  const renderCardWrapper = (cardIndex: number, children: React.ReactNode) => {
    const isActive = currentCard === cardIndex;
    const diff = cardIndex - currentCard;

    return (
      <div
        className="h-screen w-full flex-shrink-0 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive
            ? "scale(1) translate3d(0, 0, 0)"
            : diff > 0
            ? "scale(0.93) translate3d(0, 40px, 0)"
            : "scale(0.93) translate3d(0, -40px, 0)",
          filter: isActive ? "blur(0px)" : "blur(10px)",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {children}
      </div>
    );
  };

  let cardCursor = 0;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-canvas text-ink selection:bg-ink selection:text-canvas">
      {/* Custom Fluid Cursor (Replaces Default Windows Pointer) */}
      <FluidCursor />

      {/* Apple Ambient Mesh Gradients */}
      <div className="apple-ambient-bg" />

      {/* Global Fixed Apple Glass Navigation Header */}
      <Navigation currentCard={currentCard} onSelectCard={goToCard} />

      {/* Floating Card Deck Navigator */}
      <CardDeckNavigator currentCard={currentCard} onSelectCard={goToCard} />

      {/* Master Card Deck Track with Synchronized Morph & Fade Transitions */}
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10"
        style={{ transform: `translate3d(0, -${currentCard * 100}%, 0)` }}
      >
        {/* Card 01 — Identity with Photo Frame */}
        {renderCardWrapper(cardCursor++, <HeroSection onNext={nextCard} />)}

        {/* Card 02 — Selected Engineering & Security Systems */}
        {renderCardWrapper(cardCursor++, <SelectedWorkSection />)}

        {/* Card 03 — Laboratory Experiments */}
        {renderCardWrapper(cardCursor++, <ExperimentsSection />)}

        {/* Card 04 — Philosophy */}
        {renderCardWrapper(cardCursor++, <PhilosophySection />)}

        {/* Card 05 — Adversarial Cybersecurity */}
        {renderCardWrapper(cardCursor++, <CybersecuritySection />)}

        {/* Optional Card — Physics (if configured) */}
        {hasPhysics && renderCardWrapper(cardCursor++, <PhysicsSection />)}

        {/* Card 06/07 — Beyond the Screen */}
        {renderCardWrapper(cardCursor++, <AboutSection />)}

        {/* Card 07/08 — Currently Grid */}
        {renderCardWrapper(cardCursor++, <CurrentlySection />)}

        {/* Card 08/09 — Contact & Colophon */}
        {renderCardWrapper(
          cardCursor++,
          <ContactSection onReset={() => goToCard(0)} />
        )}
      </div>
    </main>
  );
}
