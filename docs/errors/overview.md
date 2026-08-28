# Nuvsha Compiler Errors

Nuvsha was designed to be easy to learn and use. A big part of that experience is how it handles mistakes.

Instead of showing you a confusing JavaScript stack trace or a generic "SyntaxError", the Nuvsha compiler stops at the first mistake it finds and provides a beginner-friendly diagnostic message.

## How to Read a Nuvsha Error

When Nuvsha encounters a problem in a `.nuv` file, it will output a structured error. Whether you see this error in your terminal or in the browser via Vite's development server, it will always follow this format:

```text
Nuvsha Error [NV1003]

Missing closing tag

File: src/App.nuv
Line: 5
Column: 1

  3 | <div>
  4 |   <h1>Hello</h1>
> 5 | </div>
    | ^

Expected:
</div>

Hint:
Expected </h1> but found </div>. Make sure every opened element is properly closed.
```

### Parts of the Error

1. **Error Code (`[NV1003]`)**: A stable identifier for the type of error. You can look these up in our [Error Codes](error-codes.md) reference.
2. **Message**: A short, simple explanation of *what* went wrong.
3. **Location (`File`, `Line`, `Column`)**: Exactly *where* the error occurred.
4. **Code Frame**: A visual snippet of your code showing the surrounding lines, with an arrow (`^`) pointing precisely to the column where the compiler got stuck.
5. **Hint**: Actionable advice on *how* to fix the problem.

## Why Custom Errors?

When you use Nuvsha, you are writing HTML-like templates mixed with JavaScript `{expressions}`. If the compiler simply threw standard JavaScript errors, a missing `</div>` might cause the internal AST generator to crash with `Cannot read properties of undefined (reading 'children')`.

By implementing our own custom Lexer and Parser, Nuvsha can track line and column numbers for every token. This allows us to catch mistakes early and explain them in terms of the Nuvsha language (like tags, conditions, and loops) rather than our internal compiler mechanics.
