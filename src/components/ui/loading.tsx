"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Ensure we wait for the initial render
    const initialTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  // Prevent flash of content
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground text-lg font-medium">
            Welcome! ✨ Loading your digital experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-muted-foreground text-lg font-medium"
              >
                Welcome! ✨ Loading your digital experience...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
