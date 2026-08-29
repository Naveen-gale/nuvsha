import { compile } from './src/compiler/index.js';
import { transformScript } from './src/compiler/script.js';

console.log("=== children test ===");
console.log(compile('<div>{children}</div>'));

console.log("=== slot test ===");
console.log(compile('<Card><p>Hello</p></Card>'));

console.log("=== transform test ===");
console.log(transformScript('title = "Untitled"\ncount = 0'));
