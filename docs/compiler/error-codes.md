# Error Codes

Here is the complete reference of Nuvsha compiler error codes and how to fix them.

## NV1001: Parse Error
A general syntax error occurred during parsing. Review the line indicated in the code frame.

## NV1002: Unexpected Closing Tag
You provided a closing tag (e.g., `</div>`) that doesn't match the currently open tag. 
**Fix**: Ensure your HTML tags are properly nested.

## NV1003: Missing Closing Tag
An HTML tag, `{if}` block, or `{for}` loop was opened but never closed.
**Fix**: Add the missing closing tag or `{/if}` / `{/for}` keyword.

## NV1004: Unclosed Expression Block
You started an expression with `{` but never closed it with `}`.
**Fix**: If you meant to write a literal curly brace, use HTML entities: `&#123;`. Otherwise, close the expression.

## NV1005: Invalid Variable Declaration
The syntax inside your `<script>` block is invalid.

## NV1006: Missing If Condition
You wrote `{if}` or `{else if}` without providing a JavaScript condition.
**Fix**: `{if isOpen}`

## NV1007: Unexpected Else Block
You wrote an `{else}` or `{else if}` without a preceding `{if}` block.

## NV1008: Invalid For Loop
The syntax in your `{for ...}` loop is invalid. 
**Fix**: The required format is `{for item of items}` or `{for (item, index) of items}`.

## NV1009: Invalid Attribute Binding
You attempted to bind an attribute incorrectly.
**Fix**: Use the format `bind={variableName}` or `src={url}`. Do not put quotes around the curly braces.
