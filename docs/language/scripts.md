# Scripts

The `<script>` block is where the state and logic for your component live. 

Any top-level variable you assign in the script block automatically becomes reactive state for your component.

## Syntax

```html
<script>
  message = "Hello World"
  totalCount = 100
  isActive = false
</script>
```

## What happens

Behind the scenes, the Nuvsha compiler detects these variables and wraps them in a reactivity system. You don't need to use `let`, `const`, or `var` for reactive component state—simply assigning a name makes it available to your template.

## Common Mistake

Do not put DOM manipulation logic (like `document.getElementById`) inside the script block. The script block runs *before* the component's HTML is injected into the DOM. Let Nuvsha handle DOM updates for you!
