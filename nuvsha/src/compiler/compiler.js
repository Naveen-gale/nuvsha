import { transformScript } from './script.js';

/**
 * The code generator walks the AST and outputs a string of JavaScript code.
 * This JavaScript code creates the DOM elements using standard browser APIs.
 * 
 * @param {Object} componentNode - The root ComponentNode of our AST
 * @returns {string} The generated JavaScript code
 */
export function generate(componentNode) {
  const processedScript = transformScript(componentNode.script);

  let code = `
    import { $watch, $update } from "nuvsha";
    // This is auto-generated Nuvsha component code!
    export default function render() {
      // 1. Run the user's custom JavaScript (variables, etc.)
      ${processedScript}

      // 2. Generate the DOM elements
  `;

  let elementCounter = 0; // Helps us create unique variable names like el0, el1, etc.

  // Recursive function to walk the tree and generate code for each node
  function walk(node) {
    if (node.type === 'Element') {
      const elName = `el${elementCounter++}`;
      // Generate JavaScript to create the HTML element
      code += `      const ${elName} = document.createElement("${node.tagName}");\n`;
      
      // Set attributes
      if (node.attributes) {
        for (const [key, value] of Object.entries(node.attributes)) {
          if (value === true) {
            code += `      ${elName}.setAttribute("${key}", "");\n`;
          } else if (typeof value === 'object' && value.type === 'expression') {
            if (key.startsWith('on')) {
              code += `      ${elName}.${key} = (e) => { (${value.value})(e); $update(); };\n`;
            } else {
              code += `      ${elName}.setAttribute("${key}", String(${value.value}));\n`;
              code += `      $watch(() => String(${value.value}), (val) => ${elName}.setAttribute("${key}", val));\n`;
            }
          } else {
            if (key.startsWith('on')) {
              code += `      ${elName}.${key} = (e) => { ${value}; $update(); };\n`;
            } else {
              const safeValue = value.replace(/"/g, '\\"');
              code += `      ${elName}.setAttribute("${key}", "${safeValue}");\n`;
            }
          }
        }
      }
      
      // Go through all the children of this element
      for (const child of node.children) {
        const childName = walk(child);
        if (childName) {
          code += `      ${elName}.appendChild(${childName});\n`;
        }
      }
      
      return elName;
    } else if (node.type === 'Text') {
      const textName = `text${elementCounter++}`;
      // Clean up newlines in text for simple generation
      const safeText = node.value.replace(/\n/g, '\\n').replace(/"/g, '\\"');
      code += `      const ${textName} = document.createTextNode("${safeText}");\n`;
      return textName;
    } else if (node.type === 'Expression') {
      const expName = `exp${elementCounter++}`;
      code += `      const ${expName} = document.createTextNode(String(${node.expression}));\n`;
      code += `      $watch(() => String(${node.expression}), (val) => ${expName}.textContent = val);\n`;
      return expName;
    } else if (node.type === 'Conditional') {
      const condName = `cond${elementCounter++}`;
      code += `      const ${condName} = document.createDocumentFragment();\n`;
      code += `      if (${node.condition}) {\n`;
      for (const child of node.consequent) {
        const childName = walk(child);
        if (childName) code += `        ${condName}.appendChild(${childName});\n`;
      }
      if (node.alternate.length > 0) {
        code += `      } else {\n`;
        for (const child of node.alternate) {
          const childName = walk(child);
          if (childName) code += `        ${condName}.appendChild(${childName});\n`;
        }
      }
      code += `      }\n`;
      return condName;
    } else if (node.type === 'For') {
      const forName = `for${elementCounter++}`;
      code += `      const ${forName} = document.createDocumentFragment();\n`;
      code += `      for (const ${node.expression}) {\n`;
      for (const child of node.children) {
        const childName = walk(child);
        if (childName) code += `        ${forName}.appendChild(${childName});\n`;
      }
      code += `      }\n`;
      return forName;
    }
    return null;
  }

  const fragmentName = `frag${elementCounter++}`;
  code += `      const ${fragmentName} = document.createDocumentFragment();\n`;
  for (const node of componentNode.template) {
    const childName = walk(node);
    if (childName) {
      code += `      ${fragmentName}.appendChild(${childName});\n`;
    }
  }

  // Finish our render function by returning the fragment we just built
  code += `
      return ${fragmentName};
    }
  `;

  return code;
}
