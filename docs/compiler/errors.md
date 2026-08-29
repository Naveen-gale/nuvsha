# Compiler Errors

Because Nuvsha compiles your code, it can catch many mistakes before you even open your browser.

When you make a syntax error in a `.nuv` file, the Nuvsha compiler will print a highly detailed diagnostic message in your terminal.

## Example Error Output

```text
Nuvsha Error [NV1003]: Missing Closing Tag

The tag <div> was opened but never closed.

  5 | <div class="container">
  6 |   <h1>Hello</h1>
> 7 |   <p>Welcome
    |            ^
  8 | </script>
```

The error includes:
1. **Error Code**: E.g., `NV1003`.
2. **Description**: What went wrong.
3. **Code Frame**: The exact file, line number, and column where the error occurred.
