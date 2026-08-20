/**
 * Transforms Nuvsha's simplified script syntax into valid JavaScript.
 * For example, it converts undeclared variables like `name = "Alex"` 
 * into `let name = "Alex"`.
 * 
 * @param {string} rawScript - The raw text from the <script> block
 * @returns {string} The transformed valid JavaScript code
 */
export function transformScript(rawScript) {
  const lines = rawScript.split('\n');
  
  const transformed = lines.map(line => {
    const trimmed = line.trim();
    
    // A simple regex to match top-level variable assignment without let/const/var
    // Matches "name = 'Alex'", "count = 0", etc.
    const assignRegex = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.*)$/;
    
    const match = trimmed.match(assignRegex);
    if (match) {
      const varName = match[1];
      const reserved = ['let', 'const', 'var', 'if', 'else', 'for', 'while', 'function', 'return'];
      
      if (!reserved.includes(varName)) {
        // Replace it by prefixing with 'let ' while preserving original indentation
        // We use string replace on the original line to keep formatting
        return line.replace(varName, `let ${varName}`);
      }
    }
    
    return line;
  });
  
  return transformed.join('\n');
}
