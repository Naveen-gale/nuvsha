# Routes

To configure routing, you define a map of URL paths to Nuvsha components, and pass it to the `<Router>` component.

## Syntax

First, define your routes in a JavaScript file (usually `src/router/routes.js`):

```javascript
// src/router/routes.js
import { Home } from "../pages/Home.nuv"
import { About } from "../pages/About.nuv"
import { NotFound } from "../pages/NotFound.nuv"

export const routes = {
  "/": Home,
  "/about": About,
  "*": NotFound
}
```

Then, use the `<Router>` component in your main `App.nuv` shell:

```html
<!-- src/App.nuv -->
<script>
  import { Router } from "nuvsha"
  import { routes } from "./router/routes.js"
  
  import { Navbar } from "./components/Navbar.nuv"
</script>

<div class="app-layout">
  <Navbar />
  
  <main>
    <!-- The router will render the correct component here based on the URL -->
    <Router routes={routes} />
  </main>
</div>
```

## What happens

When the user visits `/`, the `<Router>` component mounts `Home.nuv`. When they visit `/about`, it mounts `About.nuv`.
