#!/usr/bin/env node

// bin/cli.ts
import { Command } from "commander";

// src/generator.ts
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

// src/helpers/nameHelpers.ts
var toPascalCase = (str) => {
  return str.split(/[-_ ]+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
};
var toCamelCase = (str) => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};
var toKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").replace(/_+/g, "-").toLowerCase();
};

// src/generator.ts
var runCreateCommand = async (type, name, configPath = "vite-create.config.json") => {
  const configFile = path.resolve(process.cwd(), configPath);
  if (!fs.existsSync(configFile)) {
    console.error(`Config file not found: ${configFile}`);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const generator = config.generators?.[type];
  if (!generator) {
    console.error(`Generator '${type}' not found in config.`);
    process.exit(1);
  }
  const basePath = path.resolve(process.cwd(), config.defaultPath || "src");
  const templateVars = {
    name,
    PascalCaseName: toPascalCase(name),
    camelCaseName: toCamelCase(name),
    kebabCaseName: toKebabCase(name),
    ...config.templateVars || {}
  };
  const nameStyle = templateVars.fileNameStyle || "PascalCase";
  switch (nameStyle) {
    case "camelCase" /* CAMEL_CASE */:
      templateVars.name = templateVars.camelCaseName;
      break;
    case "kebabCase" /* KEBAB_CASE */:
      templateVars.name = templateVars.kebabCaseName;
      break;
    case "original" /* ORIGINAL */:
      templateVars.name = name;
      break;
    case "PascalCase" /* PASCAL_CASE */:
    default:
      templateVars.name = templateVars.PascalCaseName;
      break;
  }
  const targetDir = path.join(
    basePath,
    Handlebars.compile(generator.path)(templateVars)
  );
  if (!fs.existsSync(targetDir))
    fs.mkdirSync(targetDir, { recursive: true });
  for (const [fileNameTpl, templatePath] of Object.entries(generator.files)) {
    const fileName = Handlebars.compile(fileNameTpl)(templateVars);
    const templateFile = path.resolve(process.cwd(), templatePath);
    if (!fs.existsSync(templateFile)) {
      console.warn(`Template file not found: ${templateFile}`);
      continue;
    }
    const templateContent = fs.readFileSync(templateFile, "utf-8");
    const template = Handlebars.compile(templateContent);
    const content = template(templateVars);
    const outputPath = path.join(targetDir, fileName);
    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`\u2714 Created: ${outputPath}`);
  }
};

// bin/init.ts
import fs2 from "fs-extra";
import path2 from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
var __dirname = dirname(fileURLToPath(import.meta.url));
function runInitCommand() {
  const targetDir = process.cwd();
  const sourceDir = path2.resolve(__dirname, "../init-assets");
  const configPath = path2.join(targetDir, "vite-create.config.json");
  const templatesPath = path2.join(targetDir, "templates");
  if (!fs2.existsSync(configPath)) {
    fs2.copySync(path2.join(sourceDir, "vite-create.config.json"), configPath);
    console.log("\u2705 vite-create.config.json created");
  } else {
    console.log("\u26A0\uFE0F vite-create.config.json already exists");
  }
  if (!fs2.existsSync(templatesPath)) {
    fs2.copySync(
      path2.join(sourceDir, "templates/component"),
      path2.join(templatesPath, "component")
    );
    console.log("\u2705 component folder created inside templates/");
  } else {
    console.log("\u26A0\uFE0F templates/ folder already exists");
  }
}

// bin/cli.ts
var program = new Command();
program.command("component <name>").description("Generate a new component").action(async (name) => {
  await runCreateCommand("component", name);
  console.log(`\u2705 Component ${name} created.`);
});
program.command("init").description("Initialize vite-create.config.json and template folder").action(() => {
  runInitCommand();
});
program.parse(process.argv);
