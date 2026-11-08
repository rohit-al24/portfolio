import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero/Hero";
import { TechUniverse } from "@/components/TechUniverse/TechUniverse";
import { About } from "@/components/About/About";
import { Skills } from "@/components/Skills/Skills";
import { Projects } from "@/components/Projects/Projects";
import { Experience } from "@/components/Experience/Experience";
import { Services } from "@/components/Services/Services";
import { Achievements } from "@/components/Achievements/Achievements";
import { Contact } from "@/components/Contact/Contact";
import { scrollToSection } from "@/components/Navbar/Navbar";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    document.title = "ROHIT.SK — Full Stack Developer & AI/ML Enthusiast";
  }, []);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = state.scrollTo;
      const t = window.setTimeout(() => scrollToSection(id), 80);
      return () => window.clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <TechUniverse />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Achievements />
      <Contact />
    </>
  );
}
