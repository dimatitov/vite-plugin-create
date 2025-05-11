# vite-plugin-create

`vite-plugin-create` — это Vite плагин и CLI инструмент для быстрого создания компонентов, хранилищ, страниц и других сущностей. Плагин позволяет настроить шаблоны для быстрого создания повторно используемого кода, что ускоряет процесс разработки.

## Установка

Чтобы установить плагин, выполните команду:

```bash
npm install vite-plugin-create --save-dev
```

## API плагина

### Доступные команды:

- **`npx vite-create init`** — инициализация конфигурации и шаблонов.
- **`npx vite-create component <name>`** — создание компонента с указанным именем.

## Более подробное описание команд

### 1. `npx vite-create init`

Команда инициализирует проект:

- Создает файл с дефолтной конфигурацией `vite-create.config.json`, если его нет.
- Создает папку `templates/`, в которую добавляются шаблоны для создания компонентов, стилей и тестов.

#### Структура шаблонов:

В папке `templates/` создается папка для каждого типа сущности. Например, для компонента создается структура:

- **templates/component/**
  - `component.tsx`
  - `style.scss`
  - `index.ts`
  - `test.tsx`

Эти файлы служат шаблонами, которые будут использоваться для генерации новых компонентов. Все файлы используют плейсхолдеры (например, `{{name}}`), которые будут заменяться на имя компонента во время генерации.

### 2. `npx vite-create component <name>`

Команда генерирует новый компонент с заданным именем:

- Создает структуру файлов в папке, указанной в конфиге, с файлами, которые вы укажете в конфиге.
- Шаблон компонента включает пропсы, базовую структуру и импорт стилей, как описано в файле `templates/component/component.tsx`.

#### Пример создаваемого компонента:

После выполнения команды **`npx vite-create component Button`** будет создана структура:

- **components/Button**
  - `Button.tsx`
  - `style.scss`
  - `index.ts`

Пример кода для `Button.tsx`:

```typescript
import { FC } from "react";
import "./style.scss";

interface ButtonProps {
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className }) => {
  return <div className="root">Button component</div>;
};
```

Пример стилей для компонента в `style.scss`:

```scss
.root {
  display: flex;
}
```

Пример индексного файла для компонента в `index.ts`:

```typescript
export { Button } from "./Button";
```

## Как работать с плагином

### Создание и составление шаблонов

Для настройки шаблонов создайте папку `templates/` и вызовите команду `npx vite-create init`. В папке `templates` создайте папки для каждого шаблона (например, `component`, `page`), в которых будут храниться соответствующие файлы-шаблоны.

#### Пример структуры шаблонов:

```
templates/
  component/
    component.tsx
    style.scss
    index.ts
    test.ts
```

#### Пример структуры шаблона компонента:

Для корректного подставления нейминга используйте `{{name}}` в шаблонах.

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

### Пример конфигурации шаблонов:

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

- **`defaultPath`** — путь, где будут создаваться файлы (например, `src` или `components`).
- **`fileNameStyle`** — стиль имен файлов (`pascalCase`, `camelCase`, `kebabCase` или `original`). По дефолту `pascalCase`.
- **`generators`** — конфигурация для генерации сущностей, таких как компоненты.
- **`component`** — описание генератора для компонента, включая путь и список файлов, которые будут созданы из шаблонов.

### Пример создания компонента

У нас есть директория `templates/component/` с файлами:

- `component.tsx`
- `index.ts`
- `style.scss`

Мы вызываем команду:

```bash
npx vite-create component Button
```

Результатом будет создание структуры:

```
components/
  Button/
    Button.tsx
    style.scss
    index.ts
```

## Роадмап

### 1. Генерация других сущностей

- Команды для создания других сущностей, таких как `vite-create page <name>`, `vite-create store <name>`, будут добавлены в следующих версиях.

### 2. Добавление новых шаблонов и сущностей

- Легко добавляйте новые команды и шаблоны, расширяя функционал плагина.

## Используемые зависимости

- **`commander`** — для обработки командной строки и создания CLI интерфейса.
- **`fs-extra`** — для удобной работы с файловой системой (копирование, удаление и т.д.).
- **`handlebars`** — для генерации шаблонов с динамическими значениями.

### Разработка:

- **`@types/commander`** — типы для `commander`.
- **`@types/fs-extra`** — типы для `fs-extra`.
- **`@types/node`** — типы для Node.js.
- **`tsup`** — для сборки проекта.
- **`typescript`** — для разработки с TypeScript.
- **`vite`** — для интеграции с Vite.
