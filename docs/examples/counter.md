# Counter Example

A simple interactive counter demonstrating reactive state and event handlers.

```html
<script>
  count = 0
</script>

<div class="p-8 text-center">
  <h2 class="text-2xl font-bold mb-4">Counter: {count}</h2>
  
  <div class="flex gap-4 justify-center">
    <button onclick="count--" class="px-4 py-2 bg-red-500 text-white rounded">
      Decrement
    </button>
    
    <button onclick="count++" class="px-4 py-2 bg-blue-500 text-white rounded">
      Increment
    </button>
  </div>
</div>
```
