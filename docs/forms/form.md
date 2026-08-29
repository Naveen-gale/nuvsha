# Form Primitive

For complex forms with multiple fields, submitting to an API, and tracking loading/error states, use the `form()` primitive.

## Syntax

```html
<script>
  // Initialize the form with default values
  loginForm = form({
    email: "",
    password: ""
  })
</script>

<input type="email" bind={loginForm.email} />
<input type="password" bind={loginForm.password} />

<p>Current email is: {loginForm.email}</p>
```

## What happens

The `form()` function creates an object that not only holds your field values, but also tracks the form's lifecycle properties:
- `loginForm.loading` (boolean)
- `loginForm.error` (string | null)
- `loginForm.success` (boolean)
