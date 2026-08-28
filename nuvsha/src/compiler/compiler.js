import { transformScript } from './script.js';

/**
 * Nuvsha Compiler — compiler.js  (Code Generator)
 *
 * This is the final step in the compiler pipeline:
 *
 *   .nuv source
 *    ↓ lexer.js      → tokens
 *    ↓ parser.js     → AST
 *    ↓ compiler.js   → JavaScript code string
 *
 * The generator walks the AST (the tree of nodes) and outputs JavaScript
 * that uses standard browser DOM APIs to build the UI.
 *
 * ==========================================================================
 * ARCHITECTURE OVERVIEW
 * ==========================================================================
 *
 * Generated file structure for every .nuv component:
 *
 *   // 1. Hoisted imports (must be at top-level — ES Module rule)
 *   import Card from "./Card.nuv"
 *   import { createComponent } from "nuvsha"
 *
 *   // 2. The render function — called once to build the initial DOM
 *   export default function render(props = {}) {
 *     // 2a. Component-scoped reactivity scope
 *     const { $watch, $update } = createComponent();
 *
 *     // 2b. User's variables (from <script> block)
 *     let count = 0
 *
 *     // 2c. Generated DOM-building code
 *     const el0 = document.createElement("div");
 *     const exp1 = document.createTextNode(String(count));
 *     $watch(() => String(count), (val) => exp1.textContent = val);
 *     el0.appendChild(exp1);
 *     return el0;
 *   }
 *
 * ==========================================================================
 * HOW REACTIVITY WORKS (simple explanation)
 * ==========================================================================
 *
 *   count = 0               →  let count = 0
 *   {count}                 →  createTextNode(String(count))
 *                              + $watch(() => String(count), updateFn)
 *   onclick="count++"       →  el.onclick = (event) => { count++; $update(); }
 *
 *   When $update() runs, it re-evaluates every $watch getter.
 *   If the value changed, it calls the callback → direct DOM update.
 *   No full re-render. No virtual DOM.
 *
 * ==========================================================================
 * PHASE COVERAGE
 * ==========================================================================
 *
 *   Phase 1: Reactive state (createComponent, $watch, $update)
 *   Phase 2: Expressions {x}, {x + 1}, {x.y}, events with `event` access
 *   Phase 3: bind={var} on input/checkbox/select
 *   Phase 4: Reactive loops — {for item of items} with array-wrapper
 *   Phase 5: Component props — <Card title="Hi" /> → title accessible in Card
 *   Phase 6: Reactive conditions — {if x} ... {else} ... {/if}
 *   Phase 7: Async states — {async} {loading} {error} {/async}
 */

// ============================================================================
// UTILITY — Extract imports/exports from script block
// ============================================================================

/**
 * Splits the script block content into:
 *   - `imports`: lines that start with `import` or `export` (must be module top-level)
 *   - `body`:    everything else (goes inside render())
 *
 * WHY: ES Modules require `import` at file top-level. Putting imports inside
 * a function causes a SyntaxError. So we hoist them.
 */
function extractImports(script) {
  const importLines = [];
  const bodyLines = [];

  for (const line of script.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('export ')) {
      importLines.push(line);
    } else {
      bodyLines.push(line);
    }
  }

  return {
    imports: importLines.join('\n'),
    body: bodyLines.join('\n'),
  };
}

// ============================================================================
// UTILITY — Serialize props object → JS object literal string
// ============================================================================

/**
 * Turns an AST props object into a JavaScript object literal string.
 *
 * Examples:
 *   { title: "Hello" }                          → '{ title: "Hello" }'
 *   { label: { type: 'expression', value:'x' } }→ '{ label: x }'
 *   { disabled: true }                          → '{ disabled: true }'
 *
 * Dynamic props use expression wrappers: { type: 'expression', value: 'expr' }
 */
