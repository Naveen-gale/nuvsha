# Runtime API Reference

## What It Is

The `nuvsha` package exports public functions and components for building and mounting applications.

```javascript
import { mount, Router, navigate, createComponent } from 'nuvsha';
```

---

## Exports

### 1. `mount(component, container)`
Attaches a compiled root component to an HTML container element.

- **Parameters**:
  - `component` (Function): The default exported render function of a `.nuv` component.
  - `container` (HTMLElement): The DOM element to render into (e.g. `document.getElementById('app')`).
- **Example**:
  ```javascript
  import { mount } from 'nuvsha';
  import App from './App.nuv';

  mount(App, document.getElementById('app'));
  ```

---

### 2. `<Router routes={routes} />`
A component that manages client-side SPA routing.

- **Props**:
  - `routes` (Array): Array of route objects (`[{ path: "/", component: Home }, ...]`).
- **Example**:
  ```html
  <script>
    import { Router } from "nuvsha";
    import { routes } from "./router/routes.js";
  </script>

  <Router routes={routes} />
  ```

---

### 3. `navigate(path)`
Programmatically changes the active route without a page reload.

- **Parameters**:
  - `path` (string): The URL path to navigate to (e.g. `"/about"`).
- **Example**:
  ```javascript
  import { navigate } from 'nuvsha';

  navigate('/dashboard');
  ```

---

### 4. `data(promiseFn)`
A function that accepts a promise-returning function and returns a reactive object `{ data, loading, error, reload }`. It automatically calls the component's `$update` function when data resolves.

- **Parameters**:
  - `promiseFn` (Function): A function that returns a Promise (e.g. `async () => fetch('/api')`).
- **Example**:
  ```html
  <script>
    users = data(getUsers)
  </script>
  ```
  *(Note: `data` is automatically injected by the compiler, you do not need to import it).*

---

### 5. `createComponent()` (Internal)
Used by the compiler to create an isolated reactive state boundary for a component instance.

- **Returns**: `{ $watch, $update }`
- **Example**:
  ```javascript
  const { $watch, $update } = createComponent();
  ```
