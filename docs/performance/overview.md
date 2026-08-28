# Performance Overview

Nuvsha was designed from the ground up to be fast, lightweight, and predictable. Unlike many modern frontend frameworks, Nuvsha achieves high performance **without a Virtual DOM**.

## Component-Scoped Updates

When a reactive variable changes in Nuvsha, it does not re-render your entire application.

Nuvsha uses a **component-scoped dirty-checking** architecture:
1. Every component gets its own localized `$watch` registry.
2. When an event fires (e.g. `onclick`), Nuvsha calls `$update()` *only* for the component where the event originated.
3. Only the specific DOM nodes tied to changed variables are updated.

This means updating a counter in a deeply nested `<Button>` component costs almost nothing and will never trigger an update in the parent `<Layout>` component.

## Direct DOM Updates

Because Nuvsha compiles your `.nuv` files into standard JavaScript, there is no heavy runtime diffing engine. 

For example, this code:
```html
<p>{count}</p>
```
Is compiled directly into:
```javascript
$watch(() => String(count), (val) => textNode.textContent = val);
```

When `$update()` runs, if `count` hasn't changed, the DOM is left entirely untouched. If it has changed, Nuvsha directly updates `textNode.textContent`.

## Generated Code Optimization

The Nuvsha compiler is built to generate minimal, readable JavaScript. 

In Phase 14, we introduced the `handleEvent` runtime utility. Instead of generating large inline blocks of promise-resolution code for every single event listener (`onclick`, `oninput`, etc.), the compiler emits a tiny wrapper:

```javascript
// Generated Output
button.onclick = handleEvent((event) => count++, $update);
```

This drastically reduces the size of your final production bundles when your application scales up to hundreds of interactive elements.

## Tree Shaking

Nuvsha is configured with `"sideEffects": false` in its `package.json`. This signals to modern bundlers like Vite and Rollup that they can safely remove any Nuvsha code that your application doesn't use. 

If you build an app without using the `<Router>`, the entire routing engine is stripped from your final production build automatically!
