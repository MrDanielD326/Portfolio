"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import { MapPin, Calendar } from "lucide-react";
import config from "@/lib/config.json";

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Professional Experience
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            My journey in software development and the impact I've made
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {config.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Company Info */}
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl">
                        {item.type === "work" ? "💼" : "🎓"}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#E0E0E0]">
                        {item.title}
                      </h3>
                    </div>
                    <h4 className="text-base md:text-lg text-[#B0B0B0] font-medium mb-3">
                      {item.company}
                    </h4>

                    <div className="space-y-2 text-sm text-[#888888]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span> {item.period} </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span> {item.location} </span>
                      </div>
                    </div>
                  </div>

                  {/* Description & Achievements */}
                  <div className="md:col-span-2">
                    <p className="text-[#B0B0B0] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.achievements && (
                      <div>
                        <h5 className="text-[#E0E0E0] font-semibold mb-3">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              className="flex items-start gap-3 text-[#B0B0B0] text-sm"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + achIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <span className="text-[#888888] mt-1"> • </span>
                              <span> {achievement} </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
