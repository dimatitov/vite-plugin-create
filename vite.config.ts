import { defineConfig } from "vite";
import vitePluginCreate from "./src";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "playground/react",
  plugins: [vitePluginCreate(), react()],
});
