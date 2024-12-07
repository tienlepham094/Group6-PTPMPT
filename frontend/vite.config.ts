import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/app": {
        target: "http://localhost:8080", // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
