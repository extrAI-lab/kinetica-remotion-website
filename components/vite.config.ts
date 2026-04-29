import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../static/js",
    emptyOutDir: false,
    rollupOptions: {
      input: "src/index.tsx",
      output: {
        entryFileNames: "remotion-components.js",
        format: "iife",
        name: "RemotionComponents",
        inlineDynamicImports: true,
      },
    },
  },
});
