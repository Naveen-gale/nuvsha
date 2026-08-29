# Expressions

To display your variables in the HTML, you use **expressions** wrapped in curly braces `{ ... }`.

## Syntax

```html
<script>
  user = "Alice"
  age = 25
</script>

<p>Name: {user}</p>
<p>Next year age: {age + 1}</p>
<p>Status: {age >= 18 ? "Adult" : "Minor"}</p>
```

## What happens

Any valid JavaScript expression can be placed inside the curly braces. Nuvsha evaluates the expression and inserts the result into the DOM as text. When the variables inside the expression change, the text automatically updates.
