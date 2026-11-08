/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#090708",
        "obsidian-2": "#100C0F",
        card: "#171114",
        "card-elevated": "#21161B",
        maroon: {
          DEFAULT: "#861B40",
          bright: "#C02655",
          glow: "#A51F4B",
        },
        cream: "#F5F0F2",
        muted: "#A69BA0",
        line: "#38232C",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(165, 31, 75, 0.45)",
        "glow-sm": "0 0 24px -6px rgba(165, 31, 75, 0.4)",
        card: "0 18px 50px -20px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(134,27,64,0.28), transparent 60%)",
        "card-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