function serializeProps(props) {
  if (!props || Object.keys(props).length === 0) return '{}';

  const pairs = Object.entries(props)
    // Skip the special 'children' slot key — handled separately
    .filter(([key]) => key !== '__children__')
    .map(([key, value]) => {
      if (value === true) {
        return `${key}: true`;
      } else if (typeof value === 'object' && value.type === 'expression') {
        if (key.startsWith('on')) {
          // Component event with expression body e.g. onchange={() => count++}
          return `${key}: handleEvent(($event) => (${value.value})($event), $update)`;
        }
        return `${key}: ${value.value}`;
      } else {
        if (key.startsWith('on')) {
          // Component event with string body e.g. onchange="count = $event"
          return `${key}: handleEvent(($event) => { ${value} }, $update)`;
        }
        const safe = String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        return `${key}: "${safe}"`;
      }
    });

  return `{ ${pairs.join(', ')} }`;
}

// ============================================================================
// MAIN CODE GENERATOR
// ============================================================================

/**
 * Walks the AST and emits JavaScript code.
 *
 * @param {Object} componentNode — The root ComponentNode from the parser
 * @returns {string} — Valid JavaScript module code
 */
export function generate(componentNode) {
  const { imports: userImports, body: scriptBody } = extractImports(componentNode.script);
  const processedBody = transformScript(scriptBody);

  // ── Module-level code (imports must be here, not inside a function) ─────
  let code = '';

  if (userImports.trim()) {
    code += userImports.trim() + '\n';
  }

  code += `import { createComponent, data, form, setContext, clearContext, handleEvent } from "nuvsha";\n`;
  code += `\n`;

  // ── The render function ──────────────────────────────────────────────────
  code += `// Auto-generated by Nuvsha compiler\n`;
  code += `export default function render(props = {}) {\n`;

  // Each component instance gets its own isolated $watch and $update
  code += `  const { $watch, $update } = createComponent();\n`;

  // ── Phase 5: Destructure props so {title} works instead of {props.title} ──
  // We collect all prop names passed via the ComponentCallNode, but since we 
  // generate per-file, we destructure whatever props arrives at runtime.
  // The developer writes {title} and we emit a destructure of props.
  //
  // However — we only do this if there are no local variables with the same
  // name (which would shadow). For safety, we destructure ALL props at the
  // start of render() so child components can use {title} instead of {props.title}.
  //
  // The destructure is guarded: if props has no keys it's harmless.
  code += `  // Props destructured so you can write {title} instead of {props.title}\n`;
  code += `  const { ${getPropsDestructure(componentNode, processedBody)} ...$$restProps } = props;\n`;

  if (processedBody.trim()) {
    code += `  // Your script variables\n`;
    code += `  setContext($update);\n`;
    code += processedBody.split('\n').map(l => l ? `  ${l}` : l).join('\n') + '\n';
    code += `  clearContext();\n`;
    code += `\n`;
  }

  code += `  // Generated DOM\n`;

  let counter = 0;
  function nextId(prefix = 'el') {
    return `${prefix}${counter++}`;
  }

  // ── Recursive AST walker ─────────────────────────────────────────────────
  function walk(node) {
    // ── Plain HTML element ─────────────────────────────────────────────────
    if (node.type === 'Element') {
      const elName = nextId('el');
      const tag = node.tagName;
      let bindVarName = null;

      code += `  const ${elName} = document.createElement("${tag}");\n`;

      // Process attributes
      if (node.attributes) {
        for (const [key, value] of Object.entries(node.attributes)) {

          // ── Phase 3: bind={varName} ────────────────────────────────────
          if (key === 'bind') {
            bindVarName = typeof value === 'object' && value.type === 'expression'
              ? value.value
              : String(value);
            emitBind(elName, tag, bindVarName);
            continue;
          }

          // Boolean attribute e.g. disabled
          if (value === true) {
            code += `  ${elName}.setAttribute("${key}", "");\n`;
            continue;
          }

          // Expression attribute e.g. value={count} or onclick={fn}
          if (typeof value === 'object' && value.type === 'expression') {
            if (key.startsWith('on')) {
              // Event with expression body e.g. onclick={() => count++}
              // We wrap it so it calls $update() synchronously and after promise resolution
              if (tag === 'form' && key === 'onsubmit') {
                code += `  ${elName}.${key} = handleEvent((event) => { event.preventDefault(); return (${value.value})(event); }, $update);\n`;
              } else {
                code += `  ${elName}.${key} = handleEvent((event) => (${value.value})(event), $update);\n`;
              }
            } else {
              // Reactive attribute value e.g. value={count}
              code += `  ${elName}.setAttribute("${key}", String(${value.value}));\n`;
              code += `  $watch(() => String(${value.value}), (val) => ${elName}.setAttribute("${key}", val));\n`;
            }
            continue;
          }

          // Plain string attribute e.g. class="foo", onclick="count++"
          if (key.startsWith('on')) {
            // ── Phase 2: event context — `event` variable is available ────
            // We compile "count++" into: (event) => { const $$res = count++; $update(); if ($$res && typeof $$res.then === 'function') ... }
            // The `event` variable is the real browser Event object.
            // This means `event.target.value` works naturally.
            if (tag === 'form' && key === 'onsubmit') {
              code += `  ${elName}.${key} = handleEvent((event) => { event.preventDefault(); ${value} }, $update);\n`;
            } else {
              code += `  ${elName}.${key} = handleEvent((event) => { ${value} }, $update);\n`;
            }
          } else {
            const safeValue = String(value).replace(/"/g, '\\"');
            code += `  ${elName}.setAttribute("${key}", "${safeValue}");\n`;
          }
        }
      }

      // Recurse into children
      for (const child of node.children) {
        const childName = walk(child);
        if (childName) {
          code += `  ${elName}.appendChild(${childName});\n`;
        }
      }

      // If it's a select with bind, set the initial value after options are attached
      if (tag === 'select' && bindVarName) {
        code += `  ${elName}.value = String(${bindVarName});\n`;
      }

      return elName;

    // ── Plain text ──────────────────────────────────────────────────────────
    } else if (node.type === 'Text') {
      const textName = nextId('text');
      const safe = node.value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '');
      code += `  const ${textName} = document.createTextNode("${safe}");\n`;
      return textName;

    // ── Phase 2 & 16: Expression binding {expr} and {children} ─────────────
    } else if (node.type === 'Expression') {
      const expr = node.expression;
      
      // Phase 16: {children} projection
      if (expr.trim() === 'children') {
        const slotName = nextId('children');
        code += `  const ${slotName} = (typeof props.children !== 'undefined' && props.children) ? props.children : document.createDocumentFragment();\n`;
        return slotName;
      }
      
      const expName = nextId('exp');
      code += `  const ${expName} = document.createTextNode(String(${expr}));\n`;
      code += `  $watch(() => String(${expr}), (val) => ${expName}.textContent = val);\n`;
      return expName;

      // ── Phase 5: Component call <Card title="Hello" /> ───────────────────
    } else if (node.type === 'ComponentCall') {
      const propsStr = serializeProps(node.props);

      let finalPropsObj = propsStr;
      if (node.children && node.children.length > 0) {
        const slotFragName = nextId('slotFrag');
        code += `  const ${slotFragName} = document.createDocumentFragment();\n`;
        for (const child of node.children) {
          const childName = walk(child);
          if (childName) code += `  ${slotFragName}.appendChild(${childName});\n`;
        }
        finalPropsObj = propsStr === '{}'
          ? `{ children: ${slotFragName} }`
          : propsStr.replace(/}$/, `, children: ${slotFragName} }`);
      }

      let hasDynamicProps = false;
      for (const [key, value] of Object.entries(node.props || {})) {
        if (typeof value === 'object' && value.type === 'expression') {
          hasDynamicProps = true;
        }
      }

      if (hasDynamicProps) {
        const compFragName = nextId('compFrag');
        const anchorName = nextId('anchor');
        const compName = nextId('comp');

        code += `  const ${compFragName} = document.createDocumentFragment();\n`;
        code += `  const ${anchorName} = document.createComment("nuvsha-comp");\n`;
        code += `  let ${compName}Nodes = [];\n`;

        const builderName = nextId('buildComp');
        code += `  function ${builderName}() {\n`;
        let innerPropsObj = propsStr;
        if (node.children && node.children.length > 0) {
          const slotFragName = nextId('slotFrag');
          code += `    const ${slotFragName} = document.createDocumentFragment();\n`;
          const childCode = captureWalk(node.children, '    ');
          code += childCode.code;
          for (const c of childCode.names) {
            code += `    ${slotFragName}.appendChild(${c});\n`;
          }
          innerPropsObj = propsStr === '{}'
            ? `{ children: ${slotFragName} }`
            : propsStr.replace(/}$/, `, children: ${slotFragName} }`);
        }
        code += `    return ${node.name}(${innerPropsObj});\n`;
        code += `  }\n`;

        code += `  function updateComp${compName}() {\n`;
        code += `    for (const n of ${compName}Nodes) n.parentNode && n.parentNode.removeChild(n);\n`;
        code += `    const frag = ${builderName}();\n`;
        code += `    ${compName}Nodes = Array.from(frag.childNodes);\n`;
        code += `    ${anchorName}.parentNode && ${anchorName}.parentNode.insertBefore(frag, ${anchorName});\n`;
        code += `  }\n`;

        code += `  {\n`;
        code += `    const initialFrag = ${builderName}();\n`;
        code += `    ${compName}Nodes = Array.from(initialFrag.childNodes);\n`;
        code += `    ${compFragName}.appendChild(initialFrag);\n`;
        code += `    ${compFragName}.appendChild(${anchorName});\n`;
        code += `  }\n`;

        for (const [key, value] of Object.entries(node.props || {})) {
          if (typeof value === 'object' && value.type === 'expression') {
            code += `  $watch(() => ${value.value}, () => updateComp${compName}());\n`;
          }
        }

        return compFragName;
      } else {
        const elName = nextId('el');
        code += `  const ${elName} = ${node.name}(${finalPropsObj});\n`;
        return elName;
      }


    // ── Phase 6: {if cond} ... {else} ... {/if} ───────────────────────────
    } else if (node.type === 'Conditional') {
      return emitConditional(node);

    // ── Phase 4: {for item of items} ... {/for} ───────────────────────────
    } else if (node.type === 'For') {
      return emitFor(node);

    // ── Phase 7: {async} block ─────────────────────────────────────────────
    } else if (node.type === 'Async') {
      return emitAsync(node);
    }

    return null;
  }

  // ── Phase 3: bind={varName} emission ──────────────────────────────────────
  function emitBind(elName, tagName, varName) {
    if (tagName === 'input' || tagName === 'textarea') {
      // Handle both checkbox and text inputs
      code += `  if (${elName}.type === 'checkbox') { ${elName}.checked = !!(${varName}); } else { ${elName}.value = String(${varName}); }\n`;
      code += `  $watch(() => ${varName}, (val) => {\n`;
      code += `    if (${elName}.type === 'checkbox') { if (${elName}.checked !== !!val) ${elName}.checked = !!val; }\n`;
      code += `    else { if (${elName}.value !== String(val)) ${elName}.value = String(val); }\n`;
      code += `  });\n`;
      code += `  ${elName}.addEventListener('change', (event) => {\n`;
      code += `    if (event.target.type === 'checkbox') { ${varName} = event.target.checked; }\n`;
      code += `    else { ${varName} = event.target.value; }\n`;
      code += `    $update();\n`;
      code += `  });\n`;
      code += `  ${elName}.addEventListener('input', (event) => {\n`;
      code += `    if (event.target.type !== 'checkbox') { ${varName} = event.target.value; $update(); }\n`;
      code += `  });\n`;
    } else if (tagName === 'select') {
      code += `  ${elName}.value = String(${varName});\n`;
      code += `  $watch(() => String(${varName}), (val) => { ${elName}.value = val; });\n`;
      code += `  ${elName}.addEventListener('change', (event) => { ${varName} = event.target.value; $update(); });\n`;
    }
  }

  // ── Phase 6: Reactive conditional emission ─────────────────────────────────
  function emitConditional(node) {
    const fragName = nextId('ifFrag');
    const anchorName = nextId('anchor');
    const condName = nextId('cond');

    code += `  const ${fragName} = document.createDocumentFragment();\n`;
    code += `  const ${anchorName} = document.createComment("nuvsha-if");\n`;
    code += `  let ${condName}Nodes = [];\n`;

    const branches = node.branches && node.branches.length > 0
      ? node.branches
      : [
          { condition: node.condition, children: node.consequent || [] },
          ...(node.alternate && node.alternate.length > 0 ? [{ condition: null, children: node.alternate }] : [])
        ];

    const branchBuilders = [];
    for (let bIdx = 0; bIdx < branches.length; bIdx++) {
      const branch = branches[bIdx];
      const builderName = nextId('buildBranch');
      branchBuilders.push(builderName);

      code += `  function ${builderName}() {\n`;
      code += `    const frag = document.createDocumentFragment();\n`;
      const savedCode = captureWalk(branch.children, '    ');
      code += savedCode.code;
      for (const c of savedCode.names) {
        code += `    frag.appendChild(${c});\n`;
      }
      code += `    return frag;\n`;
      code += `  }\n`;
    }

    const selectorName = `getBranch${condName}`;
    code += `  function ${selectorName}() {\n`;
    for (let bIdx = 0; bIdx < branches.length; bIdx++) {
      const branch = branches[bIdx];
      if (branch.condition) {
        code += `    if (!!(${branch.condition})) return ${bIdx};\n`;
      } else {
        code += `    return ${bIdx};\n`;
      }
    }
    if (branches.length === 0 || branches[branches.length - 1].condition !== null) {
      code += `    return -1;\n`;
    }
    code += `  }\n`;

    const renderBranchHelper = `renderBranch${condName}`;
    code += `  function ${renderBranchHelper}(idx) {\n`;
    for (let bIdx = 0; bIdx < branches.length; bIdx++) {
      code += `    if (idx === ${bIdx}) return ${branchBuilders[bIdx]}();\n`;
    }
    code += `    return document.createDocumentFragment();\n`;
    code += `  }\n`;

    code += `  let currentBranch${condName} = ${selectorName}();\n`;

    code += `  function updateCond${condName}() {\n`;
    code += `    const nextBranch = ${selectorName}();\n`;
    code += `    if (nextBranch !== currentBranch${condName}) {\n`;
    code += `      currentBranch${condName} = nextBranch;\n`;
    code += `      for (const n of ${condName}Nodes) n.parentNode && n.parentNode.removeChild(n);\n`;
    code += `      const frag = ${renderBranchHelper}(currentBranch${condName});\n`;
    code += `      ${condName}Nodes = Array.from(frag.childNodes);\n`;
    code += `      ${anchorName}.parentNode && ${anchorName}.parentNode.insertBefore(frag, ${anchorName});\n`;
    code += `    }\n`;
    code += `  }\n`;

    // Initial render directly into our local fragment
    code += `  {\n`;
    code += `    const initialFrag = ${renderBranchHelper}(currentBranch${condName});\n`;
    code += `    ${condName}Nodes = Array.from(initialFrag.childNodes);\n`;
    code += `    ${fragName}.appendChild(initialFrag);\n`;
    code += `    ${fragName}.appendChild(${anchorName});\n`;
    code += `  }\n`;

    // Watch the condition
    code += `  $watch(\n`;
    code += `    () => ${selectorName}(),\n`;
    code += `    () => updateCond${condName}()\n`;
    code += `  );\n`;

    return fragName;
  }

  // ── Phase 4: Reactive loop emission ───────────────────────────────────────
  function emitFor(node) {
    const forExpr = node.expression;
    const fragName = nextId('forFrag');
    const anchorName = nextId('anchor');
    const forName = nextId('for');

    const ofMatch = forExpr.match(/^(.+?)\s+of\s+([a-zA-Z_$][a-zA-Z0-9_$.[\]'"]*)$/);
    const arrayExpr = ofMatch ? ofMatch[2] : null;

    code += `  const ${fragName} = document.createDocumentFragment();\n`;
    code += `  const ${anchorName} = document.createComment("nuvsha-for");\n`;
    code += `  let ${forName}Nodes = [];\n`;

    const builderName = nextId('buildFor');
    code += `  function ${builderName}() {\n`;
    code += `    const frag = document.createDocumentFragment();\n`;
    code += `    for (const ${forExpr}) {\n`;
    const childCode = captureWalk(node.children, '      ');
    code += childCode.code;
    for (const c of childCode.names) {
      code += `      frag.appendChild(${c});\n`;
    }
    code += `    }\n`;
    code += `    return frag;\n`;
    code += `  }\n`;

    code += `  function updateFor${forName}() {\n`;
    code += `    for (const n of ${forName}Nodes) n.parentNode && n.parentNode.removeChild(n);\n`;
    code += `    const frag = ${builderName}();\n`;
    code += `    ${forName}Nodes = Array.from(frag.childNodes);\n`;
    code += `    ${anchorName}.parentNode && ${anchorName}.parentNode.insertBefore(frag, ${anchorName});\n`;
    code += `  }\n`;

    code += `  {\n`;
    code += `    const initialFrag = ${builderName}();\n`;
    code += `    ${forName}Nodes = Array.from(initialFrag.childNodes);\n`;
    code += `    ${fragName}.appendChild(initialFrag);\n`;
    code += `    ${fragName}.appendChild(${anchorName});\n`;
    code += `  }\n`;

    if (arrayExpr) {
      code += `  {\n`;
      code += `    let $$forSnapshot${forName} = JSON.stringify(${arrayExpr});\n`;
      code += `    $watch(\n`;
      code += `      () => { try { return JSON.stringify(${arrayExpr}); } catch { return ''; } },\n`;
      code += `      (newSnap) => { if (newSnap !== $$forSnapshot${forName}) { $$forSnapshot${forName} = newSnap; updateFor${forName}(); } }\n`;
      code += `    );\n`;
      code += `  }\n`;
    }

    return fragName;
  }

  // ── Phase 7: Async block emission ─────────────────────────────────────────
  function emitAsync(node) {
    const fragName = nextId('asyncFrag');
    const asyncName = nextId('async');
    const anchorName = nextId('anchor');

    code += `  const ${fragName} = document.createDocumentFragment();\n`;
    code += `  const ${anchorName} = document.createComment("nuvsha-async");\n`;
    code += `  let ${asyncName}State = 'loading';\n`;
    code += `  let ${asyncName}Data = null;\n`;
    code += `  let ${asyncName}Error = null;\n`;
    code += `  let ${asyncName}Nodes = [];\n`;

    // Build the result section builder
    const successBuilder = nextId('buildSuccess');
    code += `  function ${successBuilder}(${node.varName}) {\n`;
    code += `    const frag = document.createDocumentFragment();\n`;
    const successCode = captureWalk(node.children, '    ');
    code += successCode.code;
    for (const c of successCode.names) {
      code += `    frag.appendChild(${c});\n`;
    }
    code += `    return frag;\n`;
    code += `  }\n`;

    // Loading section builder
    const loadingBuilder = nextId('buildLoading');
    code += `  function ${loadingBuilder}() {\n`;
    code += `    const frag = document.createDocumentFragment();\n`;
    if (node.loading && node.loading.length > 0) {
      const loadCode = captureWalk(node.loading, '    ');
      code += loadCode.code;
      for (const c of loadCode.names) {
        code += `    frag.appendChild(${c});\n`;
      }
    } else {
      code += `    frag.appendChild(document.createTextNode("Loading..."));\n`;
    }
    code += `    return frag;\n`;
    code += `  }\n`;

    // Error section builder
    const errorBuilder = nextId('buildError');
    code += `  function ${errorBuilder}(error) {\n`;
    code += `    const frag = document.createDocumentFragment();\n`;
    if (node.error && node.error.length > 0) {
      const errCode = captureWalk(node.error, '    ');
      code += errCode.code;
      for (const c of errCode.names) {
        code += `    frag.appendChild(${c});\n`;
      }
    } else {
      code += `    frag.appendChild(document.createTextNode(String(error)));\n`;
    }
    code += `    return frag;\n`;
    code += `  }\n`;

    // State update function
    code += `  function update${asyncName}() {\n`;
    code += `    for (const n of ${asyncName}Nodes) n.parentNode && n.parentNode.removeChild(n);\n`;
    code += `    let frag;\n`;
    code += `    if (${asyncName}State === 'loading') frag = ${loadingBuilder}();\n`;
    code += `    else if (${asyncName}State === 'error') frag = ${errorBuilder}(${asyncName}Error);\n`;
    code += `    else frag = ${successBuilder}(${asyncName}Data);\n`;
    code += `    ${asyncName}Nodes = Array.from(frag.childNodes);\n`;
    code += `    ${anchorName}.parentNode && ${anchorName}.parentNode.insertBefore(frag, ${anchorName});\n`;
    code += `  }\n`;

    // Initial render directly into our local fragment
    code += `  {\n`;
    code += `    const initialFrag = ${loadingBuilder}();\n`;
    code += `    ${asyncName}Nodes = Array.from(initialFrag.childNodes);\n`;
    code += `    ${fragName}.appendChild(initialFrag);\n`;
    code += `    ${fragName}.appendChild(${anchorName});\n`;
    code += `  }\n`;

    code += `  function fetchAsync${asyncName}(promiseOrData) {\n`;
    code += `    ${asyncName}State = 'loading';\n`;
    code += `    update${asyncName}();\n`;
    code += `    Promise.resolve(promiseOrData)\n`;
    code += `      .then((data) => { ${asyncName}State = 'success'; ${asyncName}Data = data; update${asyncName}(); })\n`;
    code += `      .catch((err) => { ${asyncName}State = 'error'; ${asyncName}Error = err; update${asyncName}(); });\n`;
    code += `  }\n`;

    code += `  fetchAsync${asyncName}(${node.expression});\n`;
    code += `  $watch(() => ${node.expression}, (newVal) => fetchAsync${asyncName}(newVal));\n`;

    return fragName;
  }

  // ── Helper: walk children into a sub-scope (for builders) ─────────────────
  // When we need to generate code inside a nested function (like buildIf, buildFor),
  // we temporarily redirect code output into a local string, then return it.
  function captureWalk(nodes, indent = '  ') {
    const savedCode = code;
    code = '';
    const names = [];
    for (const child of nodes) {
      const name = walk(child);
      if (name) names.push(name);
    }
    // Re-indent the captured code
    const captured = code.split('\n').map(l => l.trim() ? `${indent}${l.trimStart()}` : l).join('\n');
    code = savedCode;
    return { code: captured + '\n', names };
  }

  // ── Root fragment ─────────────────────────────────────────────────────────
  const fragName = nextId('frag');
  code += `  const ${fragName} = document.createDocumentFragment();\n`;

  for (const node of componentNode.template) {
    const childName = walk(node);
    if (childName) {
      code += `  ${fragName}.appendChild(${childName});\n`;
    }
  }

  code += `  return ${fragName};\n`;
  code += `}\n`;

  return code;
}

// ============================================================================
// UTILITY — Extract prop names for destructuring
// ============================================================================

/**
 * Extracts used variables from the template that are NOT declared in the script.
 * This effectively infers the "props" for the component.
 */
function getPropsDestructure(componentNode, processedBody) {
  const scriptVars = new Set();
  const declarations = processedBody.match(/^\s*(?:let\s+|const\s+|var\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/gm) || [];
  for (const dec of declarations) {
    const match = dec.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
    if (match) scriptVars.add(match[1]);
  }
  
  const { imports } = extractImports(componentNode.script);
  const importMatches = imports.match(/import\s+(?:{\s*([^{}]+)\s*}|([a-zA-Z_$][a-zA-Z0-9_$]*))/g) || [];
  for (const imp of importMatches) {
    const defaultMatch = imp.match(/import\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
    if (defaultMatch) {
      scriptVars.add(defaultMatch[1]);
    } else {
      const namedMatch = imp.match(/import\s+{\s*([^{}]+)\s*}/);
      if (namedMatch) {
        const names = namedMatch[1].split(',').map(s => s.trim().split(' as ')[0].trim());
        for (const name of names) {
          scriptVars.add(name);
        }
      }
    }
  }

  const usedVars = new Set();
  function visit(node) {
    if (!node) return;
    if (node.type === 'Expression') {
      const words = (node.expression || '').match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
      words.forEach(w => usedVars.add(w));
    } else if (node.type === 'Element') {
      for (const val of Object.values(node.attributes)) {
        if (typeof val === 'object' && val.type === 'expression') {
          const words = val.value.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
          words.forEach(w => usedVars.add(w));
        }
      }
      node.children.forEach(visit);
    } else if (node.type === 'ComponentCall') {
      for (const val of Object.values(node.props)) {
        if (typeof val === 'object' && val.type === 'expression') {
          const words = val.value.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
          words.forEach(w => usedVars.add(w));
        }
      }
      node.children.forEach(visit);
    } else if (node.type === 'Conditional') {
      const branches = node.branches || [
        { condition: node.condition, children: node.consequent || [] },
        ...(node.alternate && node.alternate.length > 0 ? [{ condition: null, children: node.alternate }] : [])
      ];
      for (const b of branches) {
        if (b.condition) {
          const words = b.condition.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
          words.forEach(w => usedVars.add(w));
        }
        b.children.forEach(visit);
      }
    } else if (node.type === 'For') {
      const ofMatch = node.expression.match(/^(.+?)\s+of\s+(.+)$/);
      if (ofMatch) {
        const loopVar = ofMatch[1].trim();
        const arrayExpr = ofMatch[2].trim();
        scriptVars.add(loopVar);
        const words = arrayExpr.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
        words.forEach(w => usedVars.add(w));
      } else {
        const words = node.expression.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
        words.forEach(w => usedVars.add(w));
      }
      node.children.forEach(visit);
    } else if (node.type === 'Async') {
      if (node.varName) scriptVars.add(node.varName);
      const words = node.expression.match(/(?<!\.)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g) || [];
      words.forEach(w => usedVars.add(w));
      node.children.forEach(visit);
      node.loading.forEach(visit);
      node.error.forEach(visit);
    }
  }
  
  componentNode.template.forEach(visit);
  
  const keywords = new Set(['true', 'false', 'null', 'undefined', 'Math', 'Date', 'JSON', 'Object', 'Array', 'console', 'window', 'document', 'event', '$event', 'props', 'of', 'async', 'let', 'const', 'var', 'data']);
  const propsToDestructure = Array.from(usedVars).filter(v => !scriptVars.has(v) && !keywords.has(v));
  
  return propsToDestructure.length > 0 ? propsToDestructure.join(', ') + ',' : '';
}

/**
 * The main code generator for Nuvsha Phase 7.
 * @param {Object} componentNode — The root ComponentNode from the parser
 * @returns {string} — Valid JavaScript module code
 */
