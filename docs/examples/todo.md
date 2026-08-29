# Todo List Example

Demonstrates two-way binding on text inputs and reactive array loops.

```html
<script>
  tasks = ["Learn Nuvsha", "Build an app"]
  newTask = ""

  addTask = () => {
    if (!newTask.trim()) return;
    tasks.push(newTask.trim())
    newTask = "" // clear input
  }
</script>

<div class="max-w-md mx-auto mt-10">
  <h1 class="text-xl font-bold mb-4">Todo List</h1>
  
  <div class="flex gap-2 mb-4">
    <!-- bind={newTask} instantly syncs the input with the variable -->
    <input bind={newTask} class="border p-2 flex-grow rounded" placeholder="New task..." />
    <button onclick="addTask()" class="bg-green-500 text-white px-4 py-2 rounded">
      Add
    </button>
  </div>
  
  <ul class="list-disc pl-5">
    {for task of tasks}
      <li class="mb-1">{task}</li>
    {/for}
  </ul>
</div>
```
