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
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[820px] items-center overflow-hidden bg-[#090509]"
      style={{ minHeight: "max(820px, 100svh)" }}
    >
      {/* Deep black / burgundy base with focused magenta light */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 76% 48%, rgba(133,8,49,.32) 0%, rgba(75,5,27,.18) 35%, transparent 68%),
            radial-gradient(ellipse at 8% 100%, rgba(128,5,43,.24) 0%, transparent 48%),
            radial-gradient(ellipse at 48% 10%, rgba(74,7,28,.20) 0%, transparent 55%),
            linear-gradient(110deg, #080508 0%, #10050a 45%, #180611 75%, #090509 100%)
          `,
        }}
      />

      {/* Large right diagonal panel */}
      <div
        className="pointer-events-none absolute right-[-14%] top-[-28%] z-[1] h-[145%] w-[57%]"
        style={{
          background:
            "linear-gradient(145deg, rgba(115,8,43,.20), rgba(176,12,65,.17) 48%, rgba(55,5,22,.06))",
          transform: "skewX(-32deg)",
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Secondary glass-like diagonal */}
      <div
        className="pointer-events-none absolute right-[-8%] top-[15%] z-[2] h-[75%] w-[39%] opacity-80"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,105,155,.11), rgba(159,10,59,.20) 48%, rgba(50,5,21,.04))",
          transform: "skewX(-32deg)",
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Bottom-left geometric accent */}
      <div
        className="pointer-events-none absolute bottom-[-24%] left-[28%] z-[1] h-[40%] w-[36%]"
        style={{
          background:
            "linear-gradient(130deg, rgba(116,10,44,.05), rgba(189,17,72,.17), transparent)",
          transform: "skewX(-30deg)",
          clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
        }}
      />

      {/* Portrait backlight */}
      <div
        className="pointer-events-none absolute right-[8%] top-[12%] z-[2] h-[72%] w-[53%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(203,22,81,.18), rgba(120,8,42,.10) 45%, transparent 72%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[-35%] left-[-12%] z-[1] h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(133,9,46,.20), transparent 70%)",
          filter: "blur(65px)",
        }}
      />

      <Particles className="pointer-events-none absolute inset-0 z-[3] h-full w-full opacity-20" />
      <Portrait />

      {/* Content aligns with the reference layout and leaves the right half for the portrait */}
      <div
        className="
          relative z-20 mx-auto grid w-full max-w-[1672px]
          grid-cols-1 items-center
          px-[clamp(24px,6.1vw,104px)] pb-24 pt-32
          lg:min-h-[max(820px,100svh)]
          lg:grid-cols-[48%_52%] lg:gap-0 lg:pb-28
        "
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-30 max-w-[650px]"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-maroon/40 bg-maroon/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/90 shadow-[0_0_30px_rgba(192,38,85,0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-maroon-bright opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-maroon-bright" />
              </span>
              Available for freelance projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-5xl font-extrabold leading-[1.04] tracking-[-0.05em] text-cream sm:text-6xl xl:text-[76px]"
          >
            Engineering <span className="text-gradient-solid">Ideas</span>
            <br />
            Into <span className="text-gradient">Intelligent</span>
            <br />
            <span className="font-serif font-normal italic text-cream/95">
              Digital Experiences.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[590px] text-base leading-[1.8] text-[#b9adb4] sm:text-lg"
          >
            I'm Rohit, a Full Stack Developer and AI/ML enthusiast passionate
            about building intelligent applications, scalable software systems,
            and meaningful digital experiences.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-maroon-bright px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(192,38,85,0.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_52px_rgba(192,38,85,0.45)]"
            >
              Explore My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-8 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-1 hover:border-maroon-bright/70 hover:bg-white/[0.05]"
            >
              Let's Work Together
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-5">
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#a99da5] transition hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-white/15" />
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#aaa0a7] transition-all duration-300 hover:-translate-y-1 hover:border-maroon-bright/70 hover:bg-maroon-bright/10 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-cream sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
