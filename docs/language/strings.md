# Strings

Since expressions are just JavaScript, you can call standard JavaScript string methods directly in your template.

## Syntax

```html
<script>
  message = "  hello world  "
</script>

<!-- Displays: "HELLO WORLD" -->
<p>{message.trim().toUpperCase()}</p>
```
