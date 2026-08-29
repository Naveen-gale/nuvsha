# Updates

Nuvsha handles updates automatically, but it's helpful to understand what triggers an update.

## The `$update` Cycle

Under the hood, Nuvsha injects a lightweight `$update()` function into your components. This function is automatically called at the end of any event handler defined in your template.

```html
<script>
  message = "Hello"
</script>
<!-- Nuvsha automatically calls $update() after this onclick runs -->
<button onclick="message = 'Goodbye'">Change Message</button>
```

If you mutate state asynchronously (like inside a `setTimeout` or `fetch.then()`), Nuvsha provides specialized primitives (like [Async Blocks](../logic/async.md) and [Data API](../logic/api-data.md)) that manage these updates for you.
