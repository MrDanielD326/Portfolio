import { Navbar } from "@/components/layout/navbar";
import { Intro } from "@/components/pages/intro";
import { About } from "@/components/pages/about";
import { Value } from "@/components/pages/value";
import { TechStack } from "@/components/pages/techstack";
import { Experience } from "@/components/pages/experience";
import { Education } from "@/components/pages/education";
import { Project } from "@/components/pages/projects";
import { Contact } from "@/components/pages/contact";
import { Footer } from "@/components/pages/footer";
import { BackToTop } from "@/components/ui/backToTop";

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
      <Footer />
      <BackToTop />
    </main>
  );
}
