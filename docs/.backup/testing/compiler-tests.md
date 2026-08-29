# Compiler Tests

## What It Is

Compiler tests (`nuvsha/tests/compiler.test.js`) verify that the Lexer, Parser, and Code Generator correctly transform `.nuv` source code into JavaScript.

---

## Areas Covered

- **Lexer Tests**:
  - Expressions in text and attributes (`{name}`, `onclick={() => count++}`).
  - Control blocks (`{if}`, `{else if}`, `{else}`, `{/if}`).
  - Loops (`{for item of items}`).
  - Async blocks (`{async}`, `{loading}`, `{error}`).
- **Parser Tests**:
  - Single and multiple root nodes.
  - `<script>` tag parsing.
  - Distinguishing HTML elements from uppercase components (`<Card />`).
  - Slot placeholder parsing (`<slot />`).
- **Code Generator Tests**:
  - Variable transformation (`count = 0` to `let count = 0`).
  - Import hoisting.
  - Props destructuring and dynamic prop reactivity.
  - Two-way binding generation (`bind={var}`).
  - Reactive loops and array snapshot watchers.
  - Reactive conditions with branch selector functions.
  - Async blocks with promise lifecycle handlers.
