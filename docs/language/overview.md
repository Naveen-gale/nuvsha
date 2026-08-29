# Language Overview

Nuvsha uses **Single File Components** (SFCs). A component is saved with the `.nuv` extension.

Every Nuvsha component consists of two main parts:
1. **Logic**: A `<script>` block containing JavaScript.
2. **Template**: Standard HTML intermixed with dynamic expressions.

```html
<script>
  // This is your component logic
  title = "My Dashboard"
</script>

<!-- This is your UI template -->
<div>
  <h1>{title}</h1>
</div>
```
