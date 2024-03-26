import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    cors: false,
  },
  /*  server: {
    host: "192.168.10.101",
    port: 4000,
  }, */
});
