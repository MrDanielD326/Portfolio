"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-buttons";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <motion.div
            className="text-8xl md:text-9xl font-serif font-bold gradient-text"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            404
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-semibold text-[#E0E0E0]">
            Page Not Found
          </h1>

          <p className="text-lg text-[#B0B0B0] max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </MagneticButton>
          <MagneticButton onClick={() => window.history.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </MagneticButton>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#888888]/30 rounded-full"
              style={{ left: `${i * 10 + 5}%`, top: `${i * 8 + 10}%` }}
              animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3 + i * 0.2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
