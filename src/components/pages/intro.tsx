"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-buttons";
import { Particles } from "@/components/ui/particles";
import { useToast } from "@/hooks/use-toast";
import { UserCircle } from "lucide-react";
import config from "@/lib/config.json";
import Image from "next/image";

export function Intro() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isAlternateAvatar, setIsAlternateAvatar] = useState(false);
  const fullText = `Hi, I'm ${config.personal.name}`;

  useEffect(
    () => {
      // Add 5 second delay before starting
      const delayTimer = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          if (i < fullText.length) {
            setText(fullText.slice(0, i + 1));
            i++;
          } else {
            clearInterval(timer);
          }
        }, 100);
        return () => clearInterval(timer);
      }, 3250);
      return () => clearTimeout(delayTimer);
    },
    [fullText]
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black/20 pt-16 md:pt-20"
    >
      {/* Floating particles */}
      <Particles count={300} />

      <div className="container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {text}
                <span className="animate-pulse"> | </span>
              </motion.h1>

              <motion.h2
                className="text-xl sm:text-2xl lg:text-3xl text-[#B0B0B0] font-medium flex items-center justify-center lg:justify-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {config.personal.title}
                {/* Toggle Avatar Button */}
                <motion.button
                  onClick={() => setIsAlternateAvatar(!isAlternateAvatar)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2"
                >
                  <UserCircle className="w-6 h-6" />
                </motion.button>
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-[#B0B0B0] max-w-xl leading-relaxed mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {config.personal.tagline}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <MagneticButton href="#projects"> View&nbsp;My&nbsp;Work </MagneticButton>
              <MagneticButton href="#contact"> Connect </MagneticButton>
              <MagneticButton
                href={config.personal.resume}
                className="download-link"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = config.personal.resume;
                  link.download = "resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast({
                    title: "Success!",
                    description: "Resume downloaded successfully"
                  });
                }}
              >
                Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right side - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              <Image
                src={isAlternateAvatar ? "/DanielD.png" : "/DanielDAvatar.png"}
                alt={config.personal.name}
                width={400}
                height={400}
                className="rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
                priority
              />

              {/* Floating rings */}
              <motion.div
                className="absolute inset-0 border-2 border-[#888888]/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                }}
                style={{ scale: 1.1 }}
              />
              <motion.div
                className="absolute inset-0 border border-[#888888]/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                }}
                style={{ scale: 1.2 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
