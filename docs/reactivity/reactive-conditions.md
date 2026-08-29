# Reactive Conditions

When toggling boolean variables, Nuvsha uses placeholder comments (anchors) in the DOM to know where to insert or remove elements.

## Syntax

```html
<script>
  isOpen = false
</script>

<button onclick="isOpen = !isOpen">Toggle</button>

{if isOpen}
  <div class="modal">
    <p>This modal is dynamically added to the DOM.</p>
  </div>
{/if}
```

## What happens

If `isOpen` is false, the `<div>` does not exist in the DOM at all; only an invisible HTML comment (`<!-- if anchor -->`) is there. When `isOpen` becomes true, Nuvsha creates the `<div>` and inserts it exactly at the anchor. When it becomes false again, the `<div>` is completely removed from memory.
