# DOM Mounting

## What It Is

DOM Mounting (`nuvsha/src/runtime/dom.js`) is the process of taking your compiled root component and attaching it to the webpage container.

---

## The `mount()` Function

```javascript
import { mount } from 'nuvsha';
import App from './App.nuv';

const container = document.getElementById('app');
mount(App, container);
```

---

## Implementation Details

The `mount` function is very simple:

```javascript
export function mount(component, container) {
  // 1. Clear any existing content inside the container
  container.innerHTML = '';
  
  // 2. Call the component's render function to get the actual DOM nodes
  const element = component();
  
  // 3. Attach that element to the container
  container.appendChild(element);
}
```

- If `component()` returns a `DocumentFragment`, all child elements are appended seamlessly to the container.
