# Styling Overview

## What It Is

In Nuvsha, you can style your components using standard CSS files, utility classes (like Tailwind CSS), or standard HTML inline `style` attributes.

---

## Styling Options in Nuvsha

### 1. Tailwind CSS (Recommended)
Nuvsha projects generated with `create-nuvsha` have **Tailwind CSS v4** pre-configured and ready to use out of the box.

```html
<div class="min-h-screen bg-slate-950 text-white p-8">
  <h1 class="text-3xl font-bold text-blue-400">Styled with Tailwind</h1>
</div>
```

See the [Tailwind CSS Guide](./tailwind.md) for full details.

---

### 2. Global CSS Files
You can write traditional CSS stylesheets and import them in your entry file (`src/main.js`):

```css
/* src/assets/main.css */
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
}
```

```javascript
// src/main.js
import './assets/main.css';
```

---

### 3. Inline Styles
Standard HTML `style` attributes work seamlessly:

```html
<div style="padding: 20px; background-color: #1e293b; border-radius: 8px;">
  <p>Inline styled block</p>
</div>
```

---

## Limitations

- Scoped component `<style>` blocks inside `.nuv` files are not supported yet (planned for future phases). Use Tailwind CSS utility classes or global CSS classes in the meantime.
