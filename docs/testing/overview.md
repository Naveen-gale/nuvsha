# Testing Overview

## What It Is

Nuvsha includes automated testing suites to guarantee framework stability, prevent regressions, and verify that all compiler and runtime features work as expected.

---

## Running Tests

To run the full test suite, run:

```bash
npm run test
```

This executes Node.js's native test runner (`node:test`) across all test files located in `nuvsha/tests/`.

---

## Test Suites

1. **Compiler Tests (`nuvsha/tests/compiler.test.js`)**: Tests tokenization, AST generation, variable transformations, and code generation across all phases.
2. **Router Tests (`nuvsha/tests/router.test.js`)**: Tests route matching, 404 fallback, navigation, history, and link click interception using a mocked DOM environment.
