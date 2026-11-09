import type { Tech } from "@/data/technologies";

interface TechIconProps {
  tech: Tech;
  onSelect: (tech: Tech) => void;
  isActive?: boolean;
  position?: { x: number; y: number };
  isPaused?: boolean;
  isFilteredOut?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/** A single floating technology node with rich planetary glow, orbital ring + tooltip. */
export function TechIcon({
  tech,
  onSelect,
  isActive = false,
  position,
  isPaused = false,
  isFilteredOut = false,
  onHoverStart,
  onHoverEnd,
}: TechIconProps) {
  const IconCmp = tech.icon;
  const currentPosition = position ?? { x: tech.x, y: tech.y };

  return (
    <button
      type="button"
      onClick={() => onSelect(tech)}
      aria-label={`${tech.name} — view architecture and experience details`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
        isFilteredOut ? "opacity-20 scale-75 blur-[0.5px] pointer-events-none" : "opacity-100 scale-100"
} `}
      style={{
        left: `${ currentPosition.x }% `,
        top: `${ currentPosition.y }% `,
        zIndex: isActive ? 45 : tech.size >= 56 ? 35 : tech.size >= 40 ? 25 : 15,
      }}
    >
      <span className="block will-change-transform">
        {/* Planetary Orb */}
        <span
          className="relative flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-120 group-hover:border-maroon-bright group-focus-visible:scale-120"
          style={{
            width: tech.size,
            height: tech.size,
            boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 25px rgba(0, 0, 0, 0.85), 0 0 40px - 8px ${ tech.brandColor } 99, inset 0 0 16px rgba(0, 0, 0, 0.85)`,
            transform: isActive ? "scale(1.15)" : undefined,
          }}
        >
          {/* Subtle spinning orbital ring on hover */}
          <span
            className="absolute inset-[-4px] rounded-full border border-dashed opacity-0 transition-opacity duration-300 group-hover:opacity-70 animate-spin pointer-events-none"
            style={{
              borderColor: tech.brandColor,
              animationDuration: "9s",
            }}
          />

          <IconCmp
            className="transition-transform duration-300 ease-out group-hover:scale-115"
            style={{
              width: Math.round(tech.size * 0.48),
              height: Math.round(tech.size * 0.48),
              color: tech.brandColor,
              filter: `drop - shadow(0 0 6px ${ tech.brandColor }66)`,
            }}
          />
        </span>
      </span>

  {/* Upgraded Tooltip with Category & Action hint */ }
      <div
        className={`pointer-events-none absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-white/15 bg-[#0e090d]/95 px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-200 ${
          isActive
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
        }`}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{
              background: tech.brandColor,
              boxShadow: `0 0 8px ${tech.brandColor}`,
            }}
          />
          <span className="font-display text-xs font-bold text-cream">
            {tech.name}
          </span>
          <span className="text-[10px] text-muted/80">· {tech.category}</span>
        </div>
      </div >
    </button >
  );
}
