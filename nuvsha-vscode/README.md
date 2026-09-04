# Nuvsha VS Code Extension

Developer tooling for the Nuvsha framework.

## Overview
This is a local development extension for the Nuvsha framework. It is currently in active development (Phase 17) and is not yet published to the VS Code Marketplace. 

## Features (Current Status)
- [x] Extension architecture and foundation
- [x] `.nuv` language registration
- [ ] Syntax highlighting
- [ ] Code snippets
- [ ] Autocomplete
- [ ] Compiler diagnostics
- [ ] Go to definition
- [ ] Component/import intelligence

## How to use locally
1. Open this `nuvsha-vscode` folder in VS Code.
2. Press `F5` to open a new Extension Development Host window.
3. Open an `App.nuv` file (e.g., in `nuvsha-master-test/src/App.nuv`) in the new window.
4. You should see `.nuv` recognized as the Nuvsha language.

## Development Workflow
When contributing to this extension, please run tests using `npm test`.
