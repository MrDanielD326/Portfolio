"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import config from "@/lib/config.json";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  modalKey: keyof typeof config.modalContent;
  onOpenModal: (key: string) => void;
  delay: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  modalKey,
  onOpenModal,
  delay
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <GlassCard>
        <div className="text-center">
          <div className="text-4xl mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">
            {title}
          </h3>
          <p className="text-[#B0B0B0] mb-4">
            {description}
          </p>
          <div className="text-right">
            <button
              onClick={() => onOpenModal(modalKey)}
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Why?
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
