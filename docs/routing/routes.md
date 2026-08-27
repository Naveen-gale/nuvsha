# Routes Definition

## What It Is

In Nuvsha, routes are configured in a dedicated JavaScript file (`src/router/routes.js`) as an array of route objects.

---

## Route Object Format

Each route in the `routes` array has:
- `path` (string): The URL path to match (e.g. `"/"`, `"/about"`, `"/contact"`).
- `component` (Function): The page component imported from a `.nuv` file.

```javascript
import Home from "../pages/Home.nuv";
import About from "../pages/About.nuv";
import Contact from "../pages/Contact.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "*", component: NotFound }
];
```

---

## 404 (Not Found) Route

Use the wildcard `*` path to catch any URL that does not match an existing route:

```javascript
{ path: "*", component: NotFound }
```

When a user visits an unknown path (e.g. `/random-page`), Nuvsha will automatically render your `NotFound` component.

---

## Important Rules

1. Keep your route definitions in a separate file (e.g. `src/router/routes.js`) rather than putting them directly in `App.nuv`.
2. Static exact matching is used for Phase 10 (e.g. `/about` matches only `/about`).
