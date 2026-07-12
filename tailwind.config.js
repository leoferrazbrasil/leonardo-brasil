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
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
