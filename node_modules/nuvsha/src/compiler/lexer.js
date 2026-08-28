import { NuvshaError } from './error.js';

/**
 * Token types for our lexer
 */
export const TokenType = {
  TAG_OPEN: 'TAG_OPEN',     // e.g. <div>
  TAG_CLOSE: 'TAG_CLOSE',   // e.g. </div>
  TEXT: 'TEXT',             // e.g. Hello Nuvsha!
  EXPRESSION: 'EXPRESSION', // e.g. {name}
  BLOCK_IF_OPEN: 'BLOCK_IF_OPEN',     // {if condition}
  BLOCK_ELSE: 'BLOCK_ELSE',           // {else}
  BLOCK_ELSE_IF: 'BLOCK_ELSE_IF',     // {else if condition}
  BLOCK_IF_CLOSE: 'BLOCK_IF_CLOSE',   // {/if}
  BLOCK_FOR_OPEN: 'BLOCK_FOR_OPEN',   // {for item of items}
  BLOCK_FOR_CLOSE: 'BLOCK_FOR_CLOSE', // {/for}
  BLOCK_ASYNC_OPEN: 'BLOCK_ASYNC_OPEN',       // {async varName = expr}
  BLOCK_ASYNC_LOADING: 'BLOCK_ASYNC_LOADING', // {loading}
  BLOCK_ASYNC_ERROR: 'BLOCK_ASYNC_ERROR',     // {error}
  BLOCK_ASYNC_CLOSE: 'BLOCK_ASYNC_CLOSE',     // {/async}
};

/**
 * A simple lexer (tokenizer) that scans a .nuv string
 * and turns it into an array of tokens.
 * @param {string} input 
 * @param {string} filename
 * @returns {Array} Array of token objects
 */
