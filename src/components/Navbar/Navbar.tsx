import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function scrollToSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const active = useScrollSpy(SECTIONS.map((s) => s.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-line/70 bg-obsidian/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-cream"
          aria-label="ROHITSK — home"
          onClick={() => {
            setOpen(false);
            if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ROHIT<span className="text-maroon-bright">SK</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((section) => {
            const isActive = location.pathname === "/" && active === section.id;
            return (
              <li key={section.id} className="relative">
                <a
                  href={`/#${section.id}`}
                  onClick={handleNav(section.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-muted hover:text-cream"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full border border-maroon/50 bg-maroon/15"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Resume CTA (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-maroon-bright/50 bg-maroon/20 px-5 py-2 text-sm font-semibold text-cream transition-all duration-300 hover:bg-maroon-bright hover:shadow-glow-sm"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/70 bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`/#${section.id}`}
                    onClick={handleNav(section.id)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-muted transition hover:bg-card hover:text-cream"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/resume"
                  className="flex items-center justify-center gap-2 rounded-xl bg-maroon-bright px-4 py-3 text-base font-semibold text-white"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
