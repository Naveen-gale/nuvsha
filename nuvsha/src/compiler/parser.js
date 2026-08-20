import { TokenType } from './lexer.js';
import { ComponentNode, ElementNode, TextNode, ExpressionNode } from './ast.js';

/**
 * The parser loops through tokens and builds a tree structure (AST).
 * It returns a ComponentNode that contains both the JavaScript and the HTML tree.
 * @param {Array} tokens 
 * @returns {ComponentNode} The root component
 */
export function parse(tokens) {
  const component = new ComponentNode();
  const stack = [];
  let inScript = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === TokenType.TAG_OPEN) {
      if (token.value === 'script') {
        inScript = true;
        continue; // Don't add <script> to the HTML tree
      }

      // We found a new element tag like <div>
      const node = new ElementNode(token.value, token.attributes);
      
      // If there is no root template yet, this is the root of our component HTML
      if (!component.template) {
        component.template = node;
      }
      
      // If we are currently inside another element, add this one as a child
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children.push(node);
      }
      
      // Push this new element onto the stack because we are now "inside" it
      // UNLESS it's a self-closing tag like <img />
      if (!token.isSelfClosing) {
        stack.push(node);
      }
      
    } else if (token.type === TokenType.TEXT) {
      if (inScript) {
        // This text is actually JavaScript code!
        component.script += token.value + '\n';
      } else {
        // We found text. Add it as a child to the current element we are inside of.
        const node = new TextNode(token.value);
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          parent.children.push(node);
        }
      }
      
    } else if (token.type === TokenType.EXPRESSION) {
      // We found a dynamic {variable}. Add it to the tree.
      const node = new ExpressionNode(token.value);
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children.push(node);
      }

    } else if (token.type === TokenType.TAG_CLOSE) {
      if (token.value === 'script') {
        inScript = false;
        continue;
      }

      // We found a closing tag like </div>. 
      // We are no longer inside this element, so pop it off the stack.
      if (stack.length > 0) {
        stack.pop();
      }
    }
  }

  return component;
}
