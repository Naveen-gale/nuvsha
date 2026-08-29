# Data

The `data/` directory should hold plain `.js` files for your API calls, data transformation logic, and complex state management.

Keeping logic out of your `.nuv` files makes your components cleaner and your code easier to test.

## Example

```javascript
// src/data/api.js
export async function fetchUserProfile(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}
```

You can then import this function directly into your Nuvsha components:

```html
<script>
  import { fetchUserProfile } from "../data/api.js"
  
  // Use the API function
</script>
```
