# Lexer (Tokenizer)

## What It Is

The **Lexer** (`nuvsha/src/compiler/lexer.js`) is the first stage of the Nuvsha compiler. It reads the raw `.nuv` file character-by-character and breaks it down into a stream of **Tokens**.

A *Token* is a labeled chunk of code (e.g., an opening tag, an expression, or plain text).

---

## Token Types

Nuvsha defines the following token types:

| Token Type | Example Syntax in `.nuv` | Purpose |
| :--- | :--- | :--- |
| `TAG_OPEN` | `<div class="box">` | An opening HTML element or component tag. |
| `TAG_CLOSE` | `</div>` | A closing tag. |
| `TEXT` | `Hello World` | Plain text between tags. |
| `EXPRESSION` | `{count + 1}` | Dynamic JavaScript expression. |
| `BLOCK_IF_OPEN` | `{if isLoaded}` | Opening of a conditional block. |
| `BLOCK_ELSE` | `{else}` | Else branch of a condition. |
| `BLOCK_ELSE_IF` | `{else if hasError}` | Else-if branch of a condition. |
| `BLOCK_IF_CLOSE` | `{/if}` | Closing of a conditional block. |
| `BLOCK_FOR_OPEN` | `{for item of items}` | Opening of a loop block. |
| `BLOCK_FOR_CLOSE` | `{/for}` | Closing of a loop block. |
| `BLOCK_ASYNC_OPEN` | `{async user = fetchUser()}` | Opening of an async block. |
| `BLOCK_ASYNC_LOADING` | `{loading}` | Loading section of an async block. |
| `BLOCK_ASYNC_ERROR` | `{error}` | Error section of an async block. |
| `BLOCK_ASYNC_CLOSE` | `{/async}` | Closing of an async block. |

---

## Special Handling

- **`<script>` Block Isolation**: Content inside `<script>` is captured as raw text without tokenizing internal curly braces `{ }`, ensuring imports like `import { Router } from "nuvsha"` are never broken.
- **HTML Comments**: Comments (`<!-- ... -->`) are ignored during tokenization.
- **Void Elements**: HTML void tags (like `<input>`, `<img>`, `<br>`) are automatically marked `isSelfClosing = true`.
