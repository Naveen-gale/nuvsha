# Compilation Pipeline

The Nuvsha compiler operates in four distinct phases:

## 1. Lexer
The Lexer reads your `.nuv` file character by character and breaks it down into "tokens". It separates HTML tags, text, expressions (`{ ... }`), and the `<script>` block.

## 2. Parser
The Parser takes the tokens and organizes them into an Abstract Syntax Tree (AST). This tree represents the hierarchical structure of your component (which element is inside which element).

## 3. Generator
The Generator walks the AST and emits JavaScript. This is where the magic happens. The generator turns your `<script>` block into reactive variables, and replaces your HTML with JavaScript instructions that create DOM nodes and attach highly specific `$watch` functions to update them.

## 4. Vite (Bundler)
Finally, Vite takes the generated JavaScript modules, resolves all your `import` statements, and bundles them into a fast application ready for the browser.
