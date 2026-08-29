# What is Nuvsha?

Nuvsha is a lightweight JavaScript framework for building user interfaces.

It allows you to build reactive web applications using familiar HTML and simple JavaScript without the complex rules and heavy abstractions of other modern frameworks.

## The Core Concept

In Nuvsha, you write **Single File Components** (files ending in `.nuv`). 

A Nuvsha component is simply a mix of:
1. A `<script>` block where you write normal JavaScript variables and logic.
2. An HTML template where you write your user interface.

Whenever a variable in your `<script>` changes, Nuvsha automatically updates the exact part of the HTML that depends on it.
