"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const updateMousePosition = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setMousePosition({ x: clientX, y: clientY });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => { setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window) };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Only add event listeners if not mobile
    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition, { passive: true });
      window.addEventListener("touchmove", updateMousePosition, { passive: true });
      window.addEventListener("touchstart", updateMousePosition, { passive: true });
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchstart", handleMouseDown);
      window.addEventListener("touchend", handleMouseUp);

      // Add hover listeners to interactive elements
      const interactiveElements = document.querySelectorAll("a, button, [data-magnetic]");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("touchstart", handleMouseEnter);
        el.addEventListener("touchend", handleMouseLeave);
      });

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("touchmove", updateMousePosition);
        window.removeEventListener("touchstart", updateMousePosition);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchstart", handleMouseDown);
        window.removeEventListener("touchend", handleMouseUp);
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
          el.removeEventListener("touchstart", handleMouseEnter);
          el.removeEventListener("touchend", handleMouseLeave);
        });
      };
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile, updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white/20 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8, scale: isClicking ? 0.8 : isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isClicking ? 1.2 : isHovering ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 bg-white/10 rounded-full pointer-events-none z-[99] mix-blend-difference"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ x: mousePosition.x - 32, y: mousePosition.y - 32, scale: 1, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </>
  );
}
