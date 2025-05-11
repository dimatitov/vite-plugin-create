# `vite-plugin-create`

[![npm version](https://img.shields.io/npm/v/vite-plugin-create.svg)](https://www.npmjs.com/package/vite-plugin-create)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`vite-plugin-create` is a Vite plugin and CLI tool for quickly generating components, stores, pages, and other entities. The plugin helps speed up development by utilizing customizable templates.

---

## ✨ Features

- Generate components, pages, and other entities using customizable templates.
- Easily add new templates and commands.
- Support for multiple file naming styles (PascalCase, camelCase, kebabCase).
- Automatic creation of configuration and templates using the `vite-create init` command.
- The plugin can sync templates with configuration files like `tsconfig.json`.

---

## 📦 Installation

To install the plugin, run the following command:

```bash
npm install vite-plugin-create --save-dev
```

or

```bash
yarn add vite-plugin-create --dev
```

---

## 📑 Plugin API

### Available Commands:

- **`npx vite-create init`** — initializes configuration and templates.
- **`npx vite-create component <name>`** — creates a component with the specified name.

---

## 💡 Detailed Command Descriptions

### 1. `npx vite-create init`

This command initializes the project by creating:

- The default `vite-create.config.json` configuration file if it doesn't exist.
- The `templates/` folder containing templates for generating components, styles, and tests.

#### Template Structure:

In the `templates/` folder, a folder is created for each type of entity. For example, for components, the structure is as follows:

- **templates/component/**
  - `component.tsx`
  - `style.scss`
  - `index.ts`
  - `test.tsx`

These files serve as templates that will be used for generating new components. All files use placeholders (e.g., `{{name}}`), which will be replaced with the component's name during generation.

### 2. `npx vite-create component <name>`

This command generates a new component with the specified name:

- Creates a file structure in the folder specified in the config, with the files you specify.
- The component template includes props, basic structure, and imports for styles, as described in the `templates/component/component.tsx` file.

#### Example Component Created:

After running the command **`npx vite-create component Button`**, the following structure is created:

- **components/Button**
  - `Button.tsx`
  - `style.scss`
  - `index.ts`

---

## 🔧 How to Work with the Plugin

### Creating and Configuring Templates

1. Create a `templates/` folder to store templates for each entity type (e.g., components, pages, etc.).
2. Run the command `npx vite-create init` to initialize the templates.
3. Configure the templates in the `vite-create.config.json` file, specifying which files and templates should be used.

#### Example Template Structure:

```
templates/
  component/
    component.tsx
    style.scss
    index.ts
    test.ts
```

#### Example Component Template:

To correctly substitute the name, use `{{name}}` in the templates.

```typescript
import styles from './{{name}}.module.scss';

export interface {{name}}Props {
  className?: string;
}

export const {{name}}: React.FC<{{name}}Props> = ({ className }) => {
  return (
    <div className={styles.root}>
      {{name}} component
    </div>
  );
};
```

### Example Template Configuration:

```json
{
  "defaultPath": "src",
  "fileNameStyle": "pascalCase",
  "generators": {
    "component": {
      "path": "components/{{name}}",
      "files": {
        "{{name}}.tsx": "templates/component/component.tsx",
        "index.ts": "templates/component/index.ts",
        "{{name}}.module.scss": "templates/component/style.scss",
        "{{name}}.test.tsx": "templates/component/test.tsx"
      }
    }
  }
}
```

- **`defaultPath`** — the path where files will be created (e.g., `src` or `components`).
- **`fileNameStyle`** — the file naming style (`pascalCase`, `camelCase`, `kebabCase`, or `original`). Defaults to `pascalCase`.
- **`generators`** — configuration for generating entities such as components.
- **`component`** — the generator for creating a component, including the path and files that will be created from templates.

---

## 📍 Example Component Creation

After initializing and configuring the templates, you can create a component by running the following command:

```bash
npx vite-create component Button
```

This will generate the following structure:

```
components/
  Button/
    Button.tsx
    style.scss
    index.ts
```

---

## 🛣 Roadmap

### 1. Generating Other Entities

- Commands for generating other entities like `vite-create page <name>`, `vite-create store <name>`, will be added in future versions.

### 2. Adding New Templates and Entities

- Easily add new commands and templates to extend the plugin's functionality.

---

## 🧩 Dependencies

This plugin uses the following libraries:

- **`commander`** — for command-line parsing and creating the CLI interface.
- **`fs-extra`** — for convenient file system operations.
- **`handlebars`** — for template generation.

### Development:

- **`@types/commander`** — type definitions for `commander`.
- **`@types/fs-extra`** — type definitions for `fs-extra`.
- **`@types/node`** — type definitions for Node.js.
- **`tsup`** — for bundling the project.
- **`typescript`** — for TypeScript development.
- **`vite`** — for integration with Vite.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
