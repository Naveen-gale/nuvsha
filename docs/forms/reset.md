# Reset

You can easily reset a form back to its initial values.

## Syntax

```html
<script>
  contactForm = form({ name: "", message: "" })
</script>

<form onsubmit="contactForm.submit(api.sendMessage)">
  <!-- inputs here -->
  
  <button type="button" onclick="contactForm.reset()">
    Clear Form
  </button>
</form>
```

## What happens

Calling `contactForm.reset()` reverts the `name` and `message` fields back to empty strings, clears any `error`, and sets `success` back to `false`. The UI (and bound inputs) instantly reflect the empty values.
