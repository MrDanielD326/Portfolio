"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import { MagneticButton } from "@/components/ui/magnetic-buttons";
import { Github, ExternalLink } from "lucide-react";
import config from "@/lib/config.json";
import React from "react";

export function Project() {
  const projects = config.projects.filter(project => project.featured);

  type ProjectType = typeof projects[number];

  const ProjectCard = React.memo(({ project, index }: { project: ProjectType; index: number }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <GlassCard className="h-full">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#E0E0E0] mb-3">
              {project.name}
            </h3>
            <p className="text-[#B0B0B0] leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <motion.span
                className="glass rounded-full px-3 py-1 text-sm text-[#888888] hover:text-[#E0E0E0] transition-colors duration-300"
                key={tech}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-4 pt-4 justify-between items-center w-full">
            <div>
              <MagneticButton href={project.github} className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                Code
              </MagneticButton>
            </div>
            {project.link && (
              <div>
                <MagneticButton href={project.link} className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live
                </MagneticButton>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  ));

  return (
    <section id="projects" className="py-16 md:py-20 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            A showcase of my recent work and contributions
          </p>
        </motion.div>

        <div>
          {projects.length % 2 === 1 && projects.length > 1 ? (
            <>
              <div className="max-w-6xl mx-auto mb-8">
                <ProjectCard project={projects[0]} index={0} />
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projects.slice(1).map((project, idx) => ( <ProjectCard project={project} index={idx + 1} key={project.id} /> ))}
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project, idx) => ( <ProjectCard project={project} index={idx} key={project.id} /> ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
