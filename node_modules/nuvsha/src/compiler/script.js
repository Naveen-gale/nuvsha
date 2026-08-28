/**
 * Transforms Nuvsha's simplified script syntax into valid JavaScript.
 *
 * Nuvsha lets developers write variables without type declarations:
 *
 *   name = "Alex"      →   let name = "Alex"
 *   count = 0          →   let count = 0
 *   active = true      →   let active = true
 *
 * This only applies to the body of a <script> block inside .nuv files.
 * Regular .js files are NOT processed by this transformer — they are
 * standard JavaScript and are handled directly by Vite/Node.
 *
 * IMPORT/EXPORT PASS-THROUGH:
 *   import/export lines are pulled out by extractImports() in compiler.js
 *   BEFORE this function is called. By the time this transformer sees the
 *   script, those lines are already gone. This is documented here for clarity.
 *
 * SAFETY:
 *   Reserved words and common patterns are checked before adding 'let'
 *   so we never accidentally produce: let if = ..., let return = ..., etc.
 *
 * @param {string} rawScript - The raw text from the <script> block (imports already removed)
 * @returns {string} The transformed valid JavaScript code
 */
export function transformScript(rawScript) {
  if (!rawScript || !rawScript.trim()) return '';

  const lines = rawScript.split('\n');
  const declaredVars = new Set();

  const transformed = lines.map(line => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return line;
    }

    if (
      trimmed.startsWith('let ') ||
      trimmed.startsWith('const ') ||
      trimmed.startsWith('var ') ||
      trimmed.startsWith('import ') ||
      trimmed.startsWith('export ') ||
      trimmed.startsWith('function ') ||
      trimmed.startsWith('class ') ||
      trimmed.startsWith('return ') ||
      trimmed.startsWith('if ') ||
      trimmed.startsWith('if(') ||
      trimmed.startsWith('else') ||
      trimmed.startsWith('for ') ||
      trimmed.startsWith('for(') ||
      trimmed.startsWith('while ') ||
      trimmed.startsWith('while(') ||
      trimmed.startsWith('throw ') ||
      trimmed.startsWith('try ') ||
      trimmed.startsWith('catch ') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('{') ||
      trimmed.startsWith('}')
    ) {
      return line;
    }

    const assignRegex = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.*)$/;
    const match = trimmed.match(assignRegex);

    if (match) {
      const varName = match[1];

      const reserved = new Set([
        'let', 'const', 'var',
        'if', 'else', 'for', 'while', 'do',
        'function', 'return', 'class',
        'import', 'export', 'default',
        'true', 'false', 'null', 'undefined',
        'this', 'super', 'new', 'delete', 'typeof', 'instanceof', 'void',
        'throw', 'try', 'catch', 'finally',
        'switch', 'case', 'break', 'continue',
        'async', 'await', 'yield',
        'debugger', 'with',
      ]);

      if (!reserved.has(varName)) {
        if (!declaredVars.has(varName)) {
          declaredVars.add(varName);
          // Phase 16: Default Props fallback
          const indent = line.substring(0, line.indexOf(varName));
          return `${indent}let ${varName} = typeof props.${varName} !== 'undefined' ? props.${varName} : ${match[2]}`;
        } else {
          return line;
        }
      }
    }

    return line;
  });

  return transformed.join('\n');
}
