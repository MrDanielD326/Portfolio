"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const currentTheme = resolvedTheme || "dark";

  return {
    theme: currentTheme,
    toggleTheme,
    mounted,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light"
  };
}
