# Nuvsha VS Code Extension

Developer tooling for the Nuvsha framework.

## Overview
This is a local development extension for the Nuvsha framework. It is currently in active development (Phase 17) and is not yet published to the VS Code Marketplace. 

## Features (Current Status)
- [x] Extension architecture and foundation (Phase 17.1)
- [x] `.nuv` language registration & file association (Phase 17.2)
- [x] Syntax highlighting (Phase 17.3)
- [x] Code snippets (Phase 17.4)
- [ ] Autocomplete (Phase 17.5)
- [ ] Compiler diagnostics (Phase 17.6)
- [ ] Go to definition (Phase 17.7)
- [ ] Hover documentation (Phase 17.8)
- [ ] Component/import intelligence (Phase 17.9)

## Phase 17.3 — Syntax Highlighting

### What is Syntax Highlighting?
Syntax highlighting colors the words in your `.nuv` files so that code is easy to read. Tags, attributes, strings, comments, and JavaScript expressions each get distinct colors according to your VS Code theme.

### How the Nuvsha Grammar Works
The grammar is stored in:
```
syntaxes/nuvsha.tmLanguage.json
```
It is a standard TextMate grammar that defines patterns and scopes:
- **HTML tags**: `<div class="app">`, `</button>`
- **Component tags**: `<Card title={title} />`, `<Button>...</Button>`
- **Script logic**: `<script> ... </script>` with full JavaScript highlighting
- **Interpolation expressions**: `{name}`, `{count + 1}`, `{user.name}`, `{items.length}`
- **Conditionals**: `{if condition}`, `{else if condition}`, `{else}`, `{/if}`
- **Loops**: `{for item of items}`, `{/for}`
- **Async blocks**: `{async data = fetch()}`, `{loading}`, `{error}`, `{/async}`
- **Events**: `onclick="count++"`, `onclick={handleClick}`
- **Two-way bindings**: `bind={accepted}`, `bind={username}`
- **Comments**: `<!-- HTML comment -->`

### Example `.nuv` Code
```html
<script>
  import Card from "./components/Card.nuv"

  count = 0
  name = "Alex"

  addItem = () => {
    count++
  }
</script>

<div class="container">
  <h1>Hello, {name}!</h1>

  <Card title="Counter">
    <p>Current count: {count}</p>
    <button onclick="count++">Increment</button>
  </Card>

  {if count > 0}
    <p>Count is positive!</p>
  {else}
    <p>Count is zero.</p>
  {/if}
</div>
```

## Phase 17.4 — Code Snippets

### What are Code Snippets?
Snippets are ready-to-use code templates. When working in any `.nuv` file, simply type a short prefix (e.g. `nvcomp`, `nvif`, `nvfor`) and press **Tab** or **Enter** to insert the complete, correctly formatted Nuvsha code.

### Supported Snippet Categories
The extension includes **41 snippets** in `snippets/nuvsha.json`:
- **Component Starter**: `nvcomp` (full component), `nvscript`, `nvimport`
- **Conditionals**: `nvif`, `nvifelse`, `nvelseif`, `nvelse`
- **Loops**: `nvfor` (`{for item of items}`)
- **Expressions & Slots**: `nvexpr` (`{variable}`), `nvchildren` (`{children}`)
- **Components & Props**: `nvcomponent` (`<Card title={title} />`), `nvcomponent-children`
- **Events**: `nvclick` (`onclick="count++"`), `nvclickfn`, `nvbutton`, `nvevent`
- **Form Binding**: `nvbind` (`bind={variable}`), `nvinput`, `nvcheckbox`, `nvselect`, `nvtextarea`, `nvform`
- **Async & Data**: `nvasync` (`{async data = fetch()} ... {loading} ... {error}`), `nvdata` (`data(...)`), `nvform-primitive` (`form(...)`)
- **Routing**: `nvrouter` (`<Router routes={routes} />`), `nvroutes`
- **HTML Elements**: `nvdiv`, `nvsection`, `nvmain`, `nvheader`, `nvfooter`, `nvnav`, `nvarticle`, `nvh1`, `nvh2`, `nvh3`, `nvp`, `nva`, `nvimg`, `nvul`

For the complete guide and full reference of all 41 snippets with templates and examples, see [`docs/snippets.md`](../docs/snippets.md).

## How to Test Manually (Extension Development Host)
1. Open this `nuvsha-vscode` folder in VS Code.
2. Press `F5` on your keyboard (or click **Run and Debug** -> **Run Nuvsha Extension**).
3. A new VS Code window will open with the extension active (this is the Extension Development Host).
4. Create or open any `.nuv` file (e.g. `test/fixtures/syntax-showcase.nuv`).
5. Type `nvcomp` and press **Tab**: verify a complete component is inserted!
6. Type `nvif` and press **Tab**: verify the `{if condition} ... {/if}` block is inserted!
7. Type `nvfor` and press **Tab**: verify the `{for item of items} ... {/for}` loop is inserted!

## Running Tests
Run the automated test suite with:
```bash
npm test
```
All tests validate grammar syntax, regex pattern compilation, and all 41 snippet definitions and structures.


