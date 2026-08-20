import { TokenType } from './lexer.js';
import { ComponentNode, ElementNode, TextNode, ExpressionNode, ConditionalNode, ForNode } from './ast.js';

function addChild(stack, component, node) {
  if (stack.length > 0) {
    const parent = stack[stack.length - 1];
    if (parent.type === 'Conditional') {
      if (parent.inElse) parent.alternate.push(node);
      else parent.consequent.push(node);
    } else {
      parent.children.push(node);
    }
  } else {
    component.template.push(node);
  }
}

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
        continue;
      }
      const node = new ElementNode(token.value, token.attributes);
      addChild(stack, component, node);
      if (!token.isSelfClosing) {
        stack.push(node);
      }
    } else if (token.type === TokenType.TEXT) {
      if (inScript) {
        component.script += token.value + '\n';
      } else {
        const node = new TextNode(token.value);
        addChild(stack, component, node);
      }
    } else if (token.type === TokenType.EXPRESSION) {
      const node = new ExpressionNode(token.value);
      addChild(stack, component, node);
    } else if (token.type === TokenType.BLOCK_IF_OPEN) {
      const node = new ConditionalNode(token.condition);
      addChild(stack, component, node);
      stack.push(node);
    } else if (token.type === TokenType.BLOCK_ELSE) {
      if (stack.length > 0 && stack[stack.length - 1].type === 'Conditional') {
        stack[stack.length - 1].inElse = true;
      }
    } else if (token.type === TokenType.BLOCK_IF_CLOSE) {
      if (stack.length > 0 && stack[stack.length - 1].type === 'Conditional') {
        stack.pop();
      }
    } else if (token.type === TokenType.BLOCK_FOR_OPEN) {
      const node = new ForNode(token.expression);
      addChild(stack, component, node);
      stack.push(node);
    } else if (token.type === TokenType.BLOCK_FOR_CLOSE) {
      if (stack.length > 0 && stack[stack.length - 1].type === 'For') {
        stack.pop();
      }
    } else if (token.type === TokenType.TAG_CLOSE) {
      if (token.value === 'script') {
        inScript = false;
        continue;
      }
      if (stack.length > 0) {
        stack.pop();
      }
    }
  }

  return component;
}
