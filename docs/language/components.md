# Components in Language

## What It Is

Components allow you to split your user interface into independent, reusable pieces that can be nested inside other `.nuv` files.

---

## Basic Example

### 1. Child Component (`Button.nuv`)
```html
<!-- src/components/Button.nuv -->
<button class="btn font-semibold px-4 py-2 bg-blue-600 text-white rounded">
  {label}
</button>
```

### 2. Parent Component (`App.nuv`)
```html
<!-- src/App.nuv -->
<script>
  import Button from "./components/Button.nuv"
</script>

<div>
  <h1>My Application</h1>
  <Button label="Save Changes" />
  <Button label="Cancel" />
</div>
```

---

## Component Rules in Templates

1. **Uppercase Tag Names**: Any tag starting with a capital letter (e.g. `<Button />`, `<Card />`, `<Navbar />`) is treated as a component call.
2. **Import Required**: You must import the component in your `<script>` block before using it.
3. **Passing Props**: You can pass static strings (`title="Hello"`) or dynamic expressions (`count={count}`) as attributes.
4. **Content Projection with `<slot />`**: If you put HTML between opening and closing component tags (`<Card>content</Card>`), the child component can render that content using `<slot />`.

---

## Next Steps

To learn all about building, structuring, and passing data to components, visit the [Components Guide](../components/overview.md).
