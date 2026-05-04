import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const local = (m) => path.resolve(__dirname, "node_modules", m);

export default defineConfig({
  resolve: {
    alias: {
      remotion: local("remotion"),
      "@remotion/player": local("@remotion/player"),
      react: local("react"),
      "react/jsx-runtime": local("react/jsx-runtime.js"),
      "react/jsx-dev-runtime": local("react/jsx-dev-runtime.js"),
      "react-dom": local("react-dom"),
      "remotion-bits": local("remotion-bits"),
    },
  },
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
