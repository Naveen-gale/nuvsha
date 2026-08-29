# Events

## What It Is

Events allow your application to respond to user interactions, such as clicking a button, typing in an input, or submitting a form.

---

## Syntax

In Nuvsha, you attach event handlers using standard HTML attribute names like `onclick`, `oninput`, `onchange`, `onsubmit`, `onkeydown`, etc.

You can write event handlers in two ways:

### 1. Inline Statement String
Write simple JavaScript statements directly in quotes:

```html
<script>
  count = 0
</script>

<button onclick="count++">+1</button>
<button onclick="count = 0">Reset</button>
```

### 2. Function Reference or Arrow Function
Pass a function reference or an arrow expression:

```html
<script>
  count = 0

  function increment() {
    count++
  }
</script>

<button onclick={increment}>+1</button>
<button onclick={() => count += 5}>+5</button>
```

---

## Accessing the Event Object (`event`)

Inside an event handler, the native browser `event` object is available automatically:

```html
<script>
  lastKeyPressed = ""

  function handleKey(event) {
    lastKeyPressed = event.key
  }
</script>

<input 
  type="text" 
  onkeydown={handleKey} 
  placeholder="Type something..." 
/>

<p>Last key: {lastKeyPressed}</p>
```

You can also access `event` directly in inline string handlers:

```html
<input oninput="console.log(event.target.value)" />
```

---

## Asynchronous Event Handlers

Nuvsha handles `async` functions automatically. When an event handler returns a Promise, Nuvsha re-evaluates reactive expressions both immediately and after the Promise resolves or rejects:

```html
<script>
  status = "Idle"

  async function loadData() {
    status = "Loading..."
    const res = await fetch("https://api.example.com/data")
    const data = await res.json()
    status = "Done!"
  }
</script>

<button onclick={loadData}>Fetch</button>
<p>Status: {status}</p>
```
