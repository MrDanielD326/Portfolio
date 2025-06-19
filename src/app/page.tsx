import { Navbar } from "@/components/layout/navbar";
import { Intro } from "@/components/pages/intro";
import { About } from "@/components/pages/about";
import { Value } from "@/components/pages/value";
import { TechStack } from "@/components/pages/techstack";
import { Experience } from "@/components/pages/experience";
import { Education } from "@/components/pages/education";
import { Project } from "@/components/pages/projects";
import { Contact } from "@/components/pages/contact";
import { BackToTop } from "@/components/ui/backToTop";
import { Copyright } from "lucide-react";
import config from "@/lib/config.json";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Intro />
      <About />
      <Value />
      <TechStack />
      <Experience />
      <Education />
      <Project />
      <Contact />
      <BackToTop />
      {/* Footer */}
      <footer className="py-4 md:py-4 border-t border-[#444444] bg-background/100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-[#B0B0B0] text-sm md:text-base flex items-center justify-center gap-1">
            <Copyright className="w-4 h-4" /> {new Date().getFullYear()} 🧑‍💻{" "}
            {config.personal.name} | {config.personal.title}
          </p>
        </div>
      </footer>
    </main>
  );
}
