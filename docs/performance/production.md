# Production Builds

Nuvsha relies on [Vite](https://vitejs.dev) as its official build tool. Because Nuvsha provides a dedicated Vite plugin (`vite-plugin-nuvsha`), transitioning from development to production is seamless and highly optimized.

## Build Commands

Every Nuvsha project created via `create-nuvsha` comes with standard NPM scripts:

### `npm run dev`
Starts the Vite development server. It compiles `.nuv` files on the fly, provides instant hot-reloading (HMR), and displays detailed Nuvsha compiler errors in the browser overlay if you make a mistake.

### `npm run build`
Prepares your application for production deployment.
1. The Nuvsha compiler processes all `.nuv` files and generates standard JavaScript.
2. If any `.nuv` file contains a syntax error, the build will fail immediately and print a helpful error frame to the terminal.
3. Vite and Rollup bundle the generated JavaScript.
4. The code is heavily minified.
5. Tree-shaking removes unused exports (like unused Nuvsha runtime helpers).
6. The final, optimized static assets are placed in the `dist/` directory.

### `npm run preview`
Starts a local web server to serve the optimized `dist/` directory. Use this to verify your production build behaves exactly as expected before deploying it to a live server.

## Code Splitting & Lazy Loading

For larger applications, you may not want to load every single page and component on the initial page load.

Because Nuvsha's `<Router>` natively accepts functions that return components, you can achieve route-level code splitting using standard JavaScript dynamic imports:

```javascript
// Instead of a static import:
// import About from './pages/About.nuv';

// Use a dynamic import:
const About = () => import('./pages/About.nuv').then(m => m.default);

export const routes = {
  '/': Home,
  '/about': About
};
```

When Vite compiles your production build, it will automatically split `About.nuv` into a separate JavaScript chunk. The browser will only download that chunk when the user actually navigates to the `/about` route!
