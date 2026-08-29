# Parser

## What It Is

The **Parser** (`nuvsha/src/compiler/parser.js`) is the second stage of the compiler. It takes the array of tokens produced by the lexer and organizes them into a hierarchical tree structure called an **Abstract Syntax Tree (AST)**.

---

## How It Works (The Stack Algorithm)

The parser maintains a `stack` array to track nested HTML elements and blocks:

1. When it encounters an opening tag (e.g. `<div>`), it creates an `ElementNode` and pushes it onto the `stack`.
2. Any subsequent tokens (text, expressions, child elements) are added as children of the node on top of the stack.
3. When it encounters a closing tag (e.g. `</div>`), it pops the element from the `stack`.
4. When the stack is empty, nodes are added directly to the component's root template.

---

## Special Node Parsing

- **Uppercase Tags (`<Card />`)**: Parsed as `ComponentCallNode` rather than plain `ElementNode`.
- **`<slot />` Tag**: Parsed as a `SlotNode` representing content projection.
- **Conditionals (`{if}`, `{else if}`, `{else}`, `{/if}`)**: Pushed onto the stack to collect child elements for each branch.
- **Loops (`{for}`, `{/for}`)**: Pushed onto the stack to collect child nodes repeated for each iteration.
- **Async Blocks (`{async}`, `{loading}`, `{error}`, `{/async}`)**: Maintains section states (`success`, `loading`, `error`) to route child nodes into appropriate arrays.
