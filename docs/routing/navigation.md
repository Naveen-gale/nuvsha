# Navigation

You can navigate between routes using standard HTML links or programmatic functions.

## HTML Links (Declarative)

Nuvsha's router automatically intercepts standard same-origin `<a href="...">` clicks. You don't need a special `<Link>` component.

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
```

When a user clicks one of these links, the browser URL updates instantly, and the `<Router>` swaps the component, completely avoiding a full page refresh. External links (e.g., `href="https://google.com"`) are ignored and behave normally.

## Programmatic Navigation

If you need to navigate inside JavaScript logic (like after a form submission), you can use the `navigate()` function.

```html
<script>
  import { navigate } from "nuvsha"
  
  handleSuccess = () => {
    // Do something...
    navigate("/dashboard")
  }
</script>

<button onclick="handleSuccess()">Go to Dashboard</button>
```
