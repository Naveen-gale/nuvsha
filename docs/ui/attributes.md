# Attributes

While normal HTML attributes are static, Nuvsha allows you to bind variables dynamically to any HTML attribute.

## Syntax

```html
<script>
  buttonType = "submit"
  isDisabled = true
  imageUrl = "/profile.png"
  altText = "User Profile"
</script>

<img src={imageUrl} alt={altText} />

<!-- Boolean attributes are automatically removed if the value is false -->
<button type={buttonType} disabled={isDisabled}>
  Save
</button>
```

## What happens

Notice there are no quotes around the curly braces. By writing `src={imageUrl}`, you tell Nuvsha to keep the `src` attribute synchronized with the `imageUrl` variable. 

If `isDisabled` is `true`, the button will be disabled. If it changes to `false`, Nuvsha automatically removes the `disabled` attribute from the element.
