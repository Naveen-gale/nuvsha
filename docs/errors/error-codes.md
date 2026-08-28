# Nuvsha Error Codes

Every Nuvsha compiler error has a stable error code. This makes it easy to search for solutions and understand exactly what went wrong.

| Code | Meaning | Common Fix |
|------|---------|------------|
| **NV1001** | Unexpected token / end of input | Make sure you properly terminate tags with `>`. |
| **NV1002** | Unexpected closing tag | You have a closing tag like `</div>` or `{/if}` but there is no block open to close. Remove the extra closing tag. |
| **NV1003** | Missing closing tag | You opened a tag (like `<h1>` or `{if}`) but closed something else, or reached the end of the file before closing it. Close the block properly. |
| **NV1004** | Unclosed expression block | You opened a `{` expression but forgot the matching `}`. |
| **NV1007** | Invalid condition syntax | You placed an `{else}` or `{else if}` outside of an `{if}` block, or your condition is malformed. |
| **NV1008** | Invalid loop syntax | Your `{for}` loop syntax is incorrect. It must match exactly: `{for item of items}`. |
| **NV1009** | Invalid attribute syntax | Check your HTML attributes. Ensure they are properly formatted (e.g. `class="btn"` or `disabled`) and values are closed. |

*Note: The Nuvsha compiler stops on the first error it finds to prevent a cascade of confusing secondary errors. Fix the reported error, save the file, and Vite will recompile to check for any others.*
