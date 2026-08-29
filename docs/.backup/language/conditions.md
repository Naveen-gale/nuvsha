# Conditions

## What It Is

Conditional blocks allow you to show or hide parts of your user interface based on dynamic conditions.

---

## Syntax

Nuvsha supports `{if}`, `{else if}`, and `{else}` blocks:

```html
<script>
  isLoggedIn = false
  userRole = "guest"
</script>

<div>
  {if isLoggedIn}
    <p>Welcome back!</p>
  {else}
    <button onclick="isLoggedIn = true">Log In</button>
  {/if}
</div>
```

---

## Multi-Branch `{else if}` Example

```html
<script>
  score = 85
</script>

<div>
  {if score >= 90}
    <p class="grade">Grade: A</p>
  {else if score >= 80}
    <p class="grade">Grade: B</p>
  {else if score >= 70}
    <p class="grade">Grade: C</p>
  {else}
    <p class="grade">Grade: Needs Improvement</p>
  {/if}
</div>
```

---

## Single `{if}` without `{else}`

You can also use `{if}` on its own to conditionally show content:

```html
<script>
  showDetails = false
</script>

<button onclick="showDetails = !showDetails">
  Toggle Details
</button>

{if showDetails}
  <div class="details-panel">
    <p>Here are the extra details...</p>
  </div>
{/if}
```

---

## How It Works

1. The compiler creates a comment anchor in the DOM (`<!--nuvsha-if-->`).
2. Separate builder functions are generated for each conditional branch.
3. The condition is registered with `$watch`. When the result changes, only the active branch is built and inserted, while the previous branch's DOM nodes are cleanly removed.
