import fs from "fs-extra";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const sourceDir = path.resolve(__dirname, "../init-assets");
const destDir = path.resolve(__dirname, "../dist/init-assets");

fs.copySync(sourceDir, destDir);
console.log("init-assets copied successfully.");
