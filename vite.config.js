import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path"; // Import the `path` module to define aliases

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"), // Add an alias for the `src/` directory
    },
  },
});
