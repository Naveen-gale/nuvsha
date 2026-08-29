# Reactive Loops

When working with arrays, Nuvsha tracks mutations using a JSON snapshot technique.

## Syntax

```html
<script>
  tasks = ["Learn Nuvsha", "Build App"]
  
  addTask = () => {
    // Mutating the array
    tasks.push("Deploy App")
  }
</script>

<button onclick="addTask()">Add Task</button>

<ul>
  {for task of tasks}
    <li>{task}</li>
  {/for}
</ul>
```

## What happens

When you call `tasks.push(...)`, Nuvsha compares the new state of the array with a snapshot of its previous state. It then efficiently adds the new `<li>` element to the DOM without re-rendering the entire list.

You can safely use array mutation methods like `.push()`, `.pop()`, `.splice()`, and `.shift()`.
