# Variables

## What It Is

In Nuvsha, declaring reactive state variables is as easy as assigning a value to a name.

---

## Why It Exists

In many other frameworks, you have to write boilerplate such as `const [count, setCount] = useState(0)` or `const count = ref(0)`.

In Nuvsha, you simply write:

```javascript
count = 0
```

The Nuvsha compiler automatically turns this into a reactive local variable!

---

## Basic Example

```html
<script>
  name = "Nuvsha"
  count = 10
  isActive = true
  items = ["Apple", "Banana", "Cherry"]
  user = { name: "Sarah", role: "Admin" }
</script>

<div>
  <p>Name: {name}</p>
  <p>Count: {count}</p>
  <p>Role: {user.role}</p>
</div>
```

---

## Standard JavaScript Syntax Is Also Supported

If you prefer to write explicit `let` or `const` declarations, Nuvsha supports that too:

```html
<script>
  let count = 0
  const appName = "My App"
</script>
```

---

## How Reactivity Works with Variables

When a variable is modified inside an event handler (for example `onclick="count++"` or inside a function called by a button), Nuvsha automatically triggers an update. Any part of the UI that displays `{count}` will immediately update to reflect the new value.
