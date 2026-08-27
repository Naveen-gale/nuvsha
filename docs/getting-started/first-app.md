# Building Your First App

## What We Will Build

In this quick tutorial, we will build a simple, interactive **Counter & Greeting App** to learn how Nuvsha handles state, user clicks, and text inputs.

---

## Step 1: Open `App.nuv`

Open `src/App.nuv` in your code editor and replace its contents with the following:

```html
<script>
  name = "Alex"
  count = 0

  function resetCount() {
    count = 0
  }
</script>

<div class="p-8 max-w-md mx-auto space-y-6">
  <h1 class="text-3xl font-bold">Hello {name}!</h1>

  <!-- Form input synced with variable -->
  <div>
    <label class="block text-sm font-medium text-slate-400 mb-1">Your Name:</label>
    <input 
      type="text" 
      bind={name} 
      class="border border-slate-700 bg-slate-900 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <!-- Reactive Counter -->
  <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
    <p class="text-xl mb-3">Current count: <span class="font-bold text-blue-400">{count}</span></p>
    <div class="flex space-x-3">
      <button 
        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
        onclick="count++"
      >
        +1
      </button>
      <button 
        class="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded text-white font-medium"
        onclick="count--"
      >
        -1
      </button>
      <button 
        class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white font-medium"
        onclick={resetCount}
      >
        Reset
      </button>
    </div>
  </div>
</div>
```

---

## Step 2: Test It in the Browser

Run your development server if it isn't running already:

```bash
npm run dev
```

Now try the following in your browser:

1. **Type in the text input**: As you type, the title `Hello {name}!` updates in real time. This is powered by `bind={name}`.
2. **Click the `+1` and `-1` buttons**: The count number updates immediately.
3. **Click `Reset`**: Calls the `resetCount()` function defined in your `<script>` block.

---

## How It Works Behind the Scenes

1. **Variables**: `name = "Alex"` and `count = 0` are converted by Nuvsha into local reactive variables.
2. **Dynamic Expressions**: `{name}` and `{count}` create real DOM text nodes watched by the runtime.
3. **Event Listeners**: `onclick="count++"` compiles into a click handler that modifies the variable and tells the runtime to update the screen.
4. **Two-Way Binding**: `bind={name}` listens to the user typing in the input box, updates `name`, and refreshes any place showing `{name}`.

---

## Next Steps

Now that you've seen the basics, explore the [Language Overview](../language/overview.md) to understand all syntax features in depth.
