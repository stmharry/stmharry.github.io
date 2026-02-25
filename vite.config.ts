import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(() => {
  const env = loadEnv("dev", process.cwd(), "")
  const allowedHosts = env.ALLOWED_HOSTS?.split(",")
    .map((host) => host.trim())
    .filter(Boolean)

  return {
    plugins: [react(), tailwindcss()],
    server: allowedHosts && allowedHosts.length > 0 ? { allowedHosts } : undefined,
  }
})
