"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import { MapPin, Calendar, GraduationCap, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import config from "@/lib/config.json";
import Image from "next/image";

export function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="education" className="py-16 md:py-20 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Education
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Academic foundation that shaped my technical expertise
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {config.education.map((item, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="hover:bg-white/5 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 glass rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="w-8 h-8 text-[#888888]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-[#E0E0E0] mb-2">
                      {item.title}
                    </h3>
                    <h4 className="text-lg md:text-xl text-[#B0B0B0] font-medium mb-4">
                      {item.company}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#888888] mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {item.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {item.location}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#888888] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[#B0B0B0] leading-relaxed text-base md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Bachelor of Engineering"
        subtitle="Computer Science and Engineering"
      >
        <div className="flex items-center justify-center w-full p-4">
          <div className="relative w-full max-w-2xl aspect-[4/3]">
            <Image
              src="/Graduation.png"
              alt="BE - CSE - Graduation"
              fill
              className="object-contain rounded-lg"
              quality={100}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
