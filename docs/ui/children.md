# Children (Slots)

Sometimes you want a component to act as a wrapper around arbitrary content. You can achieve this using the `{children}` keyword (often called "slots" in other frameworks).

## Syntax

```html
<!-- components/Card.nuv -->
<div class="border rounded-xl p-6 shadow-md bg-white">
  <!-- The content passed by the parent will appear exactly here -->
  {children}
</div>
```

Now, when you use the `Card` component, anything you put inside its tags will be projected into the `{children}` location:

```html
<!-- App.nuv -->
<script>
  import { Card } from "./components/Card.nuv"
</script>

<Card>
  <h2 class="text-xl font-bold">Welcome</h2>
  <p>This paragraph is projected into the card!</p>
  <button>Click me</button>
</Card>
```

## What happens

The Nuvsha compiler extracts the inner HTML of `<Card>` and injects it wherever `{children}` is placed inside `Card.nuv`.
