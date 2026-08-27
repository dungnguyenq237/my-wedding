import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = "my-wedding";
const deploymentBase = process.env.VITE_BASE_PATH ?? `/${repositoryName}/`;

export default defineConfig(({ command }) => ({
  base: command === "build" ? deploymentBase : "/",
  plugins: [react(), tailwindcss()],
}));
