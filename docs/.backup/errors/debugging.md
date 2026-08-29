# Debugging Nuvsha Applications

When Nuvsha encounters an error while compiling your `.nuv` files, it will stop and display a beginner-friendly diagnostic message. This guide helps you understand how to approach debugging in Nuvsha.

## Using the Code Frame

The code frame is your best tool for finding the exact location of an error.

```text
  3 | <div>
  4 |   <h1>Hello</h1>
> 5 | </div>
    | ^
```

- `>` indicates the line where the compiler got stuck.
- `^` points to the exact column.

Always read the `Hint` provided at the bottom of the error. The Nuvsha compiler tries to give you actionable advice based on what it was expecting to find.

## Fixing HTML Errors

Nuvsha uses an HTML-like syntax. The most common errors are related to unclosed or mismatched tags.

**Missing Closing Tag ([NV1003](error-codes.md))**
```html
<div>
  <h1>Welcome
</div>
```
*Fix:* The `<h1>` tag must be closed before the `<div>` is closed. Add `</h1>`.

**Invalid Attribute ([NV1009](error-codes.md))**
```html
<button class="btn" onclick=>
```
*Fix:* Attributes must either have a value (`onclick="handleClick"`) or be boolean (`disabled`).

## Fixing Expressions

Nuvsha expressions are wrapped in `{braces}`.

**Unclosed Expression ([NV1004](error-codes.md))**
```html
<p>Welcome back, {user.name</p>
```
*Fix:* Ensure you have a closing `}` for every `{`.

## Fixing Conditions and Loops

Special blocks in Nuvsha also use `{braces}` and must be closed with a matching `/{block}` tag.

**Unclosed If ([NV1003](error-codes.md))**
```html
{if show}
  <p>Hello!</p>
```
*Fix:* Add `{/if}` at the end of the block.

**Unexpected Else ([NV1007](error-codes.md))**
```html
<div>Hello</div>
{else}
<p>Goodbye</p>
```
*Fix:* `{else}` can only exist immediately inside an `{if}` block.

**Invalid For Loop ([NV1008](error-codes.md))**
```html
{for item in items}
```
*Fix:* Nuvsha loops use `of`, similar to modern JavaScript `for...of` loops: `{for item of items}`.

## Fixing Vite Errors

Because Nuvsha is deeply integrated with Vite via `vite-plugin-nuvsha`, any compiler error in your `.nuv` files will automatically trigger Vite's error overlay in your browser and log the formatted error frame to your terminal.

If the browser overlay appears, simply fix the error in your editor, save the file, and Vite will automatically recompile and dismiss the overlay if the error is resolved.
