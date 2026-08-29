# Variables

Variables in Nuvsha hold your application's data.

## Syntax

```html
<script>
  title = "Nuvsha"
  visitors = 42
  isVisible = true
</script>

<h1>{title}</h1>
<p>Visitors: {visitors}</p>
```

## Scope

Variables declared in a component's `<script>` are **scoped** exclusively to that component. 

If you have a `Header.nuv` component and a `Footer.nuv` component, they can both have a variable named `count`, and they will not interfere with each other.
