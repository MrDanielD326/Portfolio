"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = memo(() => {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-10 w-10 rounded-full bg-transparent hover:bg-muted/10 transition-colors duration-200"
        disabled
      >
        <span className="text-lg">🌙</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 rounded-full bg-transparent hover:bg-muted/10 transition-colors duration-200"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.3
        }}
        className="flex items-center justify-center"
      >
        <span className="text-lg">
          {isDark ? <Moon /> : <Sun />}
        </span>
      </motion.div>
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
