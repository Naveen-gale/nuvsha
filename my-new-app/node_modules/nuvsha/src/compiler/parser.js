import { TokenType } from './lexer.js';
import { ComponentNode, ElementNode, TextNode, ExpressionNode, ConditionalNode, ForNode, ComponentCallNode, AsyncNode } from './ast.js';
import { NuvshaError } from './error.js';

// A tag name starting with an uppercase letter is a user-defined component.
function isComponent(tagName) {
  return tagName.length > 0 && tagName[0] === tagName[0].toUpperCase() && tagName[0] !== tagName[0].toLowerCase();
}

function addChild(stack, component, node) {
  if (stack.length > 0) {
    const parent = stack[stack.length - 1];

    if (parent.type === 'Conditional') {
      const currentBranch = parent.branches[parent.branches.length - 1];
      currentBranch.children.push(node);
      if (parent.branches.length === 1) parent.consequent.push(node);
      else parent.alternate.push(node);
    } else if (parent.type === 'Async') {
      if (parent.section === 'loading') parent.loading.push(node);
      else if (parent.section === 'error') parent.error.push(node);
      else parent.children.push(node);
    } else if (parent.type === 'ComponentCall') {
      parent.children.push(node);
    } else {
      parent.children.push(node);
    }
  } else {
    component.template.push(node);
  }
}

/**
 * @param {Array} tokens
 * @param {string} source
 * @param {string} filename
 * @returns {ComponentNode} The root component
 */
