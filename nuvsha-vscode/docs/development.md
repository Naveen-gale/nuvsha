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
3. **17.3 Syntax highlighting** - Detailed TextMate grammar.
4. **17.4 Snippets** - Advanced code generation.
5. **17.5 Autocomplete** - Intelligent completion using compiler parsing.
6. **17.6 Diagnostics** - Mapping compiler errors (NV10xx) to the editor.
7. **17.7 Go to definition** - Component import tracking.
8. **17.8 Hover** - Documentation inside the editor.
9. **17.9 Component/import intelligence** - Deep project awareness.
10. **17.10 Final testing** - E2E verification.
