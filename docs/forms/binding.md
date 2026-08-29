# Two-Way Binding

The `bind={variable}` syntax is a shorthand for automatically syncing an input's value with a state variable, and vice-versa.

## Syntax

```html
<script>
  username = "Alex"
  isSubscribed = true
  theme = "dark"
</script>

<!-- Text Inputs -->
<input type="text" bind={username} />

<!-- Checkboxes -->
<input type="checkbox" bind={isSubscribed} /> Subscribe

<!-- Select Dropdowns -->
<select bind={theme}>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>

<p>Hello {username}. Subscribed: {isSubscribed}. Theme: {theme}.</p>
```

## What happens

When the user types in the text input, the `username` variable updates instantly, and the `<p>` tag updates in real-time. If you were to change `username` in your JavaScript logic, the input field's value would update to match.
