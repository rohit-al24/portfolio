import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { Portrait } from "./Portrait";
import { Particles } from "@/components/ui/Particles";
import { site } from "@/lib/config";
import { scrollToSection } from "@/components/Navbar/Navbar";

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "Freelancer", href: site.socials.freelancer, Icon: Briefcase },
  { label: "Email", href: site.socials.email, Icon: Mail },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex items-center overflow-hidden bg-[#090509] min-h-[100svh] lg:h-screen lg:min-h-[640px] lg:max-h-[960px] xl:max-h-[1050px]"
    >
      {/* Deep black / burgundy base background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 50%, rgba(133,8,49,.25) 0%, rgba(75,5,27,.12) 40%, transparent 70%),
            radial-gradient(ellipse at 10% 90%, rgba(128,5,43,.18) 0%, transparent 45%),
            linear-gradient(110deg, #080508 0%, #10050a 45%, #180611 75%, #090509 100%)
          `,
        }}
      />

      <Particles className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-20" />

      {/* Portrait & Background Artwork (using backgroundimage.png) */}
      <Portrait />

      {/* Content wrapper */}
      <div
        className="
          relative z-20 mx-auto grid w-full max-w-[1672px]
          grid-cols-1 items-center
          px-6 sm:px-10 lg:px-14 xl:px-20
          pt-24 pb-14
          lg:h-full lg:grid-cols-[50%_50%] lg:gap-0 lg:py-0
        "
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-30 max-w-[620px]"
        >
          {/* Freelance Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-maroon/50 bg-maroon/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/90 shadow-[0_0_25px_rgba(192,38,85,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-maroon-bright opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-maroon-bright" />
              </span>
              Available for freelance projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl sm:text-5xl lg:text-[46px] xl:text-[58px] 2xl:text-[68px] font-extrabold leading-[1.08] tracking-[-0.04em] text-cream"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-[#FF3366] via-[#FA3B6E] to-[#E11D48] bg-clip-text text-transparent">
              Ideas
            </span>
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-[#FF3366] via-[#FA3B6E] to-[#E11D48] bg-clip-text text-transparent">
              Intelligent
            </span>
            <br />
            <span className="font-serif font-normal italic text-cream/95">
              Digital Experiences.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-4 sm:mt-5 max-w-[530px] text-sm sm:text-base lg:text-[16px] xl:text-[17px] leading-[1.7] text-[#b9adb4]"
          >
            I'm Rohit, a Full Stack Developer and AI/ML enthusiast passionate
            about building intelligent applications, scalable software systems,
            and meaningful digital experiences.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={item} className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#E11D48] hover:bg-[#FA3B6E] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(225,29,72,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_45px_rgba(225,29,72,0.5)]"
            >
              Explore My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FA3B6E]/70 hover:bg-white/[0.08]"
            >
              Let's Work Together
            </button>
          </motion.div>

          {/* Download Resume Link */}
          <motion.div variants={item} className="mt-3.5 sm:mt-4">
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#b9adb4] transition hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={item} className="mt-6 sm:mt-7 flex items-center gap-3">
            <span className="h-px w-8 bg-white/15" />
            <div className="flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#aaa0a7] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FA3B6E]/70 hover:bg-[#FA3B6E]/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted transition hover:text-cream sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
