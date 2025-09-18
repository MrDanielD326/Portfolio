"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glassCard";
import { MagneticButton } from "@/components/ui/magnetic-buttons";
import { Github, Linkedin, Instagram, Mail, Copy, Check, Phone } from "lucide-react";
import config from "@/lib/config.json";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(config.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhoneCall = () => {
    window.location.href = config.personal.phone;
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: config.social.github },
    { name: "LinkedIn", icon: Linkedin, href: config.social.linkedin },
    { name: "Instagram", icon: Instagram, href: config.social.instagram }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-4 md:mb-6">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Ready to collaborate? Let's discuss your next project
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard>
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#E0E0E0] mb-4">
                    Get In Touch
                  </h3>
                  <p className="text-[#B0B0B0] leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
                    Whether discussing an exciting project or exploring the latest in technology, I'm eager to connect with fellow developers and innovators. Let's dive into ideas that drive impactful solutions and advancements, fostering collaboration and innovation
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Contact Methods Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Section */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={handlePhoneCall}>
                      <Phone className="w-5 h-5 text-[#888888] flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#E0E0E0] mb-1"> Phone - Let's talk about your ideas </p>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Mail className="w-5 h-5 text-[#888888] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#E0E0E0] mb-1">
                          {config.personal.email}
                        </p>
                      </div>
                      <button
                        className="glass rounded-lg p-2 hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                        onClick={copyEmail}
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#888888]" />}
                      </button>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="text-sm font-medium text-[#888888] mb-4 text-center">
                      Connect on Social Media
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {socialLinks.map(social =>
                        <MagneticButton
                          key={social.name}
                          href={social.href}
                          className="flex items-center gap-2 justify-center text-sm hover:bg-white/10 transition-colors"
                        >
                          <social.icon className="w-4 h-4" />
                          {social.name}
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
