# Tailwind CSS Integration

## What It Is

Nuvsha comes with **first-class support for Tailwind CSS (v4)** out of the box.

When you scaffold a new project using `create-nuvsha`, Tailwind is already configured and integrated into the Vite build process.

---

## 1. Setup in Nuvsha

In a standard project:

1. **Vite Plugin**: The `@tailwindcss/vite` plugin is included in `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite';
   import nuvshaPlugin from 'nuvsha/vite-plugin';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     plugins: [
       nuvshaPlugin(),
       tailwindcss()
     ]
   });
   ```

2. **CSS Entry**: `src/assets/main.css` imports Tailwind:
   ```css
   @import "tailwindcss";
   ```

---

## 2. Using Utility Classes in `.nuv` Files

You can use all standard Tailwind utility classes in your `.nuv` templates:

```html
<div class="min-h-screen bg-slate-950 text-white flex items-center justify-center">
  <div class="max-w-md w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
      Welcome to Nuvsha
    </h1>
    <p class="mt-2 text-slate-400 text-sm">
      Tailwind utility classes work seamlessly inside .nuv components.
    </p>
    <button class="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors">
      Get Started
    </button>
  </div>
</div>
```

---

## 3. Responsive & State Modifiers

Modifiers like `hover:`, `focus:`, `active:`, and responsive breakpoints like `sm:`, `md:`, `lg:` work without any extra setup:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <button class="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg px-4 py-2 text-white transition-colors">
    Click Me
  </button>
</div>
```

---

## 4. Production Optimization

When you run `npm run build`, Tailwind v4 scans your `.nuv` templates and generates an optimized CSS bundle containing only the classes used in your application.
