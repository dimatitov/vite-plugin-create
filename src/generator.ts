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
  console.log(`Creating type ${type}...`);
  console.log(`Creating name ${name}...`);
  console.log(`Creating configPath ${configPath}...`);
  const configFile = path.resolve(process.cwd(), configPath);
  if (!fs.existsSync(configFile)) {
    console.error(`Config file not found: ${configFile}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const generator = config.generators?.[type];
  const useTS = config.templateVars.useTypeScript !== false;

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

  const generatorStyle: FILE_NAME_STYLE =
    generator.fileNameStyle ||
    config.fileNameStyle ||
    FILE_NAME_STYLE.PASCAL_CASE;

  switch (generatorStyle) {
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

  const mapExtension = (filePath: string) => {
    if (useTS) return filePath;
    return filePath
      .replace(/\.test\.tsx$/, ".test.jsx")
      .replace(/\.tsx$/, ".jsx")
      .replace(/\.ts$/, ".js");
  };

  for (const [fileNameTpl, templatePath] of Object.entries(generator.files)) {
    const fileName = Handlebars.compile(mapExtension(fileNameTpl))(
      templateVars
    );

    const baseTemplatePath = path.resolve(
      process.cwd(),
      templatePath as string
    );
    const ext = path.extname(baseTemplatePath);
    const baseWithoutExt = baseTemplatePath.replace(ext, "");

    const preferredExt = useTS
      ? ext // .tsx / .ts
      : ext === ".tsx"
      ? ".jsx"
      : ext === ".ts"
      ? ".js"
      : ext;

    const resolvedTemplatePath = `${baseWithoutExt}${preferredExt}`;

    const fallbackPath = baseTemplatePath;

    const templateFile = fs.existsSync(resolvedTemplatePath)
      ? resolvedTemplatePath
      : fallbackPath;

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
