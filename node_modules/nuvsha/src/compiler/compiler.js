/**
 * The code generator walks the AST and outputs a string of JavaScript code.
 * This JavaScript code creates the DOM elements using standard browser APIs.
 * 
 * @param {Object} componentNode - The root ComponentNode of our AST
 * @returns {string} The generated JavaScript code
 */
export function generate(componentNode) {
  let code = `
    // This is auto-generated Nuvsha component code!
    export default function render() {
      // 1. Run the user's custom JavaScript (variables, etc.)
      ${componentNode.script}

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
          } else {
            // Very simple escaping for demo purposes
            const safeValue = value.replace(/"/g, '\\"');
            code += `      ${elName}.setAttribute("${key}", "${safeValue}");\n`;
          }
        }
      }
      
      // Go through all the children of this element
      for (const child of node.children) {
        if (child.type === 'Element') {
          // If the child is another element, walk it, and then append it to this element
          const childName = walk(child);
          code += `      ${elName}.appendChild(${childName});\n`;
        } else if (child.type === 'Text') {
          // If the child is static text, generate code to create a text node and append it
          const textName = `text${elementCounter++}`;
          // Clean up newlines in text for simple generation
          const safeText = child.value.replace(/\n/g, '\\n').replace(/"/g, '\\"');
          code += `      const ${textName} = document.createTextNode("${safeText}");\n`;
          code += `      ${elName}.appendChild(${textName});\n`;
        } else if (child.type === 'Expression') {
          // If the child is an {expression}, use the raw JS variable instead of a string
          const expName = `exp${elementCounter++}`;
          code += `      const ${expName} = document.createTextNode(String(${child.expression}));\n`;
          code += `      ${elName}.appendChild(${expName});\n`;
        }
      }
      
      return elName;
    }
    return null;
  }

  // Start walking from the root element (if there is one)
  let rootElementVarName = "null";
  if (componentNode.template) {
    rootElementVarName = walk(componentNode.template);
  }

  // Finish our render function by returning the root element we just built
  code += `
      return ${rootElementVarName};
    }
  `;

  return code;
}
