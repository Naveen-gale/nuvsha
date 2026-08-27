# Language Overview

## What It Is

The Nuvsha language is a simple component format defined in files with the `.nuv` extension.

A `.nuv` file consists of two main parts:
1. An optional `<script>` tag for your component's JavaScript logic.
2. HTML markup with reactive expressions and control blocks.

```html
<script>
  message = "Welcome to Nuvsha"
</script>

<div class="banner">
  <h1>{message}</h1>
</div>
```

---

## Language Features at a Glance

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **Variables** | `count = 0` | Simple variable declarations without `let`/`const` requirement. |
| **Expressions** | `{count + 1}` | Dynamic calculations and data inside text or attributes. |
| **Event Handlers** | `onclick="count++"` or `onclick={fn}` | Inline actions or function callbacks on user events. |
| **Form Binding** | `bind={name}` | Two-way synchronization between inputs and variables. |
| **Conditionals** | `{if show} ... {else} ... {/if}` | Show or hide UI blocks based on state. |
| **Loops** | `{for item of items} ... {/for}` | Render lists from JavaScript arrays. |
| **Async Blocks** | `{async data = fetchFn} ... {/async}` | Render loading, success, and error states for Promises. |
| **Data Fetching** | `users = data(getUsers)` | Simplified reactive API data fetching. |
| **Components** | `<Card title="Hi" />` | Reuse uppercase tags as custom components. |
| **Slots** | `<slot />` | Project child content into a component. |

---

## Design Philosophy

- **Zero Boilerplate**: Write minimal code to accomplish UI tasks.
- **Standards-Based**: HTML tags and standard JavaScript operations behave naturally.
- **Predictable**: State updates only re-evaluate expressions attached to that component.
