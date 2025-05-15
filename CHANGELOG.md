# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2024-05-13

### Added

- CI/CD
- "files": ["dist"] in package

## [0.3.2] - 2024-05-13

### FIX

- remove dist in githib

## [1.0.0] - 2025-05-15

### Added

- Support for custom generators allowing users to define their own templates and generation rules via config.
- Ability to choose default template format: .tsx (TypeScript) or .jsx (JavaScript) during initialization.
- Directory-based templates support, e.g., separate folders for pages/, widgets/, shared/ templates.
- Per-generator file naming style configuration (PascalCase, camelCase, kebab-case, original).
- Improved init command to generate config and templates based on user's choices (TS/JS, style, etc.).
- Enhanced CLI for custom entity generation with dynamic template handling.
- Planned roadmap addition: minimal GUI for visual config editing and online docs with playground.
