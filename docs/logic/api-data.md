# API & Data

If you need more control over a network request than an `{async}` block provides (such as manual reloading or programmatic access to the data), use the `data()` primitive.

## Syntax

```html
<script>
  fetchUsers = async () => {
    const res = await fetch('/api/users')
    return res.json()
  }

  // Initialize the data store. It will execute the fetch immediately.
  usersStore = data(fetchUsers)
</script>

<div>
  {if usersStore.loading}
    <p>Loading users...</p>
    
  {else if usersStore.error}
    <p>Error: {usersStore.error.message}</p>
    
  {else if usersStore.data}
    <ul>
      {for user of usersStore.data}
        <li>{user.name}</li>
      {/for}
    </ul>
  {/if}
  
  <!-- Trigger a manual refresh of the data -->
  <button onclick="usersStore.reload()">Refresh Data</button>
</div>
```

## What happens

The `data()` function creates an object containing:
- `data`: The resolved result of your function (initially null).
- `loading`: A boolean.
- `error`: An error object if the request failed.
- `reload()`: A function you can call to execute the promise again.

When any of these properties change, your UI updates automatically.
