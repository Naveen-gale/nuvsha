# Compiler Overview

## What It Is

The **Nuvsha Compiler** is the core subsystem of Nuvsha that converts your `.nuv` component code into standard JavaScript that any modern web browser can run.

---

## Why a Compiler is Needed

Web browsers only understand HTML, CSS, and standard JavaScript. They do not know how to run `.nuv` files or interpret custom syntax like `bind={val}`, `{if condition}`, or simplified script variables (`count = 0`).

The compiler transforms `.nuv` source code into clean JavaScript code using native DOM APIs.

---

## The 3-Step Compilation Pipeline

When a `.nuv` file is compiled, it passes through three distinct steps:

```
.nuv Source Text
      ↓
1. Lexer (lexer.js)       → Tokens
      ↓
2. Parser (parser.js)     → Abstract Syntax Tree (AST)
      ↓
3. Generator (compiler.js) → Standard JavaScript Code
```

1. **Lexer (Tokenizer)**: Breaks the raw character string into meaningful words called *Tokens* (e.g. `TAG_OPEN`, `EXPRESSION`, `TEXT`).
2. **Parser**: Reads the list of tokens and constructs a tree representing the structure of the component (the *AST*).
3. **Code Generator**: Walks the AST and outputs valid JavaScript containing standard DOM creation calls and `$watch` reactive bindings.

---

## Next Topics

- [Lexer](./lexer.md) — How Nuvsha breaks text into tokens.
- [Parser](./parser.md) — How tokens become an AST.
- [AST (Abstract Syntax Tree)](./ast.md) — The node classes representing a component.
- [Code Generation](./code-generation.md) — How the compiler outputs DOM-building JavaScript.
