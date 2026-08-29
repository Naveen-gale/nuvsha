# Not Found (404)

You can define a fallback route that renders when a user visits a URL that does not exist in your route map.

## Syntax

Use the wildcard `"*"` key in your route definition:

```javascript
import { Home } from "../pages/Home.nuv"
import { NotFound } from "../pages/NotFound.nuv"

export const routes = {
  "/": Home,
  "*": NotFound
}
```

## What happens

If a user navigates to `/missing-page`, the `<Router>` will render the `NotFound` component instead of crashing or showing a blank page.
