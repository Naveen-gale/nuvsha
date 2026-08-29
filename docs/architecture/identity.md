# Nuvsha Identity and Editor Integration

This document outlines the architecture for Nuvsha's brand identity, file extensions, and future editor integration. Nuvsha's architecture strictly separates the concerns of compilation, project generation, and editor experience.

## Language Identity

- **Name**: Nuvsha
- **Extension**: `.nuv`
- **Language ID**: `nuvsha`

The `.nuv` file extension represents a Nuvsha Single-File Component (SFC) which encapsulates HTML markup, Javascript logic (in `<script>` tags), and reactive Nuvsha syntax.

## Separation of Concerns

### 1. Compiler (`.nuv` &rarr; JavaScript)
The Nuvsha compiler's sole responsibility is transforming a `.nuv` file into standard DOM JavaScript. It handles the Lexer, Parser, AST generation, and Code Emission. 

*Rule*: **Do not put editor-specific logic (like syntax highlighting tokens or language server responses) into the compiler.**

### 2. CLI / Project Generator (`create-nuvsha`)
The `create-nuvsha` package is responsible for scaffolding new projects. It sets up Vite, installs Tailwind CSS, creates the initial `App.nuv` starter UI, and configures the build pipeline. It uses the `nuvsha.svg` logo to establish brand identity out-of-the-box.

### 3. Build Pipeline (Vite)
Vite handles the development server, hot module reloading (HMR), and the production build. The `nuvsha/vite-plugin` acts as the bridge between Vite and the Nuvsha compiler.

### 4. Editor Experience (Future VS Code Extension)
Editor features will be handled by a dedicated VS Code Extension in the future. The architecture for this extension will be:

```text
.nuv file
   ↓
Nuvsha Language ID (`nuvsha`)
   ↓
File Icon (Nuvsha SVG)
   ↓
Syntax Highlighting (TextMate grammar)
   ↓
Autocomplete / Language Server
   ↓
Diagnostics / Linter
```

The extension will define the `nuvsha` language ID and map it to `.nuv` files. It will reuse the Nuvsha SVG symbol for its icon theme.

## Brand Assets

- **Logo/Symbol**: A simple, vector-based SVG logo representing Nuvsha. It is used as the default favicon in generated projects and in the playground.
- **Location**: `create-nuvsha/templates/default/public/nuvsha.svg`
