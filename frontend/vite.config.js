import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:process.env.VITE_BACKEND_URL || "https://task-manager-wj6n.vercel.app/api"
});
