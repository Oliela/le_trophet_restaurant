import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivoire: {
          DEFAULT: "#FFF9F0",
          card: "#FFFDF8",
        },
        terracotta: {
          DEFAULT: "#A84324",
          dark: "#8A3620",
          light: "#C15A38",
        },
        brun: {
          DEFAULT: "#271A14",
          light: "#3A281F",
        },
        ocre: {
          DEFAULT: "#D39B3A",
          light: "#E3B565",
        },
        olive: {
          DEFAULT: "#667044",
          dark: "#535C37",
        },
        grisbrun: "#6B5D55",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        organic: "58% 42% 62% 38% / 45% 55% 45% 55%",
        "organic-2": "42% 58% 38% 62% / 55% 45% 55% 45%",
      },
      boxShadow: {
        // Ombres douces et chaudes (teintées de brun, jamais noir pur), sans
        // effet brillant. `soft` = repos, `card` = élévation au survol/actif.
        soft: "0 10px 24px -14px rgba(39, 26, 20, 0.16)",
        card: "0 20px 40px -18px rgba(39, 26, 20, 0.22)",
      },
      backgroundImage: {
        bogolan: "url('/images/bogolan-texture.jpg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
