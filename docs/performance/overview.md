# Performance Overview

Nuvsha is incredibly fast because it skips the biggest bottleneck of modern frontend frameworks: the Virtual DOM (VDOM).

## The Virtual DOM problem

In VDOM frameworks, every time a variable changes, the framework has to:
1. Re-render the entire component's HTML structure in memory.
2. Compare (diff) the new memory tree with the old memory tree.
3. Figure out what changed.
4. Apply the changes to the real DOM.

## Nuvsha's Approach

Nuvsha does none of this. 

During compilation, Nuvsha analyzes your template. When you write `<h1>{name}</h1>`, the compiler knows exactly where the `name` variable is displayed.

When `name` changes, Nuvsha doesn't re-render the component. It executes a direct, surgical update on that specific text node. The performance difference is massive, especially in large lists or frequently updating dashboards.
