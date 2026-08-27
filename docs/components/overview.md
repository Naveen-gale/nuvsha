# Components Overview

## What It Is

A **component** is a self-contained, reusable building block for your user interface. 

In Nuvsha, every `.nuv` file is a component that encapsulates its own structure (HTML), style, and behavior (JavaScript).

---

## Why Components Matter

- **Reusability**: Write a component once (like a `Card` or `Navbar`) and use it across multiple pages.
- **Maintainability**: Smaller files are easier to read, understand, and debug.
- **Encapsulation**: State variables inside a component are isolated and do not conflict with other components.

---

## Component Mental Model

Think of your application as a tree of components:

```
App.nuv (Root)
 ├── Navbar.nuv
 ├── Router
 │    ├── Home.nuv
 │    │    └── Card.nuv
 │    └── About.nuv
 └── Footer.nuv
```

---

## Next Topics

- [Creating Components](./creating-components.md) — How to define and import components.
- [Props](./props.md) — How to pass data into components.
- [Component Structure](./component-structure.md) — Best practices for organizing your components.
