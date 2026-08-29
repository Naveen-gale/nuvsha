# Components Reference

## Importing Components
```html
<script>
  import { Button } from "./components/Button.nuv"
</script>
<Button />
```

## Defining Props (Child Component)
```html
<script>
  title = "Default Title"
  disabled = false
</script>
```

## Passing Props (Parent Component)
```html
<Child title="Submit" disabled={true} />
```

## Slot Projection (Children)
Child component uses `{children}` where content should go.
```html
<!-- Child -->
<div class="card">{children}</div>

<!-- Parent -->
<Child>
  <p>This goes inside the card.</p>
</Child>
```
