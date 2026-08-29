# Error Codes Reference

When the compiler fails, look up the `NVxxxx` code in your terminal.

- **NV1001**: Parse Error (general syntax issue).
- **NV1002**: Unexpected Closing Tag (`<div>...</span>`).
- **NV1003**: Missing Closing Tag (`<div>` left open at end of file).
- **NV1004**: Unclosed Expression Block (missing `}`).
- **NV1005**: Invalid Variable Declaration inside `<script>`.
- **NV1006**: Missing If Condition (`{if}` without an expression).
- **NV1007**: Unexpected Else Block (`{else}` without a preceding `{if}`).
- **NV1008**: Invalid For Loop (missing `of` keyword).
- **NV1009**: Invalid Attribute Binding (used quotes around `bind={var}`).
