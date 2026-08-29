# Imports

You can import external JavaScript files, data, or other Nuvsha components into your script block using standard ES module syntax.

## Syntax

```html
<script>
  // Importing a component
  import { Button } from "./components/Button.nuv"
  
  // Importing data or functions from a JS file
  import { fetchUsers } from "./data/api.js"
  
  users = []
</script>

<Button>Load Users</Button>
```

Nuvsha natively supports ES modules, allowing you to neatly organize your application into multiple files.