export function parse(tokens, source = '', filename = '') {
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

      if (isComponent(token.value)) {
        const node = new ComponentCallNode(token.value, token.attributes);
        node.token = token; // for location info
        addChild(stack, component, node);
        if (!token.isSelfClosing) {
          stack.push(node);
        }
      } else {
        const node = new ElementNode(token.value, token.attributes);
        node.token = token; // for location info
        addChild(stack, component, node);
        if (!token.isSelfClosing) {
          stack.push(node);
        }
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
      node.token = token;
      addChild(stack, component, node);
      stack.push(node);

    } else if (token.type === TokenType.BLOCK_ELSE) {
      let found = false;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].type === 'Conditional') {
          stack[j].inElse = true;
          stack[j].branches.push({ condition: null, children: [] });
          found = true;
          break;
        }
      }
      if (!found) {
          throw new NuvshaError({
              code: 'NV1007',
              message: 'Unexpected {else}',
              file: filename,
              line: token.line, column: token.column, length: 6,
              hint: 'Ensure {else} is placed inside an {if} block.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_ELSE_IF) {
      let found = false;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].type === 'Conditional') {
          stack[j].inElse = true;
          stack[j].branches.push({ condition: token.condition, children: [] });
          found = true;
          break;
        }
      }
      if (!found) {
          throw new NuvshaError({
              code: 'NV1007',
              message: 'Unexpected {else if}',
              file: filename,
              line: token.line, column: token.column, length: 9,
              hint: 'Ensure {else if} is placed inside an {if} block.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_IF_CLOSE) {
      let found = false;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].type === 'Conditional') {
          stack.splice(j, 1);
          found = true;
          break;
        }
      }
      if (!found) {
          throw new NuvshaError({
              code: 'NV1007',
              message: 'Unexpected {/if}',
              file: filename,
              line: token.line, column: token.column, length: 5,
              hint: 'There is no open {if} block to close.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_FOR_OPEN) {
      const node = new ForNode(token.expression);
      node.token = token;
      
      if (!token.expression.includes(' of ')) {
          throw new NuvshaError({
              code: 'NV1008',
              message: 'Invalid for syntax',
              file: filename,
              line: token.line, column: token.column, length: token.expression.length + 5,
              hint: 'Expected syntax: {for item of items}',
              phase: 'PARSER', source
          });
      }
      
      addChild(stack, component, node);
      stack.push(node);

    } else if (token.type === TokenType.BLOCK_FOR_CLOSE) {
      if (stack.length > 0 && stack[stack.length - 1].type === 'For') {
        stack.pop();
      } else {
          throw new NuvshaError({
              code: 'NV1008',
              message: 'Unexpected {/for}',
              file: filename,
              line: token.line, column: token.column, length: 6,
              hint: 'There is no open {for} block to close.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_ASYNC_OPEN) {
      const node = new AsyncNode(token.varName, token.expression);
      node.token = token;
      addChild(stack, component, node);
      stack.push(node);

    } else if (token.type === TokenType.BLOCK_ASYNC_LOADING) {
      let found = false;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].type === 'Async') { stack[j].section = 'loading'; found = true; break; }
      }
      if (!found) {
          throw new NuvshaError({
              code: 'NV1002',
              message: 'Unexpected {loading}',
              file: filename, line: token.line, column: token.column, length: 9,
              hint: '{loading} must be inside an {async} block.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_ASYNC_ERROR) {
      let found = false;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].type === 'Async') { stack[j].section = 'error'; found = true; break; }
      }
      if (!found) {
          throw new NuvshaError({
              code: 'NV1002',
              message: 'Unexpected {error}',
              file: filename, line: token.line, column: token.column, length: 7,
              hint: '{error} must be inside an {async} block.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.BLOCK_ASYNC_CLOSE) {
      if (stack.length > 0 && stack[stack.length - 1].type === 'Async') {
        stack.pop();
      } else {
          throw new NuvshaError({
              code: 'NV1002',
              message: 'Unexpected {/async}',
              file: filename, line: token.line, column: token.column, length: 8,
              hint: 'There is no open {async} block to close.',
              phase: 'PARSER', source
          });
      }

    } else if (token.type === TokenType.TAG_CLOSE) {
      if (token.value === 'script') {
        inScript = false;
        continue;
      }

      if (stack.length === 0) {
        throw new NuvshaError({
            code: 'NV1002',
            message: `Unexpected closing tag </${token.value}>`,
            file: filename,
            line: token.line, column: token.column, length: token.value.length + 3,
            hint: `There are no open tags to close.`,
            phase: 'PARSER', source
        });
      }
      
      const last = stack[stack.length - 1];
      const lastName = last.type === 'Element' ? last.tagName : (last.type === 'ComponentCall' ? last.name : null);
      
      if (lastName && lastName !== token.value) {
          throw new NuvshaError({
              code: 'NV1003',
              message: `Missing closing tag`,
              file: filename,
              line: token.line, column: token.column, length: token.value.length + 3,
              hint: `Expected </${lastName}> but found </${token.value}>. Make sure every opened element is properly closed.`,
              phase: 'PARSER', source
          });
      }

      // If it's a block like {if} but we get a </div>, this is also a mismatch
      if (last.type === 'Conditional') {
           throw new NuvshaError({
              code: 'NV1003',
              message: `Missing closing tag {/if}`,
              file: filename,
              line: token.line, column: token.column, length: token.value.length + 3,
              hint: `You are trying to close </${token.value}>, but an {if} block is still open.`,
              phase: 'PARSER', source
          });
      }
      if (last.type === 'For') {
           throw new NuvshaError({
              code: 'NV1003',
              message: `Missing closing tag {/for}`,
              file: filename,
              line: token.line, column: token.column, length: token.value.length + 3,
              hint: `You are trying to close </${token.value}>, but a {for} block is still open.`,
              phase: 'PARSER', source
          });
      }
      
      stack.pop();
    }
  }
  
  if (stack.length > 0) {
      const last = stack[stack.length - 1];
      let msg = '';
      let hint = '';
      let name = '';
      
      if (last.type === 'Element') name = `</${last.tagName}>`;
      if (last.type === 'ComponentCall') name = `</${last.name}>`;
      if (last.type === 'Conditional') name = `{/if}`;
      if (last.type === 'For') name = `{/for}`;
      if (last.type === 'Async') name = `{/async}`;
      
      throw new NuvshaError({
          code: 'NV1003',
          message: `Unclosed block or tag`,
          file: filename,
          line: last.token ? last.token.line : 1, 
          column: last.token ? last.token.column : 1,
          length: last.token && last.token.value ? last.token.value.length : 1,
          hint: `Expected to find ${name} to close the block.`,
          phase: 'PARSER', source
      });
  }

  return component;
}
