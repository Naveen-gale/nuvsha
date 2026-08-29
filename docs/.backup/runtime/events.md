# Runtime Event Handling

## What It Is

Event handling in the Nuvsha runtime manages how user actions trigger reactive updates.

---

## How Events Trigger Updates

When you write an event listener in a `.nuv` template (e.g. `onclick="count++"` or `onclick={handleClick}`), the compiler wraps your handler:

1. **Synchronous Execution**: The handler runs your code.
2. **Immediate `$update()`**: Nuvsha immediately calls `$update()` to evaluate all watchers and update the DOM.
3. **Promise Handling**: If the handler returns a Promise (e.g. an `async` function), Nuvsha waits for the Promise to settle and calls `$update()` again when data arrives.

---

## Event Delegation in Router

The Nuvsha router also uses a global document-level click listener to intercept local `<a href="...">` link clicks for client-side navigation without full-page reloads.
