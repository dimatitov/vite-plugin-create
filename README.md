# `vite-plugin-create` - Vite plugin to scaffold components, stores, and pages

[![npm version](https://img.shields.io/npm/v/vite-plugin-create.svg)](https://www.npmjs.com/package/vite-plugin-create)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`vite-plugin-create` is a Vite plugin and CLI tool for quickly generating components, stores, pages, and other entities. The plugin helps speed up development by utilizing customizable templates.

## Why vite-plugin-create?

Tired of repetitive boilerplate? `vite-plugin-create` is a powerful yet simple Vite plugin and CLI tool designed to save you hours by automating component, page, store, and custom entity generation — fully customizable and scalable for any project size.

---

## ✨ Features

- Highly flexible and extensible — create your own generators and templates tailored to your workflow.
- Designed for rapid development and zero-copy-paste productivity boost.
- Generate components, pages, stores, or any custom entity using templates.
- Create your own generators in `vite-create.config.json`.
- Supports file naming styles: `PascalCase`, `camelCase`, `kebab-case`, `original`.
- Choose between TypeScript or JavaScript on `init`.
- Automatically creates configuration and templates via `vite-create init`.
- Generate single file entities (e.g., hooks, utils) by setting a flat "path" in config — no folder creation required.

---

## 📦 Installation

```bash
npm install vite-plugin-create --save-dev
```

or

```bash
yarn add vite-plugin-create --dev
```

---

## 🔌 Plugin Setup

After installing, import and add the plugin to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginCreate from "vite-plugin-create";

export default defineConfig({
  plugins: [react(), vitePluginCreate()],
});
```

---

## 🚀 Usage

### 1. `npx vite-create init`

Initializes configuration and templates.
You’ll be asked:

- Do you want to use TypeScript?

Based on your choice, the correct config and template files will be added to your project.

### 2. `npx vite-create <generator> <name>`

Creates the entity with the given name using the matching generator in config.

Example:

```bash
npx vite-create component Button
npx vite-create page Home
npx vite-create custom myThing
```

---

## 📁 Folder Structure After Init

```
templates/
  component/
    component.tsx / .jsx
    style.scss
    index.ts / .js
    test.tsx / .jsx
  page/
    page.tsx / .jsx
    index.ts / .js
    style.scss
  store/
    zustand.ts / .js
vite-create.config.json
```

---

## 🛠 Configuration (vite-create.config.json)

Example config:

```json
{
  "defaultPath": "src",
  "templateVars": {
    "useTypeScript": true,
    "fileNameStyle": "pascalCase"
  },
  "generators": {
    "component": {
      "path": "components/{{name}}",
      "files": {
        "{{name}}.tsx": "templates/component/component.tsx",
        "{{name}}.module.scss": "templates/component/style.scss",
        "index.ts": "templates/component/index.ts"
      }
    },
    "page": {
      "path": "pages/{{name}}",
      "files": {
        "{{name}}.tsx": "templates/page/page.tsx",
        "{{name}}.module.scss": "templates/page/style.scss",
        "index.ts": "templates/page/index.ts"
      }
    },
    "store": {
      "path": "stores/{{name}}",
      "fileNameStyle": "camelCase",
      "files": {
        "{{name}}.ts": "templates/store/zustand.ts"
      }
    }
  }
}
```

### Custom basePath per generator

If your project structure differs from the default (e.g., you keep components inside `UI/components`, pages under `UI/pages`, and hooks in the root), you can override the default base path per generator like so:

```json
{
  "defaultPath": "src",
  "generators": {
    "component": {
      "basePath": "src/UI",
      "path": "components/{{name}}",
      "files": {
        "{{name}}.tsx": "templates/component/component.tsx",
        "index.ts": "templates/component/index.ts",
        "{{name}}.module.scss": "templates/component/style.scss"
      }
    },
    "page": {
      "basePath": "src/UI",
      "path": "pages/{{name}}",
      "files": {
        "{{name}}.tsx": "templates/page/page.tsx",
        "{{name}}.module.scss": "templates/page/style.scss",
        "index.ts": "templates/page/index.ts"
      }
    },
    "hook": {
      "path": "hooks",
      "fileNameStyle": "camelCase",
      "files": {
        "{{name}}.ts": "templates/hook/useHook.ts"
      }
    }
  }
}
```

This will result in:

```
src/UI/components/Button/
src/UI/pages/Home/
src/hooks/useAuth.ts
```

Each generator can fully control its output location.

- Add any custom generator by extending the `generators` field.
- Template files can use Handlebars placeholders: `{{name}}`, `{{PascalCaseName}}`, etc.

```json
// Example of single file hook generator
"hook": {
  "path": "hooks", // generates in src/hooks without folder
  "fileNameStyle": "camelCase",
  "files": {
    "{{name}}.ts": "templates/hook/useHook.ts"
  }
}
```

Then run:

```bash
npx vite-create hook useAuth
```

This will generate:

```
src/hooks/useAuth.ts
```

---

## 🧪 Custom Generators

You can define and use any generator by name:

```json
"generators": {
  "custom": {
    "path": "customs/{{name}}",
    "files": {
      "{{name}}.ts": "templates/custom/index.ts"
    }
  }
}
```

Then run:

```bash
npx vite-create custom MyUtility
```

```markdown
You can create generators with **any** name you want — not just "custom".  
Simply add your generator config with a unique name in `vite-create.config.json` and create matching templates.  
Then run `npx vite-create your-generator-name <entityName>`.

---

## 🛣 Roadmap

- ✅ Custom generators
- ✅ TypeScript / JavaScript toggle via init prompt
- ✅ Naming styles per generator
- ✅ File extensions mapped automatically (.ts/.tsx/.js/.jsx)
- 📁 Directory-based template support
- 🧰 Future: simple GUI configurator (in CLI or browser)
- 🌐 Future: official website with full documentation and interactive playground

---

## 🔧 Dependencies

- `commander`
- `fs-extra`
- `handlebars`
- `inquirer`
- `typescript`

---

## Contributing & Community

`vite-plugin-create` is 100% open source and thrives thanks to an active community. Your ideas, feedback, and pull requests are always welcome — let’s build the best developer experience together!

## 📜 License

MIT — [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
```

## Keywords

Vite plugin, component generator, CLI scaffolding tool, template generator, TypeScript, React, vite-plugin-create
