# Form Example

Demonstrates the built-in `form()` primitive for handling lifecycle states and API submissions.

```html
<script>
  loginForm = form({ email: "", password: "" })

  handleLogin = async (values) => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000))
    if (values.password !== "123") throw new Error("Invalid password")
    return { token: "abc" }
  }
</script>

<form onsubmit="loginForm.submit(handleLogin)" class="flex flex-col gap-4 max-w-sm">
  <input type="email" bind={loginForm.email} placeholder="Email" class="border p-2" />
  <input type="password" bind={loginForm.password} placeholder="Password" class="border p-2" />
  
  <button type="submit" disabled={loginForm.loading} class="bg-blue-600 text-white p-2">
    {loginForm.loading ? "Logging in..." : "Login"}
  </button>
  
  {if loginForm.error}
    <p class="text-red-500">{loginForm.error}</p>
  {else if loginForm.success}
    <p class="text-green-500">Success!</p>
  {/if}
</form>
```
