# Abstract Syntax Tree (AST)

## What It Is

The **Abstract Syntax Tree (AST)** is a tree of JavaScript objects (`nuvsha/src/compiler/ast.js`) that represents the structure and content of a `.nuv` component.

---

## Node Classes

### 1. `ComponentNode`
The root node representing the entire `.nuv` file:
- `script` (string): JavaScript code from the `<script>` block.
- `template` (Array): Top-level nodes in the component's template.

### 2. `ElementNode`
Represents an HTML tag (like `<div>` or `<button>`):
- `tagName` (string): Tag name (e.g. `"div"`).
- `attributes` (Object): Map of attribute names and values.
- `children` (Array): Child AST nodes.

### 3. `TextNode`
Represents static text:
- `value` (string): The text content.

### 4. `ExpressionNode`
Represents dynamic `{expression}`:
- `expression` (string): The raw JavaScript expression.

### 5. `ComponentCallNode`
Represents a custom component tag (like `<Card title="Hi" />`):
- `name` (string): Component name (e.g. `"Card"`).
- `props` (Object): Props passed to the component.
- `children` (Array): Slotted children inside `<Card>...</Card>`.

### 6. `ConditionalNode`
Represents `{if}`, `{else if}`, and `{else}`:
- `condition` (string): The condition expression.
- `branches` (Array): Array of `{ condition, children }` branch objects.

### 7. `ForNode`
Represents `{for item of items}`:
- `expression` (string): e.g. `"item of items"`.
- `children` (Array): Repeated template nodes.

### 8. `SlotNode`
Represents `<slot />`:
- Marker for content projection.

### 9. `AsyncNode`
Represents an async data block:
- `varName` (string): Variable holding resolved data.
- `expression` (string): Promise expression.
- `children` (Array): Success template.
- `loading` (Array): Loading template.
- `error` (Array): Error template.
