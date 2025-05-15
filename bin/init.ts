import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateConfig(
  useTypeScript: boolean,
  configTemplatePath: string,
  configPath: string
) {
  let configContent = fs.readFileSync(configTemplatePath, "utf-8");
  const config = JSON.parse(configContent);

  config.templateVars.useTypeScript = useTypeScript;

  Object.entries(config.generators).forEach(([genName, genConfig]) => {
    const gen = genConfig as GeneratorConfig;
    if (useTypeScript) {
      gen.files = gen.filesTS;
    } else {
      gen.files = gen.filesJS;
    }
    delete gen.filesTS;
    delete gen.filesJS;
  });

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
  console.log("✅ vite-create.config.json created");
}

export async function runInitCommand() {
  const targetDir = process.cwd();
  const sourceDir = path.resolve(__dirname, "../init-assets");

  const configPath = path.join(targetDir, "vite-create.config.json");
  const configTemplatePath = path.join(sourceDir, "vite-create.config.json");

  const { useTypeScript } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useTypeScript",
      message: "Use TypeScript?",
      default: true,
    },
  ]);

  if (!fs.existsSync(configPath)) {
    await generateConfig(useTypeScript, configTemplatePath, configPath);
  } else {
    console.log("ℹ️ vite-create.config.json already exists");
  }

  const templatesPath = path.join(targetDir, "templates");

  const copyDir = (templateName: string) => {
    const subdir = path.join(templatesPath, templateName);
    const baseSource = path.join(sourceDir, "templates", templateName);

    if (!fs.existsSync(subdir)) {
      fs.mkdirpSync(subdir);
      const allFiles = fs.readdirSync(baseSource);

      const filteredFiles = allFiles.filter((file) => {
        const isTS = file.endsWith(".ts") || file.endsWith(".tsx");
        const isJS = file.endsWith(".js") || file.endsWith(".jsx");
        const isSCSS = file.endsWith(".scss");
        return useTypeScript ? isTS || isSCSS : isJS || isSCSS;
      });

      filteredFiles.forEach((file) => {
        const src = path.join(baseSource, file);
        const dest = path.join(subdir, file);
        fs.copyFileSync(src, dest);
      });

      console.log(`✅ ${templateName} folder created inside templates/`);
    } else {
      console.log(`ℹ️ ${templateName} folder already exists`);
    }
  };

  copyDir("component");
  copyDir("page");
  copyDir("store");
}

export interface GeneratorConfig {
  filesTS?: Record<string, string>;
  filesJS?: Record<string, string>;
  files?: Record<string, string>;
  [key: string]: any;
}
