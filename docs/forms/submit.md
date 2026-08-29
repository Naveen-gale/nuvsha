# Submit & Loading

Nuvsha handles standard HTML `<form>` submissions elegantly.

## Syntax

```html
<script>
  loginForm = form({ email: "", password: "" })

  handleLogin = async (values) => {
    // values contains { email, password }
    const response = await api.login(values)
    if (!response.ok) throw new Error("Invalid credentials")
    return response.user
  }
</script>

<form onsubmit="loginForm.submit(handleLogin)">
  <input type="email" bind={loginForm.email} disabled={loginForm.loading} />
  <input type="password" bind={loginForm.password} disabled={loginForm.loading} />
  
  <button type="submit" disabled={loginForm.loading}>
    {loginForm.loading ? "Logging in..." : "Login"}
  </button>
  
  {if loginForm.error}
    <p class="error">{loginForm.error}</p>
  {/if}
</form>
```

## What happens

When the user submits the form:
1. **Automatic Prevent Default**: Nuvsha automatically calls `event.preventDefault()` on `<form onsubmit>`, stopping the browser from reloading the page.
2. **Loading State**: `loginForm.loading` is set to `true`. The UI updates, disabling the inputs and changing the button text.
3. **Execution**: The `handleLogin` function executes.
4. **Success**: If successful, `loginForm.loading` becomes `false` and `loginForm.success` becomes `true`.
5. **Error Handling**: If the function throws an error, Nuvsha catches it, sets `loginForm.loading` to `false`, and places the error message in `loginForm.error`. The UI updates to display the error.
