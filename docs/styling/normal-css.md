# Normal CSS

You can write standard CSS and import it globally or per-component.

## Syntax

In a new project, you can simply write CSS in `src/assets/main.css`.

Since Nuvsha uses Vite, you can import CSS files directly into your `main.js` entry point:

```javascript
// src/main.js
import './assets/main.css'
```

You can also use standard `style="..."` attributes directly on HTML tags in your `.nuv` files:

```html
<div style="background-color: blue; padding: 20px;">
  <h1 style="color: white;">Hello</h1>
</div>
```
