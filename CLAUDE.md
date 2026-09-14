# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (type-check, all projects) then vite build -> dist/
npm run lint     # eslint .
npm run preview  # serve the built dist/ locally
```

No test framework is installed and there is no test script. `npm run build` is the only
type-checking gate — `npm run dev` does **not** type-check, so run the build (or `npx tsc -b`)
before claiming a change compiles.

`npx tsc -b` is incremental via `node_modules/.tmp/*.tsbuildinfo`; use `npx tsc -b --force` if
results look stale.

## Architecture

React 19 + TypeScript on Vite, with Mantine 9 (UI + theme), Zustand 5 (state) and TanStack
Router 1 (routing). Entry chain: `index.html` → `src/main.tsx` (root + `StrictMode` +
`MantineProvider`) → `src/App.tsx` (`RouterProvider`) → `src/router.tsx`.

The directory sits under `TemplateProject/FrontEnd/`; this project covers only the frontend.
It is not currently a git repository.

### Routing

`src/router.tsx` holds the whole route tree, defined **code-based** (`createRoute`), not
file-based — there is no generated `routeTree.gen.ts` and no router Vite plugin. Add a route by
declaring it there and listing it in the `addChildren` call.

The tree is `rootRoute` → `loginRoute` (`/login`) and a pathless `authenticatedRoute`
(`id: 'authenticated'`, renders `AppLayout`) whose children are `/`, `/dashboard`, `/users`,
`/settings`. The auth guard is `authenticatedRoute.beforeLoad`, which reads `context.auth` and
throws `redirect({ to: '/login', search: { redirect: location.href } })`.

Router context is typed as `RouterContext` and supplied by `RouterProvider` in `src/App.tsx`,
which subscribes to the auth store — that subscription is what keeps `beforeLoad` from reading
a stale session. `createRouter` seeds `context: { auth: undefined! }` as a placeholder; do not
read it before `RouterProvider` supplies the real value.

`to` is a typed union of known paths, so a free-form string (the `redirect` search param) must
go through `redirect({ href })` or `router.history.replace()` instead — see `LoginPage`.

### State

Zustand stores live in `src/stores/`, both wrapped in `persist` with `partialize` so only
durable fields hit `localStorage`:

- `authStore` (key `app-auth`) — session plus `signIn`/`signOut`. `requestSession` is a
  **placeholder** with no backend behind it; replace its body, keep the store's shape.
- `uiStore` (key `app-ui`) — `navCollapsed` persists, `mobileNavOpen` deliberately does not.

Subscribe with a selector (`useAuthStore((s) => s.user)`) everywhere except `src/App.tsx`,
which needs the whole object for router context.

### Theme

`src/theme.ts` is the only place design tokens are defined (`createTheme`: `brand` color ramp,
`primaryColor`, `defaultRadius`, fonts, per-component `defaultProps`). Light/dark come from
Mantine's own CSS variables — read `var(--mantine-color-*)` rather than branching on the color
scheme in a component.

`MantineProvider` runs with `defaultColorScheme="auto"`; the inline script in `index.html`
paints `data-mantine-color-scheme` before first render to avoid a flash, and its
`mantine-color-scheme-value` key must stay in sync with Mantine's localStorage manager. Use
`useMantineColorScheme` to set the value and `useComputedColorScheme` to read what is actually
rendered (`auto` resolves through it).

`postcss.config.cjs` wires `postcss-preset-mantine` and the `$mantine-breakpoint-*` variables;
it is required for Mantine's mixins in any CSS module.

### TypeScript project references

`tsconfig.json` is a solution file with no sources of its own; it references two projects with
deliberately different environments:

- `tsconfig.app.json` — `include: ["src"]`, DOM lib, `vite/client` types, `jsx: react-jsx`
- `tsconfig.node.json` — `include: ["vite.config.ts"]`, no DOM, Node types, `module: nodenext`

A new root-level tooling file (e.g. `vitest.config.ts`, `tailwind.config.ts`) must be added to
`tsconfig.node.json`'s `include`, or `tsc -b` silently skips it.

Compiler flags that constrain how code may be written:

- `erasableSyntaxOnly` — no `enum`, no constructor parameter properties, no `namespace`. Use
  union types or `as const` objects instead.
- `verbatimModuleSyntax` — type-only imports must be written `import type { X } from '...'`.
- `allowImportingTsExtensions` — local imports carry their extension (`./App.tsx`), as in
  `src/main.tsx`. Follow that convention.
- `noUnusedLocals` / `noUnusedParameters` — unused bindings fail the build, not just the lint.

### Assets

Two distinct paths, and the choice matters:

- `src/assets/*` — imported as a module (`import heroImg from './assets/hero.png'`); Vite
  fingerprints and inlines/emits it.
- `public/*` — copied verbatim, referenced by absolute URL at runtime. `public/icons.svg` is an
  SVG sprite consumed as `<use href="/icons.svg#some-icon">`; the id must exist in that file.

### Lint

Flat config (`eslint.config.js`) applying `js.configs.recommended`, `tseslint.configs.recommended`,
`react-hooks` and `react-refresh/vite` — scoped to `**/*.{ts,tsx}` only, with `dist` ignored. Rules
are *not* type-aware; `README.md` documents the upgrade path to
`tseslint.configs.recommendedTypeChecked` plus `eslint-plugin-react-x` / `eslint-plugin-react-dom`,
which requires wiring `parserOptions.project` to both tsconfigs.

The React Compiler is intentionally not enabled.
