# Tailwind CSS Integration

Nuvsha comes with **first-class support for Tailwind CSS (v4)** out of the box. 

When you scaffold a new project using `create-nuvsha`, everything is already set up and configured for you. There is no need to manually configure PostCSS or write complex configurations.

## 1. Installation & Setup

To create a new Nuvsha project with built-in Tailwind support, simply run:

```bash
npx create-nuvsha my-app
cd my-app
npm install
npm run dev
```

Your `my-app` project includes the following out of the box:
- `@tailwindcss/vite` plugin in `vite.config.js`.
- A global `src/assets/main.css` importing the Tailwind CSS theme.

## 2. Using Classes in `.nuv` Files

You can use Tailwind classes exactly the way you're used to in standard HTML. 
The Nuvsha compiler perfectly preserves your `class` attributes, and Tailwind will detect them automatically.

```html
<div class="min-h-screen bg-slate-950 text-white flex items-center justify-center">
  <h1 class="text-4xl font-bold">Hello Nuvsha</h1>
</div>
```

## 3. Using Classes in Components

You can define standard components (e.g., `Card.nuv`) with beautiful Tailwind styling:

```html
<!-- src/components/Card.nuv -->
<div class="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
  <h2 class="text-2xl font-bold text-white">
    {title}
  </h2>
  <p class="mt-2 text-slate-400">
    {description}
  </p>
</div>
```

## 4. Responsive & Hover Classes

Tailwind's variants work perfectly inside Nuvsha. Use responsive modifiers like `md:` or `lg:`, and state modifiers like `hover:` or `focus:`:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <button class="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2 transition-colors">
    Submit
  </button>
</div>
```

## 5. Dynamic/Conditional Classes

Nuvsha supports dynamic conditional rendering. You can easily toggle styles based on state variables using standard `{if}` logic.

```html
<script>
  active = false
</script>

<button class="px-4 py-2 rounded-lg" onclick="active = !active">
  Toggle
</button>

{if active}
  <div class="mt-4 p-4 bg-green-500 text-white font-bold rounded-lg">
    Active Status
  </div>
{/if}
```

> **Note**: Complex dynamic inline class interpolation (e.g., `class="btn {isActive ? 'btn-active' : ''}"`) will be introduced in future updates.

## 6. Production Build

When you run `npm run build`, Vite will generate highly optimized production CSS. Tailwind v4 statically analyzes your `.nuv` components, pulling out only the classes you actually use to guarantee minimal CSS bundle sizes.
