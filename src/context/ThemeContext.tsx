"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "white" | "grey" | "pastel";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEMES: { id: Theme; name: string; icon: string; dotColor: string }[] = [
  { id: "dark", name: "Dark Obsidian", icon: "🌙", dotColor: "#090A0E" },
  { id: "white", name: "Crisp White", icon: "☀️", dotColor: "#FFFFFF" },
  { id: "grey", name: "Titanium Grey", icon: "🔘", dotColor: "#22242A" },
  { id: "pastel", name: "Aurora Pastel", icon: "🎨", dotColor: "#E9D5FF" },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme") as Theme | null;
      if (saved && ["dark", "white", "grey", "pastel"].includes(saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch {}
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const cycleTheme = () => {
    const list: Theme[] = ["dark", "white", "grey", "pastel"];
    const currentIndex = list.indexOf(theme);
    const nextTheme = list[(currentIndex + 1) % list.length];
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
