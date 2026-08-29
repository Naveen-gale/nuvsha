# Production Build

To prepare your application for deployment, run:

```bash
npm run build
```

## What happens during the build

1. **Optimization**: Vite minifies your JavaScript and CSS, removing comments, whitespace, and long variable names.
2. **Tree-shaking**: Vite removes any unused code from your application and dependencies, ensuring the final bundle is as small as possible.
3. **handleEvent Optimization**: Nuvsha wraps all your `onclick`, `oninput`, etc. handlers in a highly optimized `handleEvent` wrapper that manages the `$update` cycle efficiently.

The output will be placed in the `dist/` folder, ready to be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).
