import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { toPascalCase, toCamelCase, toKebabCase } from "./helpers/nameHelpers";
import { FILE_NAME_STYLE } from "./constants";

export const runCreateCommand = async (
  type: string,
  name: string,
  configPath = "vite-create.config.json"
) => {
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
    ...(config.templateVars || {}),
  };

  const nameStyle: FILE_NAME_STYLE = templateVars.fileNameStyle || "PascalCase";

  switch (nameStyle) {
    case FILE_NAME_STYLE.CAMEL_CASE:
      templateVars.name = templateVars.camelCaseName;
      break;
    case FILE_NAME_STYLE.KEBAB_CASE:
      templateVars.name = templateVars.kebabCaseName;
      break;
    case FILE_NAME_STYLE.ORIGINAL:
      templateVars.name = name;
      break;
    case FILE_NAME_STYLE.PASCAL_CASE:
    default:
      templateVars.name = templateVars.PascalCaseName;
      break;
  }

  const targetDir = path.join(
    basePath,
    Handlebars.compile(generator.path)(templateVars)
  );

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const [fileNameTpl, templatePath] of Object.entries(generator.files)) {
    const fileName = Handlebars.compile(fileNameTpl)(templateVars);
    const templateFile = path.resolve(process.cwd(), templatePath as string);
    if (!fs.existsSync(templateFile)) {
      console.warn(`Template file not found: ${templateFile}`);
      continue;
    }

    const templateContent = fs.readFileSync(templateFile, "utf-8");

    const template = Handlebars.compile(templateContent);

    const content = template(templateVars);

    const outputPath = path.join(targetDir, fileName);
    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`✔ Created: ${outputPath}`);
  }
};
