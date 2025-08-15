"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import { Modal } from "@/components/ui/modal";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import config from "@/lib/config.json";

const techCategories = [
  { name: "Languages", items: config.techStack.languages, icon: "💻" },
  { name: "Frontend", items: config.techStack.frontend, icon: "🧑‍🎨" },
  { name: "Backend", items: config.techStack.backend, icon: "⚙️" },
  { name: "Databases", items: config.techStack.databases, icon: "🗄️" },
  { name: "Tools", items: config.techStack.tools, icon: "🛠️" },
  { name: "Testing", items: config.techStack.testing, icon: "🧪" },
  { name: "DevOps & Cloud", items: config.techStack.devops, icon: "☁️" },
  { name: "AI Tools", items: config.techStack.ai, icon: "🤖" },
  { name: "Design", items: config.techStack.design, icon: "🎨" },
  { name: "Essentials", items: config.techStack.essentials, icon: "🔑" }
];

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    duration: 20,
    inViewThreshold: 0.7
  });

  useEffect(
    () => {
      if (!emblaApi) return;
      const section = document.getElementById("tech-stack");
      if (!section) return;
      const observer = new IntersectionObserver(
        entries => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            const autoplay = setInterval(() => {
              emblaApi.scrollNext();
            }, 3000);
            return () => clearInterval(autoplay);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(section);
      return () => {
        observer.disconnect();
      };
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => {
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => {
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi]
  );

  const openDocsModal = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const getCategoryDocs = (categoryName: string) => {
    const category = techCategories.find(cat => cat.name === categoryName);
    if (!category) return [];
    return category.items.map(tech => ({
      name: tech,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        tech
      )}+official+documentation`
    }));
  };

  return (
    <section
      className="py-16 md:py-24 bg-black/20 relative overflow-hidden"
      id="tech-stack"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Tech Stack
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="relative px-12 md:px-16">
          <motion.div
            className="overflow-hidden"
            ref={emblaRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex -ml-6 md:-ml-8">
              {techCategories.map((category, index) =>
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 md:pl-8"
                >
                  <GlassCard className="h-full p-4 md:p-5 relative">
                    <motion.div
                      className="text-center mb-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="text-3xl md:text-4xl mb-2">
                        {category.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        {category.name}
                      </h3>
                    </motion.div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.items.map((tech, techIndex) =>
                        <motion.span
                          key={tech}
                          className="glass rounded-full px-3 py-1 text-sm text-muted-foreground hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all duration-300"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.1)"
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1 + techIndex * 0.05,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 dark:bg-black/70 dark:hover:bg-black/90 light:bg-white/70 light:hover:bg-white/90 text-white dark:text-white light:text-black p-3 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 dark:bg-black/70 dark:hover:bg-black/90 light:bg-white/70 light:hover:bg-white/90 text-white dark:text-white light:text-black p-3 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCategory ? `${selectedCategory} Documentation` : ""}
        subtitle="Click below to check out documentations"
      >
        {selectedCategory &&
          <div className="flex flex-wrap gap-2">
            {getCategoryDocs(selectedCategory).map(doc =>
              <a
                key={doc.name}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-sm"
              >
                <BookOpen size={14} className="mr-1.5" />
                <span className="text-white dark:text-white light:text-black">
                  {doc.name}
                </span>
              </a>
            )}
          </div>}
      </Modal>
    </section>
  );
}
