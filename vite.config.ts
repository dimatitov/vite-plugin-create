import { defineConfig } from "vite";
import vitePluginCreate from "./src";

export default defineConfig({
  plugins: [vitePluginCreate()],
});
