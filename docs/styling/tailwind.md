# Tailwind CSS

Nuvsha comes fully pre-configured to work with **Tailwind CSS v4** right out of the box when you use `create-nuvsha`.

## How it works

Tailwind v4 is integrated via Vite (`@tailwindcss/vite`). 

Your `src/assets/main.css` contains the Tailwind configuration directing it to scan your Nuvsha files:

```css
/* src/assets/main.css */
@import "tailwindcss";
@source "../**/*.nuv";
```

## Syntax

Simply use Tailwind classes on your HTML elements. The compiler will detect them and inject the optimized CSS into your browser automatically.

```html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Nuvsha Framework</div>
      <p class="mt-2 text-slate-500">Building UI with less code and familiar HTML.</p>
    </div>
  </div>
</div>
```

You can use hovering, dark mode, arbitrary values, and everything else Tailwind offers.
