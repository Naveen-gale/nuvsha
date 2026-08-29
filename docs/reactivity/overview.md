# Reactivity Overview

Reactivity is the ability of a user interface to update automatically when the underlying data changes.

In Nuvsha, reactivity is designed to be **invisible**. You don't have to call a `setState` function or wrap your variables in `ref()` or `reactive()`. You just write normal JavaScript assignments.

## How it works

1. **State:** You declare variables in your `<script>` block.
2. **UI Expression:** You use those variables in your HTML using `{ ... }` expressions.
3. **Event/Update:** An event occurs (like a button click) that changes the variable.
4. **Updated DOM:** Nuvsha immediately updates the precise DOM node that relies on that variable.

## No Virtual DOM

Nuvsha achieves this performance without a Virtual DOM. During the build process, the Nuvsha compiler figures out exactly which parts of the DOM are dynamic and generates highly specific JavaScript to update *only* those parts using localized "dirty checking".
