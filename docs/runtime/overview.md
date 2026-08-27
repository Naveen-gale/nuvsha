# Runtime Overview

## What It Is

The **Nuvsha Runtime** (`nuvsha/src/runtime/`) is the lightweight JavaScript library that executes inside the user's browser.

---

## Responsibilities of the Runtime

1. **Reactivity Engine (`state.js`)**: Manages component-scoped dirty checking, registers `$watch` expressions, and executes updates via `$update()`.
2. **DOM Mounting (`dom.js`)**: Takes the root component and attaches its generated DOM nodes to the HTML container.
3. **Client-Side Router (`router.js`)**: Handles URL route matching, browser history (`pushState` / `popstate`), and link click interception.

---

## Why Nuvsha Does Not Use a Virtual DOM

Many frameworks construct a virtual tree of JavaScript objects (Virtual DOM) on every state change and "diff" it against the previous tree.

Nuvsha takes a much simpler approach:
- Each reactive expression (`{count}`) is attached directly to its corresponding real DOM node.
- When an event modifies state, only the expressions that produce a different value update their specific DOM nodes directly.
- This results in minimal memory overhead, fast updates, and a tiny runtime bundle.
