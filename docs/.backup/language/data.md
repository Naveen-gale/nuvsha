# Data Fetching

Fetching API data in Nuvsha is incredibly simple. Nuvsha provides a built-in `data()` function that automatically tracks the loading state, the fetched data, and any errors.

You don't even need to import it—Nuvsha automatically makes it available in your components!

## Using `data()`

In your `<script>` block, call `data()` and pass it a function that returns a Promise (such as a `fetch` call).

```html
<script>
  // A simple function that returns a Promise
  async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }

  // Create reactive data state
  users = data(getUsers)
</script>

<h1>User Directory</h1>

{if users.loading}
  <p>Loading users...</p>
{/if}

{if users.error}
  <p style="color: red;">Error: {users.error.message}</p>
  <button onclick="users.reload()">Try Again</button>
{/if}

{if users.data}
  <ul>
    {for user of users.data}
      <li>{user.name}</li>
    {/for}
  </ul>
{/if}
```

## How It Works

When you call `data(getUsers)`, Nuvsha:
1. Immediately sets the `loading` state to `true`.
2. Calls your `getUsers` function.
3. Automatically triggers a UI update.
4. When the Promise resolves, it stores the result in `data`, sets `loading` to `false`, and updates the UI again.
5. If the Promise rejects, it stores the error in `error`, sets `loading` to `false`, and updates the UI.

The `users` object returned by `data()` has four properties:
- `data`: The resolved value from your Promise (initially `null`).
- `loading`: A boolean indicating if the request is in progress (`true` or `false`).
- `error`: The error object if the Promise was rejected (initially `null`).
- `reload()`: A function you can call to fetch the data again.

## Reloading Data

If you need to fetch the data again (for example, clicking a "Refresh" button or retrying after an error), simply call the `.reload()` method.

```html
<button onclick="users.reload()">Refresh Data</button>
```

When `reload()` is called, the `loading` state is set back to `true`, `error` is cleared, and the original function is called again.

## Passing Arguments

If your fetch function requires arguments, you can pass them to `reload()`.

```html
<script>
  async function getUser(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  }

  // Pass a wrapper function to data() to set the initial ID
  userProfile = data(() => getUser(1))
</script>

<h1>{userProfile.data.name}</h1>

<!-- Fetch a different user -->
<button onclick="userProfile.reload(2)">Load User 2</button>
<button onclick="userProfile.reload(3)">Load User 3</button>
```
