"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Home, User, Briefcase, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import config from "@/lib/config.json";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const activeSection =
        ["home", "about", "projects", "contact"].find(section => {
          const element = document.getElementById(section);
          return (
            element &&
            scrollPosition >= element.offsetTop &&
            scrollPosition < element.offsetTop + element.offsetHeight
          );
        }) || "home";
      setActiveSection(activeSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/100 backdrop-blur-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-serif font-bold gradient-text">
              {config.personal.name}
            </span>
            <span className="text-primary"> | </span>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              {config.personal.title}
            </span>
          </motion.div>

          {isMobile
            ? <div className="flex items-center gap-2">
                <ThemeToggle />
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                <SheetContent
                  className="w-[280px] bg-background border-l border-[#888888]/20"
                  side="right"
                >
                  <div className="flex flex-col space-y-8 mt-16 px-6">
                    {navItems.map((item, index) =>
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${activeSection ===
                        item.href.substring(1)
                          ? "bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-[#E0E0E0] shadow-lg"
                          : "text-[#B0B0B0] hover:bg-[#1a1a1a]/30 hover:text-[#E0E0E0]"}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1}}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }}
                          className={`p-3 rounded-lg transition-all duration-300 ${activeSection ===
                          item.href.substring(1)
                            ? "bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-inner"
                            : "bg-[#1a1a1a]/50 group-hover:bg-[#1a1a1a]"}`}
                        >
                          <item.icon className="h-6 w-6" />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="text-lg font-medium relative z-10">
                            {item.name}
                          </span>
                          <span className="text-xs text-[#888888] mt-0.5">
                            {item.name === "Home"
                              ? "Welcome"
                              : item.name === "About"
                                ? "My Story"
                                : item.name === "Projects"
                                  ? "My Work"
                                  : "Get in Touch"}
                          </span>
                        </div>
                        {activeSection === item.href.substring(1) &&
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-transparent opacity-50"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6
                            }}
                          />}
                        <motion.div
                          className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#888888]/20 to-transparent"
                          initial={{ scaleY: 0 }}
                          animate={{
                            scaleY:
                              activeSection === item.href.substring(1) ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    )}
                  </div>
                </SheetContent>
                </Sheet>
              </div>
            : <div className="flex items-center space-x-4 md:space-x-8">
                {navItems.map(item =>
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-2 text-sm md:text-base font-medium transition-colors duration-300 ${activeSection ===
                    item.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }}
                      className="flex items-center gap-1"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </motion.div>
                    {activeSection === item.href.substring(1) &&
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />}
                  </a>
                )}
                <ThemeToggle />
              </div>}
        </div>
      </div>
    </motion.nav>
  );
}
