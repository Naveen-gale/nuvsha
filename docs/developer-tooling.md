# Developer Tooling

## VS Code Extension (Nuvsha)

The Nuvsha framework includes a dedicated Visual Studio Code extension to provide a first-class developer experience.

### Overview

The extension provides intelligent language features for `.nuv` files, including:
- Recognition of the `.nuv` language ID.
- Advanced syntax highlighting.
- Code snippets for rapid component scaffolding.
- Integration with the Nuvsha compiler for deep semantic understanding (autocomplete, diagnostics, go-to-definition).

### Architecture

The extension acts as a bridge between the VS Code editor and the Nuvsha compiler:

1. **Language Configuration**: Defines basic editor behaviors (brackets, comments).
2. **Syntax Grammar**: TextMate grammar for coloring `.nuv` files.
3. **Language Features**: Scripts bridging the IDE to the compiler.

```
VS Code -> Nuvsha Extension -> Nuvsha Compiler
```

### Setup for Contributors

The extension source code is located in the `nuvsha-vscode/` directory.

To test the extension locally during development:
1. Open the `nuvsha-vscode` folder in VS Code.
2. Press `F5` to open the Extension Development Host window.
3. Open any project using Nuvsha (e.g., `nuvsha-master-test`) to see the extension in action.

### Phase 17 Status

The extension is currently in active development (Phase 17). The foundation and structural architecture are complete, establishing `.nuv` as a recognized language and preparing the modules for semantic parsing and compiler integration in upcoming sub-phases.
