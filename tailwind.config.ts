import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import Forms from "@tailwindcss/forms";
import Typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true,
  },
  theme: {
    extend: {
      transitionTimingFunction: {
        DEFAULT: defaultTheme.transitionTimingFunction.out,
      },
      colors: {
        green: "#39656D",
        blue: "#ADC5D8",
        yellow: "#F8DDA0",
        background: "#FCF5EB",
        text: "#262E38",
        prose: "#374151",
      },
    },
    keyframes: {
      fade: {
        "0%": { opacity: "0" },
        "100%": { transform: "1" },
      },
    },
    animation: {
      fade: "fade 3s linear forwards",
    },
  },
  plugins: [Forms, Typography],
} satisfies Config;
