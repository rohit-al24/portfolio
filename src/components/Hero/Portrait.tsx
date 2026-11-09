import { useState } from "react";
import { motion } from "framer-motion";

export function Portrait() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-end overflow-hidden">
      <div className="relative mx-auto h-full w-full max-w-[1672px] flex justify-end items-end">
        <motion.img
          src="/backgroundimage.png"
          alt="Portrait of Rohit SK"
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="
            h-[82%] xs:h-[88%] sm:h-[94%] lg:h-full
            w-auto max-w-none
            object-contain object-right-bottom
            select-none
            translate-x-[8%] xs:translate-x-[4%] sm:translate-x-0
          "
          style={{
            filter: "drop-shadow(-15px 0px 45px rgba(192, 38, 85, 0.22))",
          }}
        />
      </div>
    </div>
  );
}
