# State

State refers to the data that your application remembers and displays at any given time.

In Nuvsha, your component's state is simply the variables you define in your `<script>` block.

## Syntax

```html
<script>
  // This is your state
  count = 0
  
  increment = () => {
    // Mutating state triggers a UI update
    count = count + 1
  }
</script>

<button onclick="increment()">Count: {count}</button>
```

## What happens

When `increment()` runs and `count` changes from `0` to `1`, Nuvsha detects the change. Because the button text depends on `count`, Nuvsha reaches into the DOM and changes the text node from "Count: 0" to "Count: 1".
