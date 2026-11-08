import type { Tech } from "@/data/technologies";

interface TechIconProps {
  tech: Tech;
  onSelect: (tech: Tech) => void;
  isActive?: boolean;
  position?: { x: number; y: number };
  isPaused?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/** A single floating technology node with hover glow + tooltip. */
export function TechIcon({ tech, onSelect, isActive = false, position, isPaused = false, onHoverStart, onHoverEnd }: TechIconProps) {
  const IconCmp = tech.icon;
  const currentPosition = position ?? { x: tech.x, y: tech.y };

  return (
    <button
      type="button"
      onClick={() => onSelect(tech)}
      aria-label={`${tech.name} — view details`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none ${
        tech.hiddenOnMobile ? "hidden md:block" : "block"
      } ${isActive ? "tech-icon--active" : ""} ${isPaused ? "pause-animation" : ""}`}
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        zIndex: tech.size >= 56 ? 30 : tech.size >= 40 ? 20 : 10,
      }}
    >
      <span className="block will-change-transform">
        <span
          className="flex items-center justify-center rounded-full border border-white/10 bg-black/45 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-maroon-bright/60 group-focus-visible:scale-110"
          style={{
            width: tech.size,
            height: tech.size,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 30px rgba(0,0,0,0.7), 0 0 38px -10px ${tech.brandColor}88, inset 0 0 16px rgba(0,0,0,0.82)`,
            transform: isActive ? "scale(1.12)" : "scale(1)",
          }}
        >
          <IconCmp
            className="transition-transform duration-300 ease-out group-hover:scale-110"
            style={{
              width: Math.round(tech.size * 0.46),
              height: Math.round(tech.size * 0.46),
              color: tech.brandColor,
            }}
          />
        </span>
      </span>

      <span
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-obsidian/95 px-3 py-1 text-xs font-medium text-cream shadow-card backdrop-blur transition-all duration-200 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
        aria-hidden="true"
      >
        {tech.name}
      </span>
    </button>
  );
}
