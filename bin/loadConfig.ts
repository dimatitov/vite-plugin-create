import fs from "fs-extra";
import path from "path";

export const loadConfig = () => {
  const configPath = path.resolve(process.cwd(), "vite-create.config.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("Config file vite-create.config.json not found");
  }
  return fs.readJsonSync(configPath);
};
