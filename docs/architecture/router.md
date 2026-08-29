# Router

The `router/` directory contains your route map definitions. Usually, this is just a single `routes.js` file.

## Example

```javascript
// src/router/routes.js
import { Home } from "../pages/Home.nuv"
import { Profile } from "../pages/Profile.nuv"

export const routes = {
  "/": Home,
  "/profile": Profile
}
```
