import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUp, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/config";
import { scrollToSection } from "@/components/Navbar/Navbar";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "Freelancer", href: site.socials.freelancer, Icon: Briefcase },
  { label: "Email", href: site.socials.email, Icon: Mail },
];

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    scrollToSection(id);
  };

  return (
    <footer className="relative border-t border-line bg-obsidian-2">
      <div className="container-x py-16">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-cream">
            ROHIT<span className="text-maroon-bright">.SK</span>
          </Link>
          <p className="mt-3 max-w-sm font-serif text-lg italic text-muted">
            “Engineering Ideas Into Intelligent Experiences.”
          </p>

          <nav className="mt-8" aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={handleNav(item.id)}
                    className="text-sm text-muted transition hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-maroon-bright/60 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © 2026 {site.owner}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-cream"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
