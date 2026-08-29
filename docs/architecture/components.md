# Components

The `components/` directory is for reusable UI elements.

If you find yourself copying and pasting the same HTML structure for a button, a card, or a modal, you should create a component.

## Example

```html
<!-- src/components/Button.nuv -->
<script>
  type = "button"
  disabled = false
</script>

<button 
  type={type} 
  disabled={disabled}
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
>
  {children}
</button>
```
