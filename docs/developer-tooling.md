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

The extension is currently in active development (Phase 17):
- **Phase 17.1**: Extension Foundation (Completed)
- **Phase 17.2**: Language Recognition & `.nuv` File Association (Completed)
- **Phase 17.3**: Syntax Highlighting with TextMate Grammar (Completed)
- **Phases 17.4 - 17.10**: Snippets, Autocomplete, Diagnostics, Hover, Definition (Upcoming)

### Phase 17.3: Syntax Highlighting

#### What is Syntax Highlighting?
Syntax highlighting colors different parts of your code (like tags, keywords, variables, and strings) so it is easier to read, write, and understand. VS Code uses TextMate grammars (`.tmLanguage.json`) to assign standard scopes to code patterns. Themes in VS Code read these scopes to apply colors.

#### Grammar Architecture (`nuvsha-vscode/syntaxes/nuvsha.tmLanguage.json`)
The Nuvsha grammar recognizes the official Nuvsha syntax:
1. **Script Blocks**: `<script> ... </script>` embeds the full `source.js` grammar for standard JavaScript highlighting.
2. **HTML Elements & Tags**: Standard HTML tags (`<div>`, `<button>`, `<input>`, etc.) and self-closing tags (`<input />`).
3. **Component Tags**: Tags beginning with a capital letter (`<Card />`, `<Button>...</Button>`) are highlighted distinctly as component classes.
4. **Attributes & Props**: Standard attributes (`class`, `id`), component props (`title={title}`), boolean attributes (`disabled`).
5. **Two-Way Binding**: `bind={varName}` attributes highlighted as reactive binding controls.
6. **Events**: `onclick="..."`, `onsubmit="..."`, and expression events `onclick={handler}`.
7. **Control Flow Blocks**:
   - Conditionals: `{if condition}`, `{else if condition}`, `{else}`, `{/if}`
   - Loops: `{for item of items}`, `{/for}`
   - Async Blocks: `{async varName = expr}`, `{loading}`, `{error}`, `{/async}`
8. **Interpolation Expressions**: `{name}`, `{count + 1}`, `{user.name}`, `{items.length}` embedded with JavaScript expressions.
9. **Comments**: HTML comments `<!-- ... -->`.

#### How to Test Highlighting
1. Open the `nuvsha-vscode` folder in VS Code.
2. Press `F5` (or run `code --extensionDevelopmentPath=nuvsha-vscode nuvsha-vscode/test/fixtures/syntax-showcase.nuv`).
3. Open `syntax-showcase.nuv` to see all supported syntax highlighted in your active theme.

