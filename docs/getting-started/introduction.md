# Introduction to Nuvsha

## What It Is

**Nuvsha** is a modern, lightweight frontend JavaScript framework. 

A *frontend framework* is a set of tools that helps you build interactive user interfaces (websites and web apps) that run inside a web browser.

In Nuvsha, you write components in files that end with `.nuv`. A `.nuv` file lets you combine your JavaScript logic and HTML structure in a single, easy-to-read file.

```html
<script>
  name = "World"
</script>

<div>
  <h1>Hello {name}!</h1>
</div>
```

---

## Why It Exists

Modern web development has become overly complex. Many popular frameworks require complex build configurations, special reactivity wrappers, and heavy virtual DOM overhead.

Nuvsha was created with a simple goal: **make building user interfaces simple and direct again**.

- **No Boilerplate**: You don't need `let`, `const`, or special hooks just to create a variable. You just write `count = 0`.
- **Direct DOM Updates**: Nuvsha updates the exact text node or element that changed without re-rendering everything.
- **Beginner-Friendly**: If you know basic HTML and JavaScript, you can start building Nuvsha apps immediately.
- **Fast and Small**: The runtime engine is tiny and has zero external dependencies.

---

## How It Works

When you build an app with Nuvsha, three simple pieces work together:

1. **The `.nuv` File**: You write standard HTML with dynamic `{expressions}` and a `<script>` tag.
2. **The Compiler**: The Nuvsha compiler converts your `.nuv` file into standard JavaScript code that the browser understands.
3. **The Runtime**: A lightweight script running in the browser attaches your component to the page and updates the screen whenever variables change.

```
Your Component (.nuv)
       ↓
Nuvsha Compiler
       ↓
Standard JavaScript (ES Module)
       ↓
Browser DOM (via Nuvsha Runtime)
```

---

## Key Concepts

| Concept | What It Does |
| :--- | :--- |
| **`.nuv` Files** | Single-file components combining HTML and JavaScript. |
| **Simplified Script** | Declare reactive variables with plain assignments (`count = 0`). |
| **Expressions `{expr}`** | Insert dynamic variables or calculations into your HTML. |
| **Reactivity** | When a variable changes during an event, the UI updates automatically. |
| **Two-Way Binding** | Sync input fields directly to variables using `bind={variable}`. |
| **Routing** | Switch between pages without reloading the whole browser. |

---

## What Is Next?

Ready to get started? Head over to the [Installation Guide](./installation.md) to set up your development environment.
