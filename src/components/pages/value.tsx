"use client";

import { motion } from "framer-motion";
import config from "@/lib/config.json";

const ValueList = ({ prefix = "" }: { prefix?: string }) =>
  <div className="flex gap-4">
    {config.skills.map((skill: string, index: number) =>
      <motion.div
        key={`${prefix}${index}`}
        className="px-4 py-2 rounded-full bg-[#4F46E5]/10 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[#E0E0E0]">
          {skill}
        </span>
      </motion.div>
    )}
  </div>;

export function Value() {
  return (
    <section id="skills" className="py-16 md:py-20 bg-black/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Core Values
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            The principles that guide my work and shape my professional approach
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-150%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
                repeatDelay: 0
              }
            }}
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)"
            }}
          >
            {Array.from({ length: 20 }).map((_, index) =>
              <ValueList key={index} prefix={`list-${index}-`} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
