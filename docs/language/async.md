# Async Blocks

## What It Is

The `{async}` block provides a declarative way to handle asynchronous operations (like fetching data from an API) directly inside your template.

It automatically manages **loading**, **success**, and **error** states for you!

---

## Syntax

```html
<script>
  function fetchUser() {
    return fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
  }
</script>

<div>
  {async user = fetchUser()}
    <div class="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  {loading}
    <p class="spinner">Loading user profile...</p>
  {error}
    <p class="error-msg">Failed to load user profile.</p>
  {/async}
</div>
```

---

## Structure of an Async Block

An `{async}` block consists of up to three sections:

1. **`{async variable = promise}`**: The success template. When the promise resolves, the resolved value is available in `variable`.
2. **`{loading}`**: Rendered while the promise is pending.
3. **`{error}`**: Rendered if the promise rejects. The `error` object/message is accessible inside this section.
4. **`{/async}`**: Closes the async block.

---

## Reactivity with Async Expressions

If the promise expression changes (for example, if you pass a dynamic parameter to an API function), the `{async}` block automatically returns to the `{loading}` state and fetches the new data:

```html
<script>
  userId = 1

  function getUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
  }
</script>

<button onclick="userId = 1">User 1</button>
<button onclick="userId = 2">User 2</button>

{async user = getUser(userId)}
  <h3>{user.name}</h3>
{loading}
  <span>Fetching user #{userId}...</span>
{/async}
```
