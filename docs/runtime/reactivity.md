# Reactivity System

## What It Is

Nuvsha's reactivity system (`nuvsha/src/runtime/state.js`) automatically keeps the user interface synchronized with JavaScript state variables.

---

## How It Works: `createComponent()`

Each component instance creates its own isolated reactive scope via `createComponent()`, which provides two internal functions:

1. **`$watch(getter, callback)`**:
   - `getter`: A function that evaluates the current value of an expression (e.g. `() => String(count)`).
   - `callback`: A function that updates the DOM if the value changed (e.g. `(val) => textNode.textContent = val`).
   - Stores `{ getter, callback, lastValue }` in a private `Set`.

2. **`$update()`**:
   - Loops through all registered watchers for that component instance.
   - Evaluates each `getter()`.
   - If `newValue !== lastValue`, updates `lastValue` and fires `callback(newValue)`.

---

## Component Isolation

Because each component gets its own independent set of watchers:
- Clicking a button in `ComponentA` runs `$update()` only for `ComponentA`.
- Unrelated components are not re-evaluated, keeping rendering fast and predictable.
