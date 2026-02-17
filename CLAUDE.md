# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Opinionated, strict ESLint flat-config package (`@patrikvalkovic/eslint-config`) published to npm. Includes formatting rules (no Prettier). TypeScript-focused, targets ESLint 9+ flat config.

## Commands

- **Install:** `npm ci`
- **Build:** `npm run build` (runs `rimraf ./build && tsc --build ./tsconfig.json`)
- **Type check:** `npm run type-check`
- **Lint:** `npm run lint`
- **Test:** `npm run test` (currently a no-op)

CI runs: type-check → build → lint → test. The project must build before linting because `eslint.config.js` imports from `./build/typescript`.

## Architecture

Each source file in `src/` exports a factory function that takes a tsconfig path (or a config object) and optional overrides, returning a `TSESLint.FlatConfig.ConfigArray`.

**Config hierarchy (each extends the previous):**
- `javascript.ts` — base rules: eslint recommended + @stylistic + import + no-only-tests + unused-imports
- `typescript.ts` — calls `javascript()`, adds typescript-eslint strict/stylistic + TS-specific @stylistic rules
- `react.ts` — calls `typescript()`, adds react plugin (flat "all") + react-hooks + JSX @stylistic rules
- `complexity.ts` — standalone complexity/size-limit warnings (not chained into the others)

**Key patterns:**
- Configs use `deepMerge` from `@typescript-eslint/utils/eslint-utils` to merge user-provided overrides
- When the first argument is a string, it's treated as a tsconfig path and auto-configures parser/resolver settings
- `unused-imports/no-unused-imports` is only enabled when `--fix` flag is present (checked via `process.argv`)
- All files use CommonJS-style `export = config` syntax
- `types.ts` defines the shared `Config` and `ConfigOrTsPath` types

## Publishing

Push to `master` triggers automatic npm publish via GitHub Actions. Version is in `package.json`.
