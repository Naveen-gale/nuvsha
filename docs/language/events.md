# Events

You can attach JavaScript logic to DOM events using standard HTML event attributes like `onclick`, `oninput`, `onmouseover`, etc.

## Syntax

```html
<script>
  clicks = 0
  inputValue = ""
</script>

<!-- Inline logic -->
<button onclick="clicks++">
  Clicked {clicks} times
</button>

<!-- Accessing the native event object -->
<input 
  type="text" 
  oninput="inputValue = event.target.value" 
/>
<p>You typed: {inputValue}</p>
```

## The `event` object

In Nuvsha event listeners, the native DOM `event` object is automatically available in scope. This allows you to easily read values from inputs via `event.target.value` or call methods like `event.preventDefault()`.
