import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Portrait() {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Atmospheric magenta glow behind the cutout */}
      <div
        className="absolute right-[-4%] top-[5%] h-[88%] w-[65%]"
        style={{
          background:
            "radial-gradient(ellipse at 58% 48%, rgba(190,15,72,.30) 0%, rgba(120,8,43,.17) 42%, transparent 74%)",
          filter: "blur(65px)",
        }}
      />

      {/* Gentle animated face / shoulder light */}
      <motion.div
        className="absolute right-[9%] top-[10%] h-[68%] w-[46%]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,105,155,.13), rgba(190,20,75,.06) 45%, transparent 72%)",
          filter: "blur(45px)",
        }}
        animate={reduced ? undefined : { opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {!failed && (
        <motion.img
          src="/assets/galaxy/me.png"
          alt="Portrait of Rohit SK"
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
  absolute bottom-[-1%] right-[-4%]
  h-[90%] w-auto max-w-none
  object-contain object-right-bottom
  max-md:right-[-8%]
  max-md:h-[74%]
  max-sm:right-[-14%]
  max-sm:h-[62%]
"
          style={{
  maxHeight: "100%",
  maxWidth: "none",
  filter:
    "brightness(0.94) contrast(1.12) saturate(0.98) drop-shadow(-25px 0px 65px rgba(164,20,67,0.18))",
  transformOrigin: "right bottom",
}}
        />
      )}

      {/* Blend the lower edge naturally into the hero background */}
      <div
        className="absolute bottom-0 right-0 z-[3] h-[12%] w-[62%]"
        style={{
          background: "linear-gradient(to top, rgba(9,5,9,.22), transparent)",
        }}
      />
    </div>
  );
}
