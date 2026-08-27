# Nuvsha Documentation

Welcome to the official documentation for **Nuvsha**!

Nuvsha is a lightweight frontend framework created to make web development straightforward, fun, and fast.

---

## Table of Contents

### 1. Getting Started
- [Introduction](./getting-started/introduction.md) — What is Nuvsha and why was it created?
- [Installation](./getting-started/installation.md) — Requirements and installation guide.
- [Create a Project](./getting-started/create-project.md) — How to scaffold a new project with `create-nuvsha`.
- [Project Structure](./getting-started/project-structure.md) — Understanding the files in a Nuvsha app.
- [Your First App](./getting-started/first-app.md) — Step-by-step tutorial building your first interactive app.

### 2. Language Guide
- [Language Overview](./language/overview.md) — The `.nuv` single-file component syntax.
- [Templates](./language/templates.md) — Writing HTML markup in `.nuv` files.
- [Script Block](./language/script.md) — Writing logic inside `<script>` blocks.
- [Variables](./language/variables.md) — Simplified reactive variables.
- [Expressions](./language/expressions.md) — Dynamic text and attribute values `{...}`.
- [Events](./language/events.md) — Handling user actions (`onclick`, `oninput`, etc.).
- [Forms](./language/forms.md) — Two-way data binding with `bind={...}`.
- [Loops](./language/loops.md) — Rendering lists with `{for item of items}`.
- [Conditions](./language/conditions.md) — Branching with `{if}`, `{else if}`, and `{else}`.
- [Async Blocks](./language/async.md) — Handling promises with `{async}`, `{loading}`, and `{error}`.
- [Data Fetching](./language/data.md) — Using the `data()` API for reactive network requests.
- [Components](./language/components.md) — Using reusable `.nuv` components in templates.

### 3. Components
- [Component Overview](./components/overview.md) — Thinking in Nuvsha components.
- [Creating Components](./components/creating-components.md) — Writing and importing components.
- [Props](./components/props.md) — Passing data from parent to child components.
- [Component Structure](./components/component-structure.md) — Best practices for organizing components.

### 4. Styling
- [Styling Overview](./styling/overview.md) — How to style Nuvsha applications.
- [Tailwind CSS](./styling/tailwind.md) — Using Tailwind CSS v4 in Nuvsha.

### 5. Routing
- [Routing Overview](./routing/overview.md) — Single-page application routing without page reloads.
- [Routes](./routing/routes.md) — Defining routes in `routes.js`.
- [Navigation](./routing/navigation.md) — Linking between pages and browser history.
- [Project Structure](./routing/project-structure.md) — Structuring multi-page Nuvsha applications.

### 6. Compiler Internals
- [Compiler Overview](./compiler/overview.md) — How Nuvsha transforms `.nuv` files into JavaScript.
- [Lexer](./compiler/lexer.md) — Converting text into tokens.
- [Parser](./compiler/parser.md) — Converting tokens into an Abstract Syntax Tree (AST).
- [AST (Abstract Syntax Tree)](./compiler/ast.md) — Tree representation of components.
- [Code Generation](./compiler/code-generation.md) — Emitting standard DOM JavaScript.

### 7. Runtime Internals
- [Runtime Overview](./runtime/overview.md) — The browser engine of Nuvsha.
- [Reactivity System](./runtime/reactivity.md) — How `$watch` and `$update` work.
- [DOM Mounting](./runtime/dom.md) — How `mount()` attaches elements to the page.
- [Event Handling](./runtime/events.md) — How events trigger updates.

### 8. API Reference
- [Runtime API](./api/runtime.md) — Public exports from the `nuvsha` package.

### 9. Testing
- [Testing Overview](./testing/overview.md) — How testing works in Nuvsha.
- [Compiler Tests](./testing/compiler-tests.md) — Testing lexer, parser, and code generation.
- [Application Tests](./testing/application-tests.md) — Testing components and runtime logic.
