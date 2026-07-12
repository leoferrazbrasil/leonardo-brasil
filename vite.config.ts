import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site estático da marca pessoal Leonardo Brasil (leonardobrasil.com.br).
export default defineConfig({
  plugins: [react()],
  base: "/",
});
