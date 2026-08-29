# Performance Best Practices

Nuvsha is fast by default, but following these simple best practices will ensure your applications remain blazing fast as they scale.

## 1. Keep Components Focused

Because Nuvsha's reactivity is **component-scoped**, any event (like clicking a button) triggers an `$update()` for that specific component.

If you have a massive component with 1,000 reactive expressions and you click a button inside it, Nuvsha must re-evaluate all 1,000 expressions.

**Solution:** Break large UIs into smaller components. If a specific section of your page has highly interactive state, extract it into its own component. Updating it will only re-evaluate the expressions inside that extracted component.

## 2. Use Routing for Large Apps

If you are building a multi-page application, use the built-in `<Router>`. Do not try to manually toggle massive sections of your app using `{if}` statements in a single root component.

Routing ensures that components are properly mounted and unmounted, cleaning up their memory and watchers entirely when the user navigates away.

## 3. Leverage Code Splitting

For routes that users rarely visit (like a settings page or an admin dashboard), load them lazily using dynamic imports:

```javascript
const AdminDashboard = () => import('./pages/Admin.nuv').then(m => m.default);
```
This shrinks your initial JavaScript payload, making your app load instantly for first-time visitors.

## 4. Don't Fear the DOM

You do not need to optimize every single variable. Nuvsha's dirty-checking is incredibly cheap because it just compares variables in JavaScript. The actual DOM is only touched if a value *actually changes*. 

Write your code in the simplest, most readable way first. Only optimize if you notice a measurable slowdown.

## 5. Always Test Production Builds

Development mode (`npm run dev`) includes extra overhead (like Vite's HMR client). 

If you are ever measuring the performance or bundle size of your application, **always** do it against a production build:
```bash
npm run build
npm run preview
```
