# Your First Nuvsha App

Let's build a very simple counter application to understand how Nuvsha works.

Open the `src/App.nuv` file in your newly created project, delete its contents, and paste this code:

```html
<script>
  name = "Nuvsha"
  count = 0
</script>

<div style="padding: 20px; font-family: sans-serif;">
  <h1>Hello {name}</h1>
  
  <p>You clicked {count} times.</p>
  
  <button onclick="count++">
    Click me
  </button>
</div>
```

Save the file. Your browser will instantly update without needing a refresh.

## What's happening here?

1. **The `<script>` block**: We declared two variables, `name` and `count`. In Nuvsha, variables declared here are automatically reactive.
2. **The Expressions**: We used curly braces `{ ... }` to inject those variables into our HTML. `{name}` becomes "Nuvsha", and `{count}` becomes "0".
3. **The Event Listener**: We added an `onclick` attribute to the button. When clicked, it runs the JavaScript `count++`.

Because Nuvsha tracks the `count` variable, it knows that the paragraph text depends on it. When you click the button, Nuvsha automatically updates the `{count}` text in the DOM. No manual DOM manipulation required!
