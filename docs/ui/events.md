# Component Events

Child components can emit custom events to communicate with their parent using the `$event` function.

## Syntax

```html
<!-- components/CounterButton.nuv -->
<script>
  // Emits a custom 'increment' event to the parent
</script>
<button onclick="$event('increment')">
  Add 1
</button>
```

In the parent, you listen for this event just like a normal DOM event, prefixing the event name with `on`:

```html
<!-- App.nuv -->
<script>
  import { CounterButton } from "./components/CounterButton.nuv"
  total = 0
</script>

<CounterButton onincrement="total++" />
<p>Total: {total}</p>
```

## Passing Data

You can also pass a detail payload with the event:

```html
<!-- Child -->
<button onclick="$event('save', { id: 42, status: 'ok' })">Save</button>

<!-- Parent -->
<!-- Access the payload via event.detail -->
<Child onsave="console.log(event.detail.id)" />
```
