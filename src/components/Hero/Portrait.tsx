import { useState } from "react";
import { motion } from "framer-motion";

export function Portrait() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <>
      {/* Desktop portrait & background effects from backgroundimage.png */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:flex items-end justify-end overflow-hidden">
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
            className="h-full w-auto max-w-none object-contain object-right-bottom select-none"
            style={{
              filter: "drop-shadow(-20px 0px 50px rgba(192, 38, 85, 0.2))",
            }}
          />
        </div>
      </div>

      {/* Mobile view: display Rohit proudly without shrinking */}
      <div className="pointer-events-none absolute inset-0 z-10 block lg:hidden overflow-hidden">
        <motion.img
          src="/backgroundimage.png"
          alt="Portrait of Rohit SK"
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-full w-full object-cover object-[78%_25%] select-none"
        />
        {/* Soft dark vignette overlay on mobile to keep typography crystal clear */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,5,9,0.3) 0%, rgba(9,5,9,0.65) 42%, rgba(9,5,9,0.92) 75%, #090509 100%)",
          }}
        />
      </div>
    </>
  );
}
