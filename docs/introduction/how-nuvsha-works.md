# How Nuvsha Works

Unlike frameworks such as React or Vue, Nuvsha **does not use a Virtual DOM**.

## The Compiler

Nuvsha is primarily a compiler. When you build your application or run the development server, Nuvsha takes your `.nuv` files and transforms them into standard, highly optimized vanilla JavaScript.

It analyzes your HTML template to figure out exactly which parts are dynamic (using `{ ... }` expressions).

## Scoped Dirty-Checking

Instead of comparing a massive Virtual DOM tree every time a variable changes, Nuvsha uses a technique called **component-scoped dirty-checking**.

When a variable updates (e.g. from an event listener), Nuvsha runs a tiny, highly localized update function that *only* checks the expressions within that specific component. It then updates the real DOM text nodes and attributes directly.

This means updates are incredibly fast and memory-efficient.
