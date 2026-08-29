# Syntax Reference

A quick cheat sheet for Nuvsha syntax.

## Reactive Variables
```html
<script>
  name = "Nuvsha"
  count = 0
</script>
```

## Text Interpolation
```html
<p>Hello {name}</p>
```

## Dynamic Attributes
```html
<img src={imageUrl} alt={altText} />
```

## Event Listeners
```html
<button onclick="count++">Add</button>
<input oninput="name = event.target.value" />
```

## Two-Way Binding
```html
<input type="text" bind={name} />
<input type="checkbox" bind={isChecked} />
<select bind={theme}>...</select>
```

## Conditions
```html
{if isLoading}
  <p>Loading...</p>
{else if hasError}
  <p>Error</p>
{else}
  <p>Success</p>
{/if}
```

## Loops
```html
{for item of items}
  <li>{item}</li>
{/for}
```

## Async Blocks
```html
{async user = fetchUser()}
  <p>{user.name}</p>
{loading}
  <p>Loading...</p>
{error}
  <p>Failed.</p>
{/async}
```
