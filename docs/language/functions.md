# Functions

You can define standard JavaScript functions or arrow functions in your script block to handle complex logic or format data.

## Syntax

```html
<script>
  amount = 1200.5

  formatCurrency = (value) => {
    return "$" + value.toFixed(2)
  }
</script>

<p>Total: {formatCurrency(amount)}</p>
```

## Event Handlers

Functions are also useful as event handlers for buttons and inputs.

```html
<script>
  count = 0

  incrementByTen = () => {
    count = count + 10
  }
</script>

<button onclick="incrementByTen()">Add 10</button>
<p>Count: {count}</p>
```
