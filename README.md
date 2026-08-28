# Nuvsha

A modern, lightweight frontend JavaScript framework designed to build reactive user interfaces with less code.

Nuvsha introduces `.nuv` single-file components, combining the simplicity of standard HTML and JavaScript with a direct, fast reactivity model and zero Virtual DOM overhead.

```html
<script>
  name = "Nuvsha"
  count = 0
</script>

<div class="card">
  <h1>Hello {name}</h1>
  <p>Count is: {count}</p>
  <button onclick="count++">Increment</button>
</div>
```

---

## Key Features

- **`.nuv` Single-File Components**: Write script logic and HTML markup in one clean file.
- **Simplified Script Syntax**: Declare reactive variables with plain assignments (`count = 0`).
- **Direct Reactive State**: Component-scoped dirty checking without Virtual DOM complexity.
- **Dynamic Expressions**: Real-time evaluation of `{expression}` bindings.
- **Two-Way Form Binding**: Sync form inputs effortlessly with `bind={variable}`.
- **Reactive Control Flow**:
  - Conditions: `{if show} ... {else if other} ... {else} ... {/if}`
  - Loops: `{for item of items} ... {/for}` with array mutation tracking.
  - Async States: `{async data = fetchPromise} ... {loading} ... {error} ... {/async}`
- **Component System**: Reusable uppercase components (`<Card title="Hello" />`) with props and `<slot />` content projection.
- **Built-in Client-Side Routing**: Simple SPA routing (`<Router routes={routes} />`) with browser history and link interception.
- **Beginner-Friendly Compiler Errors**: Precise source locations, code frames, and helpful hints for syntax mistakes.
- **Tailwind CSS Ready**: Seamless integration with Tailwind CSS v4 and Vite.
- **Project Scaffolding**: Quickstart any project with `npx create-nuvsha`.

---

## Quick Start

Create a new Nuvsha project in seconds:

```bash
npx create-nuvsha my-app
cd my-app
npm install
npm run dev
```

---

## Documentation

Explore the complete, beginner-friendly documentation in the [`docs/`](./docs/README.md) directory:

- [Getting Started](./docs/getting-started/introduction.md)
  - [Introduction](./docs/getting-started/introduction.md)
  - [Installation](./docs/getting-started/installation.md)
  - [Create Project](./docs/getting-started/create-project.md)
  - [Project Structure](./docs/getting-started/project-structure.md)
  - [Your First App](./docs/getting-started/first-app.md)
- [Language Guide](./docs/language/overview.md)
  - [Templates](./docs/language/templates.md)
  - [Script Block](./docs/language/script.md)
  - [Variables](./docs/language/variables.md)
  - [Expressions](./docs/language/expressions.md)
  - [Events](./docs/language/events.md)
  - [Form Binding](./docs/language/forms.md)
  - [Loops](./docs/language/loops.md)
  - [Conditions](./docs/language/conditions.md)
  - [Async Blocks](./docs/language/async.md)
  - [Components](./docs/language/components.md)
- [Components](./docs/components/overview.md)
  - [Creating Components](./docs/components/creating-components.md)
  - [Props](./docs/components/props.md)
  - [Component Structure](./docs/components/component-structure.md)
- [Styling](./docs/styling/overview.md)
  - [Tailwind CSS](./docs/styling/tailwind.md)
- [Routing](./docs/routing/overview.md)
  - [Routes Definition](./docs/routing/routes.md)
  - [Navigation](./docs/routing/navigation.md)
  - [Router Project Structure](./docs/routing/project-structure.md)
- [Compiler Internals](./docs/compiler/overview.md)
  - [Lexer](./docs/compiler/lexer.md)
  - [Parser](./docs/compiler/parser.md)
  - [AST](./docs/compiler/ast.md)
  - [Code Generation](./docs/compiler/code-generation.md)
- [Runtime Internals](./docs/runtime/overview.md)
  - [Reactivity System](./docs/runtime/reactivity.md)
  - [DOM Mounting](./docs/runtime/dom.md)
  - [Event Handling](./docs/runtime/events.md)
- [Errors and Debugging](./docs/errors/overview.md)
  - [Errors Overview](./docs/errors/overview.md)
  - [Error Codes](./docs/errors/error-codes.md)
- [Architecture & Conventions](./docs/architecture/project-structure.md)
- [Performance & Production](./docs/performance/overview.md)
  - [Performance Overview](./docs/performance/overview.md)
  - [Production Builds](./docs/performance/production.md)
  - [Best Practices](./docs/performance/best-practices.md)
- [API Reference](./docs/api/runtime.md)
- [Testing](./docs/testing/overview.md)
  - [Compiler Tests](./docs/testing/compiler-tests.md)
  - [Application Tests](./docs/testing/application-tests.md)

---

## Project Structure

```
nuvsha/
├── nuvsha/           # Core framework package (compiler, runtime, Vite plugin)
├── create-nuvsha/    # CLI tool to scaffold new Nuvsha applications
├── playground/       # Live developer playground with Vite and Tailwind
├── docs/             # Complete framework documentation
└── package.json      # Workspace configuration
```

---

## License

MIT
