/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta pessoal navy/azul — premium, distinta do Funil Comercial (preto/ouro).
        ink: "#080d18",
        panel: "#0d1526",
        "panel-2": "#111b30",
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.14)",
        text: "#eef2f8",
        muted: "#94a3bd",
        accent: {
          DEFAULT: "#3b82f6",
          600: "#2563eb",
          500: "#3b82f6",
          400: "#60a5fa",
          300: "#93c5fd",
        },
        // Dourado de destaque — usado com moderação (faixas de anúncio, selos), contraste premium com o navy.
        gold: {
          DEFAULT: "#f2b705",
          600: "#d99e00",
          500: "#f2b705",
          400: "#ffcb3d",
          300: "#ffdd7a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

