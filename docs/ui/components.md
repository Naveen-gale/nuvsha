# Components

Components allow you to build complex UIs out of smaller, reusable building blocks.

## Syntax

First, create a child component, for example `components/Badge.nuv`:

```html
<!-- components/Badge.nuv -->
<span class="bg-blue-500 text-white rounded px-2 py-1">
  New
</span>
```

Then, import and use it in your parent component like an HTML tag:

```html
<!-- App.nuv -->
<script>
  import { Badge } from "./components/Badge.nuv"
</script>

<h1>Messages <Badge /></h1>
```

## What happens

The compiler injects the `Badge` UI directly into the parent. You must ensure the tag name matches the imported variable name (capitalized, e.g., `<Badge />`).
