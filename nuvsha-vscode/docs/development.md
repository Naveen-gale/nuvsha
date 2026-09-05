# Nuvsha VS Code Extension Architecture

## Overview

The Nuvsha VS Code Extension connects the VS Code editor to the Nuvsha compiler, providing an integrated development experience for `.nuv` files.

## Architecture

The extension acts as a bridge:

```
VS Code
   ↓
Nuvsha Extension
   ↓
Language Configuration
   ↓
Syntax Grammar
   ↓
Snippets
   ↓
Language Features
   ↓
Nuvsha Compiler
```

- **Language Configuration**: Defines basic editor behaviors like commenting (`<!-- -->`) and bracket matching.
- **Syntax Grammar**: A TextMate grammar (`nuvsha.tmLanguage.json`) providing syntax highlighting.
- **Snippets**: Predefined code blocks for beginner-friendly Nuvsha authoring.
- **Language Features**: Scripts in `src/` providing advanced IDE features.
- **Nuvsha Compiler**: Eventually, the extension will communicate with the Nuvsha compiler for deep semantic understanding, diagnostics, and completions.

## Planned Implementation Phases

1. **17.1 Extension foundation** (Completed) - Basic project structure and file stubs.
2. **17.2 .nuv language recognition** (Completed) - VS Code recognizes `.nuv` files.
3. **17.3 Syntax highlighting** (Completed) - Detailed TextMate grammar in `syntaxes/nuvsha.tmLanguage.json`.
4. **17.4 Snippets** (Completed) - 41 comprehensive snippets in `snippets/nuvsha.json` covering components, control flow, binding, routing, async, and HTML.
5. **17.5 Autocomplete** - Intelligent completion using compiler parsing.
6. **17.6 Diagnostics** - Mapping compiler errors (NV10xx) to the editor.
7. **17.7 Go to definition** - Component import tracking.
8. **17.8 Hover** - Documentation inside the editor.
9. **17.9 Component/import intelligence** - Deep project awareness.
10. **17.10 Final testing** - E2E verification.

## Phase 17.3: Syntax Highlighting Architecture

### 1. What is Syntax Highlighting?
Syntax highlighting enables editors to scan source code and color tokens (keywords, tags, attributes, strings, comments) based on the editor's active color theme.

### 2. The Grammar File Location
```
nuvsha-vscode/syntaxes/nuvsha.tmLanguage.json
```
This file is registered in `package.json` under `contributes.grammars` for language `nuvsha` with scope `source.nuvsha`.

### 3. How the Nuvsha Grammar Works
The grammar uses regular expressions and TextMate rules organized into a repository:
- `#comments`: Matches `<!-- ... -->` with `comment.block.html`.
- `#script`: Captures `<script> ... </script>` and delegates inner code to VS Code's built-in `source.js` grammar.
- `#blocks`: High-priority rules matching Nuvsha template blocks before generic expressions:
  - `#block-if`: `{if condition}`
  - `#block-else-if`: `{else if condition}`
  - `#block-else`: `{else}`
  - `#block-if-close`: `{/if}`
  - `#block-for`: `{for item of items}`
  - `#block-for-close`: `{/for}`
  - `#block-async`: `{async var = expr}`
  - `#block-async-loading`: `{loading}`
  - `#block-async-error`: `{error}`
  - `#block-async-close`: `{/async}`
- `#expressions`: Matches `{expr}` and embeds `source.js` with `#nested-braces` balancing.
- `#component-tag`: Detects PascalCase tags starting with capital letters (e.g., `<Card />`) with `support.class.component.nuvsha`.
- `#html-tag`: Standard lowercase HTML elements with `entity.name.tag.html`.
- `#tag-attributes`:
  - `bind={...}`: `entity.other.attribute-name.bind.nuvsha`
  - `onclick="..."` / `onclick={...}`: `entity.other.attribute-name.event.nuvsha`
  - Standard attributes and props: `entity.other.attribute-name.html`
  - Quoted attribute values: `string.quoted.double.html` / `string.quoted.single.html`

### 4. How to Test Highlighting
- **Automated Tests**: Run `npm test` inside `nuvsha-vscode/` to validate schema and patterns.
- **Manual Verification**:
  1. Open `nuvsha-vscode` in VS Code.
  2. Press `F5` to start the Extension Development Host.
  3. Open `test/fixtures/syntax-showcase.nuv`.
  4. Verify the language mode shows **"Nuvsha"** and all elements are colorized.

## Phase 17.4: Code Snippets Architecture

### 1. Snippet File Location
```
nuvsha-vscode/snippets/nuvsha.json
```
Registered in `package.json` under `contributes.snippets` for the `nuvsha` language mode.

### 2. Design Principles
- **Accuracy**: Only supported Nuvsha syntax is included (no `@click`, no `{then`, no `bind:value`).
- **Standard Prefixes**: Intuitive `nv` prefix (`nvcomp`, `nvif`, `nvfor`, `nvbind`, `nvclick`, `nvform`, `nvasync`).
- **Tab Stops**: Pre-populated placeholders with tab-stop navigation (`${1:placeholder}`).
- **Categorization**: 41 total snippets across Component Starters, Conditionals, Loops, Expressions, Slots, Events, Form Binds, Async/Data, Routing, and HTML.

For full reference documentation of every snippet, see [`docs/snippets.md`](../../docs/snippets.md).


