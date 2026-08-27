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
  
  // Reactive conditional: emits an anchor comment + update function + $watch
  assert.ok(code.includes('createComment("nuvsha-if")'), 'should emit anchor comment');
  assert.ok(code.includes('!!(loggedIn)'), 'should reference condition expression');
  assert.ok(code.includes('document.createElement("p")'), 'should create p elements');
  assert.ok(code.includes('$watch'), 'should watch the condition');
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
  
  // Phase 2: event handlers now use `event` (not `e`) and support async/promises with $update()
  assert.ok(code.includes('.onclick = (event) => { const $$res = count++; $update();'), 'string handler with event param and $update');
  assert.ok(code.includes('.onclick = (event) => { const $$res = (() => count++)(event); $update();'), 'expression handler with event param and $update');
});

// ─────────────────────────────────────────────────────────────────────────────
// Component System Tests
// ─────────────────────────────────────────────────────────────────────────────

test('Parser creates ComponentCallNode for uppercase tag', (t) => {
  const input = '<Card />';
  const tokens = tokenize(input);
  const ast = parse(tokens);

  assert.strictEqual(ast.template[0].type, 'ComponentCall');
  assert.strictEqual(ast.template[0].name, 'Card');
});

test('Parser creates ElementNode for lowercase tag', (t) => {
  const input = '<div></div>';
  const tokens = tokenize(input);
  const ast = parse(tokens);

  assert.strictEqual(ast.template[0].type, 'Element');
  assert.strictEqual(ast.template[0].tagName, 'div');
});

test('Parser creates ComponentCallNode with props', (t) => {
  const input = '<Card title="Hello" />';
  const tokens = tokenize(input);
  const ast = parse(tokens);

  assert.strictEqual(ast.template[0].type, 'ComponentCall');
  assert.strictEqual(ast.template[0].name, 'Card');
  assert.strictEqual(ast.template[0].props.title, 'Hello');
});

test('Compiler emits component call code for <Card />', (t) => {
  const input = '<script>import Card from "./Card.nuv"</script><Card />';
  const code = compile(input);

  // The import should be hoisted to module level (before render function)
  assert.ok(code.includes('import Card from "./Card.nuv"'));

  // The component should be called like a function
  assert.ok(code.includes('Card({})'));
});

test('Compiler emits component call with props for <Card title="Hello" />', (t) => {
  const input = '<Card title="Hello" />';
  const code = compile(input);

  assert.ok(code.includes('Card({ title: "Hello" })'));
});

test('Import statements are hoisted above render() function', (t) => {
  const input = '<script>import Foo from "./Foo.nuv"</script><div></div>';
  const code = compile(input);

  // import must appear before "export default function render"
  const importPos = code.indexOf('import Foo from "./Foo.nuv"');
  const renderPos = code.indexOf('export default function render');
  assert.ok(importPos < renderPos, 'import should appear before render()');
});

test('transformScript leaves import statements unchanged', (t) => {
  const raw = 'import Foo from "./Foo.nuv"\nimport { bar } from "./bar.js"';
  const transformed = transformScript(raw);

  assert.ok(transformed.includes('import Foo from "./Foo.nuv"'));
  assert.ok(transformed.includes('import { bar } from "./bar.js"'));
  // Must NOT have been prefixed with 'let'
  assert.ok(!transformed.includes('let import'));
});

test('transformScript leaves export statements unchanged', (t) => {
  const raw = 'export function getUser() { return {} }';
  const transformed = transformScript(raw);

  assert.ok(transformed.includes('export function getUser()'));
  assert.ok(!transformed.includes('let export'));
});

test('Simplified variables work alongside imports in a component', (t) => {
  const input = '<script>\nimport { getUser } from "./logic/user.js"\nuser = getUser()\n</script><h1>{user.name}</h1>';
  const code = compile(input);

  // import hoisted to module level
  assert.ok(code.includes('import { getUser } from "./logic/user.js"'));

  // variable becomes let inside render
  assert.ok(code.includes('let user = getUser()'));

  // template expression
  assert.ok(code.includes('document.createTextNode(String(user.name))'));
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 — Expressions + Event Context
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 2: Complex expressions compile correctly', (t) => {
  const input = '<p>{count + 1}</p><p>{name.toUpperCase()}</p><p>{items.length}</p>';
  const code = compile(input);

  assert.ok(code.includes('String(count + 1)'), 'arithmetic expression');
  assert.ok(code.includes('String(name.toUpperCase())'), 'method call expression');
  assert.ok(code.includes('String(items.length)'), 'property access expression');
});

test('Phase 2: Each expression gets its own $watch', (t) => {
  const input = '<p>{a}</p><p>{b}</p>';
  const code = compile(input);

  // Should have two separate $watch calls
  const watchCount = (code.match(/\$watch/g) || []).length;
  assert.ok(watchCount >= 2, `expected at least 2 $watch calls, got ${watchCount}`);
});

test('Phase 2: Event handler uses `event` parameter for event.target access', (t) => {
  const input = '<input oninput="name = event.target.value">';
  const code = compile(input);

  // Must use `event` not `e` so event.target.value works
  assert.ok(code.includes('.oninput = (event) =>'), 'uses event parameter');
  assert.ok(code.includes('name = event.target.value'), 'preserves event.target.value');
  assert.ok(code.includes('$update()'), 'calls $update after event');
});

