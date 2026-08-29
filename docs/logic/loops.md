# Loops

Use the `{for ... of ...}` block to iterate over arrays and render a block of HTML for each item.

## Syntax

```html
<script>
  groceries = ["Apples", "Milk", "Bread"]
</script>

<ul>
  {for item of groceries}
    <li>{item}</li>
  {/for}
</ul>
```

## Index Syntax

If you need the index of the current item, you can extract it like this:

```html
<ul>
  {for (item, index) of groceries}
    <li>{index + 1}. {item}</li>
  {/for}
</ul>
```

## What happens

Nuvsha creates a DOM fragment for every item in the array. When the array is mutated (e.g., items are added or removed), Nuvsha intelligently updates the DOM list.
