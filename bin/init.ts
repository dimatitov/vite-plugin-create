import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function runInitCommand() {
  const targetDir = process.cwd();
  const sourceDir = path.resolve(__dirname, "../init-assets");

  const configPath = path.join(targetDir, "vite-create.config.json");
  const templatesPath = path.join(targetDir, "templates");

  if (!fs.existsSync(configPath)) {
    fs.copySync(path.join(sourceDir, "vite-create.config.json"), configPath);
    console.log("✅ vite-create.config.json created");
  } else {
    console.log("⚠️ vite-create.config.json already exists");
  }

  if (!fs.existsSync(templatesPath)) {
    fs.copySync(
      path.join(sourceDir, "templates/component"),
      path.join(templatesPath, "component")
    );
    console.log("✅ component folder created inside templates/");
  } else {
    console.log("⚠️ templates/ folder already exists");
  }
}
