# Forms

Nuvsha makes handling forms extremely simple and beginner-friendly. Instead of manually managing loading states, errors, and success messages, Nuvsha provides a built-in `form` primitive that does the heavy lifting for you.

## Basic Form

To create a form, call the `form({...})` function inside your `<script>` block and pass it your initial values:

```html
<script>
  login = form({
    email: "",
    password: ""
  })
</script>
```

This returns a reactive state object containing your values, along with helpful metadata like `loading` and `error`.

## Binding

You can bind your form values directly to HTML inputs using Nuvsha's standard `bind={...}` syntax:

```html
<input type="email" bind={login.email}>
<input type="password" bind={login.password}>
```

When the user types, the `email` and `password` values inside the `login` form object are updated instantly.

## Form Submission

When you're ready to submit the data, create a submit function. Then, attach it to your `<form>` using `onsubmit`:

```html
<script>
  login = form({
    email: "",
    password: ""
  })

  // Your submit function receives the current form values
  submitLogin = async (values) => {
    // Phase 11 API/data integration
    return await data.post("/api/login", values)
  }
</script>

<!-- Nuvsha automatically calls event.preventDefault() for you! -->
<form onsubmit="login.submit(submitLogin)">
  <!-- ... -->
  <button type="submit">Login</button>
</form>
```

> [!TIP]  
> Because Nuvsha knows you're using `<form onsubmit="...">`, it automatically prevents the browser from reloading the page when the user presses Enter or clicks the submit button!

## Loading State

When the form submission begins, `login.loading` automatically becomes `true`. When it finishes (either successfully or with an error), it becomes `false`.

```html
{if login.loading}
  <p>Logging in, please wait...</p>
{/if}

<!-- You can also easily disable buttons while loading -->
<button disabled={login.loading}>Submit</button>
```

## Error State

If your `submitLogin` function throws an Error (e.g. invalid credentials, network failure), Nuvsha catches it and stores the error message in `login.error`.

```html
{if login.error}
  <div class="error-banner">
    <p>{login.error}</p>
  </div>
{/if}
```

You can also manually set or clear errors using:
- `login.setError("Invalid username")`
- `login.clearError()`

## Success State

If the submission succeeds without throwing an error, `login.success` becomes `true`.

```html
{if login.success}
  <p>Welcome back!</p>
{/if}
```

## Resetting the form

To reset the form back to its initial values and clear all errors, success, and loading states, simply call `.reset()`:

```html
<button type="button" onclick="login.reset()">
  Start Over
</button>
```

## Complete Example

Here is a complete, working example of a Contact form:

```html
<script>
  contact = form({
    name: "",
    email: "",
    message: ""
  })

  submitContact = async (values) => {
    if (!values.email.includes("@")) {
      throw new Error("Please enter a valid email address.")
    }
    // Simulate sending message
    await new Promise(r => setTimeout(r, 1000));
    return "Message sent!";
  }
</script>

{if contact.success}
  <p>Thank you! Your message was sent.</p>
  <button onclick="contact.reset()">Send another</button>
{else}
  <form onsubmit="contact.submit(submitContact)">
    
    {if contact.error}
      <p style="color: red;">{contact.error}</p>
    {/if}

    <input type="text" bind={contact.name} placeholder="Name" disabled={contact.loading}>
    <input type="email" bind={contact.email} placeholder="Email" disabled={contact.loading}>
    <textarea bind={contact.message} placeholder="Your message" disabled={contact.loading}></textarea>

    <button type="submit" disabled={contact.loading}>
      {if contact.loading} Sending... {else} Send {/if}
    </button>
    
  </form>
{/if}
```

## Advanced Details

### API Architecture Integration
The form primitive is designed to integrate seamlessly with Nuvsha's `data()` API (Phase 11). By throwing standard Javascript `Error` objects from your network requests, forms will automatically handle API failures and display them elegantly using `login.error`.

### Component Isolation
Just like variables, Nuvsha forms are strongly component-scoped. If you render `<LoginForm />` three times on the same page, each one will have its own independent loading, error, and value states.

### Reserved Names
Because the form object exposes its metadata directly for convenience, you **cannot** name your form fields any of the following reserved keywords:
`loading`, `error`, `success`, `values`, `submit`, `reset`, `setError`, `clearError`.

If your external API requires one of these field names, you should map it inside your `submit` function:
```javascript
submitLogin = async (values) => {
  // Map our internal 'userName' to the API's 'success' field
  return await data.post("/api/update", { success: values.userName });
}
```

## Current Limitations

- **Complex Schema Validation**: Phase 18 does not include a giant schema validation library (like Zod or Yup). For now, validation should be handled manually inside your `submitFn` by throwing `Error` objects, or on your backend API.
