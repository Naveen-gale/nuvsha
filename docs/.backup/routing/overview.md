# Routing Overview

## What It Is

**Routing** allows you to build Single Page Applications (SPAs) where users can navigate between different pages (like `/`, `/about`, `/contact`) without the browser reloading the entire webpage.

---

## Why It Exists

In traditional websites, clicking a link requests a brand-new HTML page from the server, causing a blank white screen flash.

In Nuvsha, the built-in **Router**:
1. Intercepts clicks on internal links.
2. Updates the browser URL with `history.pushState()`.
3. Swaps only the active page component in the DOM.
4. Responds to the browser's Back and Forward buttons seamlessly.

---

## Basic Example

### 1. Define Routes (`src/router/routes.js`)
```javascript
import Home from "../pages/Home.nuv";
import About from "../pages/About.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "*", component: NotFound }
];
```

### 2. Render the Router in `src/App.nuv`
```html
<script>
  import { Router } from "nuvsha";
  import { routes } from "./router/routes.js";
  import Navbar from "./components/Navbar.nuv";
</script>

<div class="app-layout">
  <Navbar />
  <main>
    <Router routes={routes} />
  </main>
</div>
```

---

## How It Works

1. The `<Router routes={routes} />` component checks `window.location.pathname`.
2. It matches the current path against the `routes` array.
3. It renders the matching page component into the router outlet.
4. A global click interceptor listens for clicks on local `<a href="...">` links and updates the page without a full browser reload.

---

## Limitations (Intentionally Deferred for Future Phases)

- **Dynamic Route Parameters** (e.g. `/users/:id`) are not supported yet.
- **Nested Routes** (sub-routers inside child pages) are not supported yet.
- **Route Guards & Middleware** (e.g. authentication checks) are not supported yet.
