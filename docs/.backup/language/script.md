# Script Block

## What It Is

The `<script>` block is where you write the JavaScript logic for your `.nuv` component.

---

## Basic Example

```html
<script>
  import Header from "./Header.nuv"

  title = "My Dashboard"
  count = 0

  function add() {
    count++
  }
</script>

<div>
  <Header />
  <h2>{title}</h2>
  <button onclick={add}>Count: {count}</button>
</div>
```

---

## How It Works

1. **Imports are Hoisted**: Any `import` or `export` statements in your `<script>` are extracted and placed at the top level of the generated JavaScript file (as required by ES Modules).
2. **Simplified Variables**: Variable assignments like `count = 0` are automatically converted to `let count = 0` inside the component's render function.
3. **Component-Scoped**: Variables declared in `<script>` are private to that component instance. Multiple instances of the same component will have independent state.

---

## Important Rules

- Place the `<script>` block anywhere in your `.nuv` file (commonly at the top).
- Inside `<script>`, you can write standard JavaScript functions, objects, arrays, and calculations.
- Functions declared in `<script>` can be referenced in event handlers (e.g. `onclick={add}`).
