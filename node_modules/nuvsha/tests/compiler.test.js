import test from 'node:test';
import assert from 'node:assert';
import { tokenize } from '../src/compiler/lexer.js';
import { parse } from '../src/compiler/parser.js';
import { generate } from '../src/compiler/compiler.js';
import { compile } from '../src/compiler/index.js';
import { transformScript } from '../src/compiler/script.js';

test('Lexer tokenizes expressions', (t) => {
  const input = '<p>Name: {name}</p>';
  const tokens = tokenize(input);
  
  assert.strictEqual(tokens.length, 4); // <p>, "Name: ", "{name}", </p>
  assert.strictEqual(tokens[1].type, 'TEXT');
  assert.strictEqual(tokens[1].value, 'Name: ');
  assert.strictEqual(tokens[2].type, 'EXPRESSION');
  assert.strictEqual(tokens[2].value, 'name');
});

test('Lexer tokenizes expression attributes', (t) => {
  const input = '<button onclick={() => count++}>';
  const tokens = tokenize(input);
  
  assert.strictEqual(tokens[0].attributes.onclick.type, 'expression');
  assert.strictEqual(tokens[0].attributes.onclick.value, '() => count++');
});

test('Parser builds ComponentNode with script', (t) => {
  const input = '<script>const a = 1;</script><div>Hello</div>';
  const tokens = tokenize(input);
  const ast = parse(tokens);
  
  assert.strictEqual(ast.type, 'Component');
  assert.ok(ast.script.includes('const a = 1;'));
  
  assert.strictEqual(ast.template[0].type, 'Element');
  assert.strictEqual(ast.template[0].tagName, 'div');
});

test('Parser builds ComponentNode with multiple root nodes', (t) => {
  const input = '<div>1</div><div>2</div>';
  const tokens = tokenize(input);
  const ast = parse(tokens);
  
  assert.strictEqual(ast.template.length, 2);
  assert.strictEqual(ast.template[0].tagName, 'div');
  assert.strictEqual(ast.template[1].tagName, 'div');
});

test('Compiler generates JavaScript for expressions and scripts', (t) => {
  const input = '<script>const a = 1;</script><div>{a}</div>';
  const code = compile(input);
  
  // It should contain the user's script
  assert.ok(code.includes('const a = 1;'));
  
  // It should contain our element creation
  assert.ok(code.includes('document.createElement("div")'));
  
  // It should contain the JS expression binding
  assert.ok(code.includes('document.createTextNode(String(a))'));
});

test('transformScript converts simplified variables', (t) => {
  const raw = 'name = "Alex"\n  count = 0\n';
  const transformed = transformScript(raw);
  
  assert.ok(transformed.includes('let name = "Alex"'));
  assert.ok(transformed.includes('  let count = 0'));
});

test('Lexer tokenizes if blocks', (t) => {
  const input = '{if loggedIn}<p>Yes</p>{else}<p>No</p>{/if}';
  const tokens = tokenize(input);
  
  assert.strictEqual(tokens[0].type, 'BLOCK_IF_OPEN');
  assert.strictEqual(tokens[0].condition, 'loggedIn');
  assert.strictEqual(tokens[4].type, 'BLOCK_ELSE');
  assert.strictEqual(tokens[8].type, 'BLOCK_IF_CLOSE');
});

test('Compiler generates if statements', (t) => {
  const input = '{if loggedIn}<p>Yes</p>{else}<p>No</p>{/if}';
  const code = compile(input);
  
  assert.ok(code.includes('if (loggedIn) {'));
  assert.ok(code.includes('} else {'));
  assert.ok(code.includes('document.createElement("p")'));
});

test('Lexer tokenizes for blocks', (t) => {
  const input = '{for item of items}<li>{item}</li>{/for}';
  const tokens = tokenize(input);
  
  assert.strictEqual(tokens[0].type, 'BLOCK_FOR_OPEN');
  assert.strictEqual(tokens[0].expression, 'item of items');
  assert.strictEqual(tokens[4].type, 'BLOCK_FOR_CLOSE');
});

test('Compiler generates for statements', (t) => {
  const input = '{for item of items}<li>{item}</li>{/for}';
  const code = compile(input);
  
  assert.ok(code.includes('for (const item of items) {'));
  assert.ok(code.includes('document.createElement("li")'));
});

test('Compiler generates event listeners for string and expression handlers', (t) => {
  const input = '<button onclick="count++"></button><button onclick={() => count++}></button>';
  const code = compile(input);
  
  assert.ok(code.includes('.onclick = (e) => { count++; $update(); };'));
  assert.ok(code.includes('.onclick = (e) => { (() => count++)(e); $update(); };'));
});
