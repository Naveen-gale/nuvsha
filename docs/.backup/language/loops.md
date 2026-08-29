# Loops

## What It Is

The `{for}` block allows you to render a list of elements from a JavaScript array.

---

## Syntax

```html
<script>
  fruits = ["Apple", "Banana", "Cherry"]
</script>

<ul>
  {for fruit of fruits}
    <li>{fruit}</li>
  {/for}
</ul>
```

---

## Looping Over Objects

You can loop over arrays containing objects:

```html
<script>
  users = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "Developer" },
    { id: 3, name: "Charlie", role: "Designer" }
  ]
</script>

<div class="user-list">
  {for user of users}
    <div class="user-card">
      <h3>{user.name}</h3>
      <p>Role: {user.role}</p>
    </div>
  {/for}
</div>
```

---

## Reactivity with Array Mutations

Nuvsha automatically watches arrays for changes. If you add, remove, or modify items in an array, the loop re-renders automatically:

```html
<script>
  todos = ["Buy milk", "Walk the dog"]
  newTodo = ""

  function addTodo() {
    if (newTodo.trim()) {
      todos.push(newTodo)
      newTodo = ""
    }
  }

  function removeTodo(index) {
    todos.splice(index, 1)
  }
</script>

<div>
  <input type="text" bind={newTodo} placeholder="New task..." />
  <button onclick={addTodo}>Add</button>

  <ul>
    {for todo of todos}
      <li>{todo}</li>
    {/for}
  </ul>
</div>
```

---

## How It Works

1. During compilation, the `{for}` block generates an anchor comment (e.g. `<!--nuvsha-for-->`) and a builder function.
2. The runtime takes a snapshot of the array and updates the DOM list whenever the array contents change.
