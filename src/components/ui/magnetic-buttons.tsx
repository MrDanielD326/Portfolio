"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({ children, className = "", onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => { setPosition({ x: 0, y: 0 }) };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        target={href && href.startsWith("http") ? "_blank" : undefined}
        rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`glass rounded-lg px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-foreground hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all duration-300 ${className}`}
        data-magnetic
      >
        {children}
      </Component>
    </motion.div>
  );
}
