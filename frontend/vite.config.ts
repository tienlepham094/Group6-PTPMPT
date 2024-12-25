import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/auth": {
        target: "http://backend-app:8080", // Backend server URL
        // target: "http://backend-app:8080", // Backend server URL # change to localhost if run without docker
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"), // Ensures the '/auth' part remains intact
      },
    },
  },
});
