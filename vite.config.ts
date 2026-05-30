import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const defaultBasePath = mode === "development" ? "/personal-page/" : "/";
  const defaultAllowedHosts = mode === "development" ? "tw-ws.stmharry.io" : "";
  const allowedHosts = (env.ALLOWED_HOSTS ?? defaultAllowedHosts)
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
  const basePath = (env.BASE_PATH ?? defaultBasePath).trim();
  const normalizedBasePath = !basePath || basePath === "/" ? "/" : `/${basePath.replace(/^\/+/, "").replace(/\/+$/, "")}/`;

  return {
    base: normalizedBasePath,
    plugins: [react(), tailwindcss()],
    server: allowedHosts && allowedHosts.length > 0 ? { allowedHosts } : undefined,
  };
});
