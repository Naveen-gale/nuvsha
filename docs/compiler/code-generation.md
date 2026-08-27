# Code Generation

## What It Is

**Code Generation** (`nuvsha/src/compiler/compiler.js`) is the final stage of the compilation pipeline. It traverses the AST tree and outputs standard JavaScript code using browser DOM APIs.

---

## Structure of Generated JavaScript

Every compiled `.nuv` file produces an ES Module that exports a default `render(props)` function:

```javascript
// 1. Hoisted imports from <script>
import { createComponent } from "nuvsha";
import Card from "./Card.nuv";

// 2. Exported render function
export default function render(props = {}) {
  // 2a. Isolated component reactive scope
  const { $watch, $update } = createComponent();

  // 2b. Props destructuring
  const { ...$$restProps } = props;

  // 2c. Transformed script variables
  let count = 0;

  // 2d. DOM creation and reactive bindings
  const frag0 = document.createDocumentFragment();
  const el1 = document.createElement("div");
  
  const exp2 = document.createTextNode(String(count));
  $watch(() => String(count), (val) => exp2.textContent = val);
  
  el1.appendChild(exp2);
  frag0.appendChild(el1);
  
  return frag0;
}
```

---

## How Reactive Constructs are Emitted

### 1. Expressions `{count}`
Emits `document.createTextNode(String(count))` plus a `$watch` listener that updates `.textContent` when `count` changes.

### 2. Events `onclick="count++"`
Emits standard element property assignment:
```javascript
el.onclick = (event) => {
  const $$res = count++;
  $update();
  if ($$res && typeof $$res.then === 'function') {
    $$res.then(() => $update()).catch(() => $update());
  }
};
```

### 3. Conditions `{if}` and Loops `{for}`
Emits comment anchors (e.g. `document.createComment("nuvsha-if")`) and branch builder functions that dynamically insert and remove DOM nodes around the anchor.
