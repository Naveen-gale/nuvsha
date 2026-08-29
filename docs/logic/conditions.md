# Conditions

Use `{if}`, `{else if}`, and `{else}` blocks to conditionally render parts of your UI based on variables.

## Syntax

```html
<script>
  status = "loading"
</script>

<div>
  {if status === 'loading'}
    <p>Loading your data...</p>
    
  {else if status === 'success'}
    <p>Data loaded successfully!</p>
    
  {else}
    <p>Failed to load data.</p>
    
  {/if}
</div>

<button onclick="status = 'success'">Simulate Success</button>
<button onclick="status = 'error'">Simulate Error</button>
```

## What happens

Nuvsha evaluates the JavaScript conditions exactly like an `if/else` statement in JavaScript. Only one branch is ever rendered in the DOM at a time. The compiler replaces the active branch in real-time when the `status` variable changes.