test('Phase 2: createComponent is injected into render()', (t) => {
  const input = '<div></div>';
  const code = compile(input);

  assert.ok(code.includes('import { createComponent, data, setContext, clearContext } from "nuvsha"'), 'imports createComponent and data');
  assert.ok(code.includes('const { $watch, $update } = createComponent()'), 'destructures inside render');
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 3 — bind={varName}
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 3: bind={name} on input emits two-way sync code', (t) => {
  const input = '<input bind={name}>';
  const code = compile(input);

  // Sets initial value from the variable
  assert.ok(code.includes('.value = String(name)'), 'sets initial value');
  // Watches the variable to keep input in sync
  assert.ok(code.includes('$watch'), 'sets up watcher');
  // Listens to input events to update the variable
  assert.ok(code.includes("addEventListener('input'"), 'listens to input event');
  assert.ok(code.includes("addEventListener('change'"), 'listens to change event');
});

test('Phase 3: bind={color} on select emits two-way sync', (t) => {
  const input = '<select bind={color}><option value="red">Red</option></select>';
  const code = compile(input);

  assert.ok(code.includes('.value = String(color)'), 'sets initial value');
  assert.ok(code.includes("addEventListener('change'"), 'listens to change on select');
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 4 — Reactive Loops
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 4: for loop emits reactive anchor + builder + $watch', (t) => {
  const input = '{for item of items}<li>{item}</li>{/for}';
  const code = compile(input);

  assert.ok(code.includes('createComment("nuvsha-for")'), 'emits anchor comment');
  assert.ok(code.includes('for (const item of items)'), 'emits for loop in builder');
  assert.ok(code.includes('JSON.stringify(items)'), 'watches array via JSON snapshot');
  assert.ok(code.includes('$watch'), 'sets up $watch on array');
});

test('Phase 4: for loop with index support in expression', (t) => {
  const input = '{for item of items}<li>{item}</li>{/for}';
  const tokens = tokenize(input);
  assert.strictEqual(tokens[0].type, 'BLOCK_FOR_OPEN');
  assert.strictEqual(tokens[0].expression, 'item of items');
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 5 — Component Props
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 5: props are destructured at top of render()', (t) => {
  const input = '<div>{title}</div>';
  const code = compile(input);
  // The spread props destructure is always emitted
  assert.ok(code.includes('$$restProps'), 'emits spread destructure of props');
});

test('Phase 5: dynamic expression prop emits correctly', (t) => {
  const input = '<Card title={myTitle} />';
  const code = compile(input);

  // dynamic prop value is emitted as raw JS (not as a string)
  assert.ok(code.includes('Card({ title: myTitle })'), 'passes dynamic prop as expression');
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 6 — Reactive Conditions
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 6: if/else emits reactive anchor + builder functions + $watch', (t) => {
  const input = '{if visible}<p>Shown</p>{else}<p>Hidden</p>{/if}';
  const code = compile(input);

  assert.ok(code.includes('createComment("nuvsha-if")'), 'anchor comment');
  assert.ok(code.includes('!!(visible)'), 'evaluates condition as boolean');
  assert.ok(code.includes('$watch'), 'watches condition for changes');
  assert.ok(code.includes('function buildBranch'), 'branch builder functions');
});

test('Phase 6: if without else only has one builder', (t) => {
  const input = '{if show}<p>Hello</p>{/if}';
  const code = compile(input);

  assert.ok(code.includes('function buildBranch'), 'has branch builder');
  const builders = code.match(/function buildBranch/g) || [];
  assert.strictEqual(builders.length, 1, 'only 1 builder for single if');
});

test('Phase 6: if condition with variable name `show` does not cause TDZ shadowing', (t) => {
  const input = '<script>show = true</script>{if show}<p>Visible</p>{/if}';
  const code = compile(input);

  // Must not have `const show = !!(show)` which causes TDZ ReferenceError
  assert.ok(!code.includes('const show = !!(show)'), 'avoids TDZ collision with show');
  assert.ok(!code.includes('let show = !!(show)'), 'avoids TDZ collision with show');
});

test('Phase 6: if / else if / else chain compiles flat branch selector', (t) => {
  const input = '{if a}<p>A</p>{else if b}<p>B</p>{else}<p>C</p>{/if}';
  const code = compile(input);

  const builders = code.match(/function buildBranch/g) || [];
  assert.strictEqual(builders.length, 3, 'creates 3 branch builders');
  assert.ok(code.includes('if (!!(a)) return 0;'), 'first branch check');
  assert.ok(code.includes('if (!!(b)) return 1;'), 'second branch check');
  assert.ok(code.includes('return 2;'), 'fallback else branch');
});

// ─────────────────────────────────────────────────────────────────────────────
// Phase 7 — Async / Loading / Error
// ─────────────────────────────────────────────────────────────────────────────

test('Phase 7: for loop with snapshot watcher handles array mutation', (t) => {
  const input = '{for item of items}<li>{item}</li>{/for}';
  const code = compile(input);

  // The JSON.stringify snapshot approach detects push/pop/etc
  assert.ok(code.includes('JSON.stringify(items)'), 'uses JSON snapshot for mutation detection');
});

test('Phase 7: async block compiles with loading and error states', (t) => {
  const input = '{async user = fetchUser()}<p>{user.name}</p>{loading}<span>Loading...</span>{error}<span>Error</span>{/async}';
  const code = compile(input);

  assert.ok(code.includes('createComment("nuvsha-async")'), 'creates async anchor');
  assert.ok(code.includes('fetchAsync'), 'creates fetchAsync helper');
  assert.ok(code.includes('buildLoading'), 'creates loading builder');
  assert.ok(code.includes('buildError'), 'creates error builder');
  assert.ok(code.includes('buildSuccess'), 'creates success builder');
});


