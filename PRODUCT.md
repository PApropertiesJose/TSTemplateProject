# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The author and their own team. Internal, repeat users who already know the domain
and the stack — they clone this scaffold to start a new frontend, not to learn one.
They arrive already knowing what they intend to build; the scaffold's job is to not
be in the way. There is no external or first-time audience for this repository
itself. Downstream projects built from it will have their own users, recorded in
their own PRODUCT.md.

## Product Purpose

A reusable frontend starter template. The scaffold **is** the deliverable — this
repository is not a product with an end-user interface, it is the baseline that
future products are cloned from. Success is that starting a new project from it
requires deleting nothing and configuring nothing that every project would need
anyway.

## Operating Context

- Lives at `TemplateProject/FrontEnd/`. The parent directory currently contains no
  sibling BackEnd; this repository covers the frontend only.
- Not currently a git repository, so there is no clone/fork mechanic in place yet —
  it is copied by hand.
- Day-to-day commands: `npm run dev` (Vite dev server, HMR, **no type-check**),
  `npm run build` (`tsc -b` then `vite build`), `npm run lint`, `npm run preview`.
- `npm run build` is the only type-checking gate. `npm run dev` will happily run
  code that does not compile.

## Capabilities and Constraints

**Stack (already fixed by the codebase):** React 19, TypeScript ~6.0, Vite 8,
ESLint 10 flat config. No router, state manager, styling library, data-fetching
library, or test framework is chosen — those are deliberately left to the project
being started, and are open decisions here.

**Backend:** this frontend is intended to talk to an existing API. Which API, its
base URL, auth model, and payload shapes are **not yet recorded** and must not be
assumed by future work.

**TypeScript project references.** `tsconfig.json` is a solution file with two
referenced projects in deliberately different environments: `tsconfig.app.json`
(`src`, DOM lib, `jsx: react-jsx`) and `tsconfig.node.json` (`vite.config.ts`, no
DOM, Node types, `module: nodenext`). A new root-level tooling file must be added
to `tsconfig.node.json`'s `include` or `tsc -b` silently skips it.

**Compiler flags that constrain how code may be written:**

- `erasableSyntaxOnly` — no `enum`, no constructor parameter properties, no
  `namespace`. Use union types or `as const` objects.
- `verbatimModuleSyntax` — type-only imports must be written `import type { … }`.
- `allowImportingTsExtensions` — local imports carry their extension (`./App.tsx`).
- `noUnusedLocals` / `noUnusedParameters` — unused bindings fail the build, not
  just the lint.

**Asset paths, and the choice matters:** `src/assets/*` is imported as a module and
fingerprinted by Vite; `public/*` is copied verbatim and referenced by absolute URL.
`public/icons.svg` is an SVG sprite consumed as `<use href="/icons.svg#id">` — the
id must exist in that file.

**Not enabled, deliberately:** the React Compiler, and type-aware lint rules
(`recommendedTypeChecked` + `eslint-plugin-react-x` / `react-dom`), whose upgrade
path is documented in README.md and requires wiring `parserOptions.project` to
both tsconfigs.

## Evidence on Hand

Nothing in this repository is product content. Everything currently rendered is
stock `npm create vite` template material and is expected to be deleted:

- `src/App.tsx` — Vite/React placeholder: counter button, "Get started" heading,
  outbound links to vite.dev, react.dev, GitHub, Discord, X, Bluesky.
- `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`,
  `public/icons.svg`, `public/favicon.svg` — Vite and React marks, not this
  project's identity.
- `index.html` `<title>` is the literal string `frontend`.

There is **no** product name, logo, brand asset, real copy, customer, testimonial,
metric, or pricing fact in this repository. Future work must not invent any of
them.

## Product Principles

1. **The scaffold is the deliverable.** Anything added here is carried into every
   project cloned from it, so the bar for inclusion is "every future project needs
   this", not "this project might".
2. **Stay unopinionated where the choice is project-specific.** Routing, state,
   styling, and data fetching are decisions the downstream project owns; pre-making
   them here costs more to remove than to add.
3. **The build is the gate.** `npm run build` (`tsc -b`) must pass clean. `npm run
   dev` does not type-check, so a change is not verified until the build runs.
4. **Constraints are enforced by tooling, not convention.** The strict compiler
   flags above are the mechanism; a rule that only lives in a document does not
   survive being cloned.
5. **Placeholder content stays obviously placeholder.** Template material must
   never be mistakable for product truth in a project started from this one.
