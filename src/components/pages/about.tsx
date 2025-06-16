"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { FeatureCard } from "../ui/feature-card";
import config from "@/lib/config.json";

export function About() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = (key: keyof typeof config.modalContent) => {
    const content = config.modalContent[key].content;
    return (
      <>
        <p> {content.intro} </p>
        <ul className="list-disc pl-6 space-y-2">
          {content.points.map((point, index) => (<li key={index}> {point} </li>))}
        </ul>
        <p className="mt-4"> {content.conclusion} </p>
      </>
    );
  };

  const features: Array<{ icon: string; title: string; description: string; modalKey: keyof typeof config.modalContent }> = [
    {
      icon: "✨",
      title: "Clean Code",
      modalKey: "cleanCode",
      description: "Writing maintainable, readable code that follows best practices and industry standards"
    },
    {
      icon: "🚀",
      title: "Performance",
      modalKey: "performance",
      description: "Optimizing applications for speed, efficiency, and an exceptional user experiences"
    },
    {
      icon: "📈",
      title: "Scalability",
      modalKey: "scalability",
      description: "Building robust systems that grow seamlessly with your business needs and user demands"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            {config.personal.bio}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.modalKey} {...feature} onOpenModal={setActiveModal} delay={0.1 * (index + 1)} />
          ))}
        </div>
      </div>

      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={config.modalContent[activeModal as keyof typeof config.modalContent].title}
        >
          {renderModalContent(activeModal as keyof typeof config.modalContent)}
        </Modal>
      )}
    </section>
  );
}
