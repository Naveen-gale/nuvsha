import test from 'node:test';
import assert from 'node:assert';
import { tokenize } from '../src/compiler/lexer.js';
import { parse } from '../src/compiler/parser.js';
import { generate } from '../src/compiler/compiler.js';
import { compile } from '../src/compiler/index.js';

test('Lexer tokenizes expressions', (t) => {
  const input = '<p>Name: {name}</p>';
  const tokens = tokenize(input);
  
  assert.strictEqual(tokens.length, 4); // <p>, "Name: ", "{name}", </p>
  assert.strictEqual(tokens[1].type, 'TEXT');
  assert.strictEqual(tokens[1].value, 'Name: ');
  assert.strictEqual(tokens[2].type, 'EXPRESSION');
  assert.strictEqual(tokens[2].value, 'name');
});

test('Parser builds ComponentNode with script', (t) => {
  const input = '<script>const a = 1;</script><div>Hello</div>';
  const tokens = tokenize(input);
  const ast = parse(tokens);
  
  assert.strictEqual(ast.type, 'Component');
  assert.ok(ast.script.includes('const a = 1;'));
  
  assert.strictEqual(ast.template.type, 'Element');
  assert.strictEqual(ast.template.tagName, 'div');
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