export function tokenize(input, filename = '') {
  const tokens = [];
  let current = 0;
  let line = 1;
  let column = 1;

  function advance(n = 1) {
    for (let i = 0; i < n; i++) {
      if (input[current] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      current++;
    }
  }

  while (current < input.length) {
    let char = input[current];
    const startLine = line;
    const startColumn = column;

    // If we see a '<', it's the start of a tag
    if (char === '<') {
      
      // ── HTML Comment handling ───────────────────────────────────────────────
      if (input.slice(current, current + 4) === '<!--') {
        advance(4);
        while (current < input.length) {
          if (input.slice(current, current + 3) === '-->') {
            advance(3);
            break;
          }
          advance();
        }
        continue;
      }
      
      // ── Script block special handling ─────────────────────────────────────
      const scriptOpenMatch = input.slice(current).match(/^<script\s*>/i);
      if (scriptOpenMatch) {
        advance(scriptOpenMatch[0].length);
        tokens.push({ type: TokenType.TAG_OPEN, value: 'script', attributes: {}, isSelfClosing: false, line: startLine, column: startColumn });

        let scriptContent = '';
        const closeTag = '</script>';
        const contentStartLine = line;
        const contentStartColumn = column;
        
        while (current < input.length) {
          if (input.slice(current, current + closeTag.length).toLowerCase() === closeTag) {
            advance(closeTag.length);
            break;
          }
          scriptContent += input[current];
          advance();
        }

        if (scriptContent) {
          tokens.push({ type: TokenType.TEXT, value: scriptContent, line: contentStartLine, column: contentStartColumn });
        }
        tokens.push({ type: TokenType.TAG_CLOSE, value: 'script', line, column: column - closeTag.length });
        continue;
      }
      
      // Check if it's a closing tag like "</div>"
      if (input[current + 1] === '/') {
        advance(2);
        let tagName = '';
        while (input[current] !== '>' && current < input.length) {
          tagName += input[current];
          advance();
        }
        if (input[current] !== '>') {
            throw new NuvshaError({
                code: 'NV1001',
                message: 'Unexpected end of input while parsing closing tag',
                file: filename,
                line: startLine,
                column: startColumn,
                hint: `Ensure closing tag </${tagName}> is properly terminated with '>'.`,
                phase: 'LEXER',
                source: input
            });
        }
        advance(); // skip '>'
        
        tokens.push({
          type: TokenType.TAG_CLOSE,
          value: tagName.trim(),
          line: startLine,
          column: startColumn
        });
        continue;
      }
      
      // Otherwise, it's an opening tag
      advance(); // skip '<'
      let tagName = '';
      
      while (input[current] !== '>' && input[current] !== ' ' && input[current] !== '/' && current < input.length) {
        tagName += input[current];
        advance();
      }
      
      let attributes = {};
      let isSelfClosing = false;
      
      // Parse attributes
      while (current < input.length && input[current] !== '>') {
        let char = input[current];
        
        if (char === ' ' || char === '\n' || char === '\r' || char === '\t') {
          advance();
          continue;
        }
        
        if (char === '/') {
          isSelfClosing = true;
          advance();
          continue;
        }
        
        const attrStartLine = line;
        const attrStartColumn = column;
        
        // We found an attribute name
        let attrName = '';
        while (current < input.length && input[current] !== '=' && input[current] !== ' ' && input[current] !== '\n' && input[current] !== '\r' && input[current] !== '\t' && input[current] !== '>' && input[current] !== '/') {
          attrName += input[current];
          advance();
        }

        if (attrName.length === 0) {
            throw new NuvshaError({
                code: 'NV1009',
                message: 'Invalid attribute syntax',
                file: filename,
                line: attrStartLine,
                column: attrStartColumn,
                hint: 'Ensure attributes are properly formatted.',
                phase: 'LEXER',
                source: input
            });
        }
        
        if (input[current] === '=') {
          advance(); // skip '='
          
          let quote = input[current];
          if (quote === '"' || quote === "'") {
            advance(); // skip quote
            let attrValue = '';
            while (current < input.length && input[current] !== quote) {
              attrValue += input[current];
              advance();
            }
            if (input[current] !== quote) {
                throw new NuvshaError({
                    code: 'NV1009',
                    message: 'Unclosed attribute value',
                    file: filename,
                    line: attrStartLine,
                    column: attrStartColumn,
                    hint: `Ensure attribute ${attrName} has a matching closing quote.`,
                    phase: 'LEXER',
                    source: input
                });
            }
            advance(); // skip closing quote
            attributes[attrName] = attrValue;
          } else if (quote === '{') {
            advance(); // skip '{'
            let attrValue = '';
            let braceCount = 1;
            while (current < input.length && braceCount > 0) {
              if (input[current] === '{') braceCount++;
              if (input[current] === '}') braceCount--;
              if (braceCount > 0) {
                attrValue += input[current];
              }
              advance();
            }
            if (braceCount > 0) {
                throw new NuvshaError({
                    code: 'NV1004',
                    message: 'Unclosed expression in attribute',
                    file: filename,
                    line: attrStartLine,
                    column: attrStartColumn,
                    hint: `Ensure expression for attribute ${attrName} is properly closed with '}'.`,
                    phase: 'LEXER',
                    source: input
                });
            }
            attributes[attrName] = { type: 'expression', value: attrValue };
          } else {
             // unquoted attribute value
             if (input[current] === '>' || input[current] === ' ') {
                 throw new NuvshaError({
                    code: 'NV1009',
                    message: 'Missing attribute value',
                    file: filename,
                    line: attrStartLine,
                    column: attrStartColumn,
                    hint: `Attribute ${attrName} has an equals sign but no value.`,
                    phase: 'LEXER',
                    source: input
                 });
             }
             let attrValue = '';
             while (current < input.length && input[current] !== ' ' && input[current] !== '\n' && input[current] !== '\r' && input[current] !== '\t' && input[current] !== '>' && input[current] !== '/') {
               attrValue += input[current];
               advance();
             }
             attributes[attrName] = attrValue;
          }
        } else {
          // boolean attribute like 'disabled'
          attributes[attrName] = true;
        }
      }
      
      if (input[current] !== '>') {
          throw new NuvshaError({
              code: 'NV1001',
              message: 'Unexpected end of input while parsing opening tag',
              file: filename,
              line: startLine,
              column: startColumn,
              hint: `Ensure tag <${tagName}> is properly terminated with '>'.`,
              phase: 'LEXER',
              source: input
          });
      }
      advance(); // skip '>'

      const VOID_ELEMENTS = new Set([
        'input', 'br', 'hr', 'img', 'meta', 'link', 'area',
        'base', 'col', 'embed', 'param', 'source', 'track', 'wbr',
      ]);
      if (VOID_ELEMENTS.has(tagName.toLowerCase())) {
        isSelfClosing = true;
      }

      tokens.push({
        type: TokenType.TAG_OPEN,
        value: tagName.trim(),
        attributes: attributes,
        isSelfClosing: isSelfClosing,
        line: startLine,
        column: startColumn
      });
      continue;
    }

    // If we see a '{', it's an expression
    if (char === '{') {
      advance(); // skip '{'
      let expression = '';
      let braceCount = 1;
      while (current < input.length && braceCount > 0) {
        if (input[current] === '{') braceCount++;
        if (input[current] === '}') braceCount--;
        if (braceCount > 0) {
          expression += input[current];
        }
        advance();
      }
      
      if (braceCount > 0) {
          throw new NuvshaError({
              code: 'NV1004',
              message: 'Unclosed expression block',
              file: filename,
              line: startLine,
              column: startColumn,
              hint: 'Ensure all opening { braces have a matching closing } brace.',
              phase: 'LEXER',
              source: input
          });
      }
      
      const trimmedExpr = expression.trim();
      
      if (trimmedExpr.startsWith('if ')) {
        tokens.push({
          type: TokenType.BLOCK_IF_OPEN,
          condition: trimmedExpr.slice(3).trim(),
          line: startLine, column: startColumn
        });
      } else if (trimmedExpr === 'else') {
        tokens.push({ type: TokenType.BLOCK_ELSE, line: startLine, column: startColumn });
      } else if (trimmedExpr.startsWith('else if ')) {
        tokens.push({
          type: TokenType.BLOCK_ELSE_IF,
          condition: trimmedExpr.slice(8).trim(),
          line: startLine, column: startColumn
        });
      } else if (trimmedExpr === '/if') {
        tokens.push({ type: TokenType.BLOCK_IF_CLOSE, line: startLine, column: startColumn });
      } else if (trimmedExpr.startsWith('for ')) {
        tokens.push({
          type: TokenType.BLOCK_FOR_OPEN,
          expression: trimmedExpr.slice(4).trim(),
          line: startLine, column: startColumn
        });
      } else if (trimmedExpr === '/for') {
        tokens.push({ type: TokenType.BLOCK_FOR_CLOSE, line: startLine, column: startColumn });
      } else if (trimmedExpr.startsWith('async ')) {
        const asyncBody = trimmedExpr.slice(6).trim();
        const eqIdx = asyncBody.indexOf('=');
        if (eqIdx !== -1) {
          const varName = asyncBody.slice(0, eqIdx).trim();
          const expr = asyncBody.slice(eqIdx + 1).trim();
          tokens.push({ type: TokenType.BLOCK_ASYNC_OPEN, varName, expression: expr, line: startLine, column: startColumn });
        } else {
          tokens.push({ type: TokenType.BLOCK_ASYNC_OPEN, varName: '$$asyncData', expression: asyncBody, line: startLine, column: startColumn });
        }
      } else if (trimmedExpr === 'loading') {
        tokens.push({ type: TokenType.BLOCK_ASYNC_LOADING, line: startLine, column: startColumn });
      } else if (trimmedExpr === 'error') {
        tokens.push({ type: TokenType.BLOCK_ASYNC_ERROR, line: startLine, column: startColumn });
      } else if (trimmedExpr === '/async') {
        tokens.push({ type: TokenType.BLOCK_ASYNC_CLOSE, line: startLine, column: startColumn });
      } else {
        tokens.push({
          type: TokenType.EXPRESSION,
          value: trimmedExpr,
          line: startLine, column: startColumn
        });
      }
      continue;
    }

    // Text inside a tag
    let text = '';
    while (current < input.length && input[current] !== '<' && input[current] !== '{') {
      text += input[current];
      advance();
    }

    if (text.trim().length > 0) {
      tokens.push({
        type: TokenType.TEXT,
        value: text,
        line: startLine,
        column: startColumn
      });
    }
  }

  return tokens;
}
