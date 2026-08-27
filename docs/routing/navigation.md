# Navigation

## What It Is

Navigation is how users move between different pages in your Nuvsha application.

---

## 1. Declarative Navigation (Links)

You can use standard HTML anchor tags (`<a>`) in your components:

```html
<!-- src/components/Navbar.nuv -->
<nav class="flex space-x-4">
  <a href="/" class="nav-link">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/contact" class="nav-link">Contact</a>
</nav>
```

### How Link Interception Works
- When the user clicks an internal link (e.g. `<a href="/about">`), Nuvsha automatically intercepts the click event.
- It prevents the browser from reloading the page, calls `history.pushState()`, and renders the new route.
- External links (like `<a href="https://google.com">` or `<a target="_blank">`) are **not** intercepted and behave normally.

---

## 2. Programmatic Navigation (`navigate`)

If you need to change pages from JavaScript (for example, after a button click or form submission), import the `navigate` function from `nuvsha`:

```html
<script>
  import { navigate } from "nuvsha"

  function goToHome() {
    navigate("/")
  }
</script>

<button onclick={goToHome}>
  Go to Home Page
</button>
```

---

## 3. Browser Back and Forward Buttons

Nuvsha listens to the browser's `popstate` event. When the user clicks the browser's **Back** or **Forward** buttons, the Router updates the active view without reloading the page.
