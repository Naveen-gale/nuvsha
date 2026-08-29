# Events Reference

## Native DOM Events
Prefix native HTML events with `on`:
- `onclick`
- `oninput`
- `onchange`
- `onsubmit`

You always have access to the native `event` object inside the expression.
```html
<input oninput="value = event.target.value" />
```

## Component Custom Events
Child components emit custom events to parents using `$event(eventName, payload)`.

```html
<!-- Child -->
<button onclick="$event('save', { id: 1 })">Save</button>

<!-- Parent -->
<!-- Prefix the custom event name with 'on' -->
<Child onsave="console.log(event.detail)" />
```
