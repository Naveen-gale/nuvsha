# Master Test Application (Phase 1–19 Complete Verification)

The **Nuvsha Master Test Application** (`nuvsha-master-test`) is the central integration test suite and showcase dashboard designed to verify all features implemented across Phase 1 through Phase 19.

---

## Table of Contents

1. [Overview](#overview)
2. [How to Run](#how-to-run)
3. [Project Architecture](#project-architecture)
4. [Phase Feature Verification Guide](#phase-feature-verification-guide)
   - [Phase 1: Core `.nuv` + HTML + Reactivity](#phase-1-core-nuv--html--reactivity)
   - [Phase 2: Expressions & Event Context](#phase-2-expressions--event-context)
   - [Phase 3: Form Two-Way Binding (`bind={}`)](#phase-3-form-two-way-binding-bind)
   - [Phase 4: Reactive Array Loops (`{for}`)](#phase-4-reactive-array-loops-for)
   - [Phase 5: Component Props & Parent-Child Sync](#phase-5-component-props--parent-child-sync)
   - [Phase 6: Conditions (`{if}`, `{else if}`, `{else}`)](#phase-6-conditions-if-else-if-else)
   - [Phase 7: Async Blocks (`{async}`, `{loading}`, `{error}`)](#phase-7-async-blocks-async-loading-error)
   - [Phase 8: Real Application Architecture](#phase-8-real-application-architecture)
   - [Phase 9: Tailwind CSS Integration](#phase-9-tailwind-css-integration)
   - [Phase 10: Client-Side SPA Routing](#phase-10-client-side-spa-routing)
   - [Phase 11: API / Data Architecture (`data()`)](#phase-11-api--data-architecture-data)
   - [Phase 13: Compiler Error Diagnostics & DX](#phase-13-compiler-error-diagnostics--dx)
   - [Phase 14: Performance & Production Bundling](#phase-14-performance--production-bundling)
   - [Phase 15: Standard Project Structure](#phase-15-standard-project-structure)
   - [Phase 16: Advanced Component System (`{children}`, `$event`)](#phase-16-advanced-component-system-children-event)
   - [Phase 18: Language Improvements & Form Primitives](#phase-18-language-improvements--form-primitives)
   - [Phase 19: Integrated Master Dashboard](#phase-19-integrated-master-dashboard)
5. [Automated Testing & Production Build](#automated-testing--production-build)
6. [Known Limitations](#known-limitations)

---

## Overview

Unlike standard synthetic tests, the Master Test application is a full, real-world dashboard application built entirely in Nuvsha. It exercises:
- **Zero-VDOM Reactivity Engine**: Direct DOM text and attribute updates without diffing.
- **Compiler Pipeline**: Transforms `.nuv` Single File Components into modern ES modules.
- **Client-Side Router**: Intercepts same-origin navigation, history changes, and 404 routes.
- **Built-in Primitives**: Remote data fetching (`data()`) and form lifecycle (`form()`).
- **Tailwind CSS v4**: Seamless stylesheet compiling and class generation.

---

## How to Run

### Development Mode
```bash
# From workspace root
npm run master-test:dev

# Or directly in nuvsha-master-test
cd nuvsha-master-test
npm run dev
```

The application will start on `http://localhost:5173/`.

### Run All Automated Tests
```bash
npm test
```

### Production Build
```bash
npm run master-test:build
```

---

## Project Architecture

The Master Test application adheres strictly to the Phase 15 project architecture:

```
nuvsha-master-test/
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite + Nuvsha + Tailwind plugin config
├── index.html                 # Single page application HTML shell
└── src/
    ├── main.js                # App entrypoint mounting App.nuv to DOM
    ├── assets/
    │   └── main.css           # Tailwind v4 entry (@import "tailwindcss"; @source "../**/*.nuv")
    ├── App.nuv                # Root application shell with Navbar, Sidebar, and Router
    ├── router/
    │   └── routes.js          # SPA route definitions mapping paths to page components
    ├── data/
    │   └── testData.js        # Mock data stores, API simulators, and telemetry helpers
    ├── components/
    │   ├── Navbar.nuv         # Top navigation header
    │   ├── Sidebar.nuv        # Side menu with navigation to all test suites
    │   ├── Card.nuv           # Reusable card container with {children} slot
    │   ├── Button.nuv         # Reusable interactive button with color variants
    │   ├── Badge.nuv          # Reusable status indicator badge
    │   ├── StatCard.nuv       # Metric display card
    │   └── TestSection.nuv    # Standardized test case card container
    └── pages/
        ├── Home.nuv           # Master Dashboard & 17-Phase Status Matrix
        ├── Language.nuv       # Tests Phase 1, 2, 18 language & expressions
        ├── Reactivity.nuv     # Tests Phase 1, 4, 6 reactivity, loops & conditionals
        ├── Components.nuv     # Tests Phase 5, 16 props & slot projection
        ├── Forms.nuv          # Tests Phase 3, 18 two-way bindings & form primitive
        ├── Routing.nuv        # Tests Phase 10 SPA router navigation & history
        ├── Data.nuv           # Tests Phase 11 data() API & network states
        ├── Async.nuv          # Tests Phase 7 template {async} blocks
        ├── Styling.nuv        # Tests Phase 9 Tailwind CSS v4 styling
        ├── Errors.nuv         # Tests Phase 13 compiler diagnostics & error codes
        ├── Performance.nuv    # Tests Phase 14 high-frequency state updates
        └── NotFound.nuv       # Fallback 404 wildcard route component
```

---

## Phase Feature Verification Guide

### Phase 1: Core `.nuv` + HTML + Reactivity
- **Feature**: Basic HTML elements, nested tags, attributes, and reactive variables.
- **Syntax**:
  ```html
  <script>
    appName = "Nuvsha"
    count = 0
  </script>
  <div>
    <h1>{appName}</h1>
    <button onclick="count++">Count: {count}</button>
  </div>
  ```
- **Verification**: Variables declared in `<script>` automatically generate scoped reactive variables with `$watch` and `$update`. Clicking updates the DOM directly.

### Phase 2: Expressions & Event Context
- **Feature**: Evaluates complex expressions, arithmetic, methods, and provides the `event` object in listeners.
- **Syntax**:
  ```html
  <p>{count + 10}</p>
  <p>{name.toUpperCase()}</p>
  <input oninput="name = event.target.value">
  ```
- **Verification**: Expressions re-evaluate on `$update()` and `event.target.value` accurately captures DOM input.

### Phase 3: Form Two-Way Binding (`bind={}`)
- **Feature**: Two-way synchronization on `<input>`, `<checkbox>`, and `<select>`.
- **Syntax**:
  ```html
  <input type="text" bind={username}>
  <input type="checkbox" bind={agreed}>
  <select bind={theme}>
    <option value="dark">Dark</option>
    <option value="light">Light</option>
  </select>
  ```
- **Verification**: Typing into inputs updates the underlying script variable immediately; updating the variable updates input elements.

### Phase 4: Reactive Array Loops (`{for}`)
- **Feature**: Array iteration with automated mutation detection via JSON snapshots.
- **Syntax**:
  ```html
  <ul>
    {for item of items}
      <li>{item}</li>
    {/for}
  </ul>
  ```
- **Verification**: Calling `items.push(...)` or `items.splice(...)` updates the rendered list items automatically.

### Phase 5: Component Props & Parent-Child Sync
- **Feature**: Passing static and dynamic expressions as props down to child components.
- **Syntax**:
  ```html
  <StatCard title="Total Users" value={users.length} />
  ```
- **Verification**: Updating `users.length` in the parent triggers re-rendering of the child's dynamic prop.

### Phase 6: Conditions (`{if}`, `{else if}`, `{else}`)
- **Feature**: Dynamic conditional branch switching.
- **Syntax**:
  ```html
  {if status === 'gold'}
    <p>Gold Member</p>
  {else if status === 'silver'}
    <p>Silver Member</p>
  {else}
    <p>Bronze Member</p>
  {/if}
  ```
- **Verification**: No TDZ/shadowing collisions; switching condition cleanly replaces DOM nodes before anchor comments.

### Phase 7: Async Blocks (`{async}`, `{loading}`, `{error}`)
- **Feature**: Built-in template promise resolution.
- **Syntax**:
  ```html
  {async report = fetchReport()}
    <p>Report: {report.title}</p>
  {loading}
    <p>Loading report...</p>
  {error}
    <p>Failed to load report.</p>
  {/async}
  ```
- **Verification**: Displays loading fallback while promise is pending, success content upon resolution, and error content on rejection.

### Phase 8: Real Application Architecture
- **Feature**: Modular separation of UI components, pages, routes, and data helpers across ES modules.
- **Verification**: Seamless imports between `.nuv` components and `.js` modules.

### Phase 9: Tailwind CSS Integration
- **Feature**: Full styling with Tailwind CSS v4.
- **Syntax**:
  ```html
  <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-white">Styled Card</h2>
  </div>
  ```
- **Verification**: `@tailwindcss/vite` compiles classes directly from `.nuv` source files.

### Phase 10: Client-Side SPA Routing
- **Feature**: SPA routing using `<Router routes={routes} />` and `navigate(path)`.
- **Syntax**:
  ```javascript
  import { Router } from "nuvsha";
  import { routes } from "./router/routes.js";
  ```
- **Verification**: Link click interception prevents full page reloads, history pushState updates URL, and unknown paths trigger the wildcard `*` route.

### Phase 11: API / Data Architecture (`data()`)
- **Feature**: Reactive data store primitive for async network requests.
- **Syntax**:
  ```javascript
  usersStore = data(() => fetchUsers())
  // usersStore.data, usersStore.loading, usersStore.error, usersStore.reload()
  ```
- **Verification**: Automatic loading state, error catching, and manual reload without throwing unhandled exceptions.

### Phase 13: Compiler Error Diagnostics & DX
- **Feature**: Error code taxonomy (NV1001–NV1009) with source code frames and helpful hints.
- **Verification**: Lexer and Parser emit structured `NuvshaError` instances with line numbers, columns, and code frames.

### Phase 14: Performance & Production Bundling
- **Feature**: Zero-overhead DOM updates and Vite production bundle optimization.
- **Verification**: High-frequency benchmark executes 2,000+ updates with sub-millisecond per-update latency; `vite build` emits clean, minified production assets.

### Phase 15: Standard Project Structure
- **Feature**: Standardized folder layout (`src/App.nuv`, `src/pages/`, `src/components/`, `src/data/`).
- **Verification**: Consistent, beginner-friendly structure across the entire codebase.

### Phase 16: Advanced Component System (`{children}`, `$event`)
- **Feature**: Slot fragment projection with `{children}`, component event handlers receiving `$event`, and default prop fallbacks.
- **Syntax**:
  ```html
  <!-- Child Component (Card.nuv) -->
  <script>
    title = "Default Title"
  </script>
  <div class="card">
    <h3>{title}</h3>
    {children}
  </div>

  <!-- Parent Usage -->
  <Card title="Custom Title">
    <p>Projected slot content</p>
  </Card>
  ```
- **Verification**: Slot content is projected accurately into the component; unprovided props fallback to defaults.

### Phase 18: Language Improvements & Form Primitives
- **Feature**: `form({...})` primitive with automatic `event.preventDefault()` on `<form onsubmit="...">` and dynamic boolean attribute handling.
- **Syntax**:
  ```html
  <script>
    loginForm = form({ email: "", password: "" })

    submitLogin = async (values) => {
      // Automatic loading and error handling
      return await api.login(values);
    }
  </script>

  <form onsubmit="loginForm.submit(submitLogin)">
    <input bind={loginForm.email} disabled={loginForm.loading}>
    <button type="submit" disabled={loginForm.loading}>Submit</button>
  </form>
  ```
- **Verification**: Submission sets `loginForm.loading = true`, catches errors into `loginForm.error`, sets `loginForm.success = true`, and prevents browser navigation.

### Phase 19: Integrated Master Dashboard
- **Feature**: Complete unified framework verification dashboard.
- **Verification**: All 17 phases verified with 100% PASS rate in automated unit tests, production build, and runtime simulation.

---

## Automated Testing & Production Build

### Unit & Integration Test Summary
- **Compiler Tests (`nuvsha/tests/compiler.test.js`)**: 42 tests
- **Data Primitive Tests (`nuvsha/tests/data.test.js`)**: 3 tests
- **Form Primitive Tests (`nuvsha/tests/form.test.js`)**: 5 tests
- **Error Diagnostics Tests (`nuvsha/tests/errors.test.js`)**: 7 tests
- **Router Tests (`nuvsha/tests/router.test.js`)**: 6 tests
- **CLI Scaffolding Tests (`create-nuvsha/tests/cli.test.js`)**: 7 tests
- **Master Test App Suite (`tests/master-test.test.js`)**: 2 tests
- **Interactive Runtime Suite (`tests/runtime-interactive.test.js`)**: 4 tests
- **Total Tests**: **76 / 76 PASSING (100%)**

### Production Build Validation
- **Command**: `npm --prefix nuvsha-master-test run build`
- **Output**:
  - `dist/index.html` (0.92 kB)
  - `dist/assets/index-BuW0hLD0.css` (35.49 kB — Tailwind v4 compiled)
  - `dist/assets/index-Ch7DbLVD.js` (155.43 kB — Minified bundle)
- **Build Time**: ~630ms

---

## Known Limitations

- **Schema Validation**: The built-in `form()` primitive provides lifecycle states (`loading`, `error`, `success`) and manual error triggers (`setError()`), but does not bundle a heavy third-party schema library like Zod by default.
- **SSR (Server-Side Rendering)**: Nuvsha is currently optimized for Client-Side Rendering (SPA). Server-Side Rendering / Hydration is planned for future phases.
