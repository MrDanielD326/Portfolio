"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function InteractiveGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!gradientRef.current) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const { innerWidth, innerHeight } = window;

      // Calculate position as percentage
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;

      // Update gradient position
      gradientRef.current.style.background = `
        radial-gradient(
          800px circle at ${x}% ${y}%,
          rgba(147, 51, 234, 0.08) 0%,
          rgba(147, 51, 234, 0.06) 15%,
          rgba(79, 70, 229, 0.04) 30%
        )
      `;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchstart", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchstart", handleMove);
    };
  }, []);

  return (
    <motion.div
      ref={gradientRef}
      className="fixed inset-0 pointer-events-none z-0 transition-[background] duration-300 ease-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
