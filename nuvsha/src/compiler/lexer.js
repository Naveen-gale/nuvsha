/**
 * Token types for our lexer
 */
export const TokenType = {
  TAG_OPEN: 'TAG_OPEN',     // e.g. <div>
  TAG_CLOSE: 'TAG_CLOSE',   // e.g. </div>
  TEXT: 'TEXT',             // e.g. Hello Nuvsha!
  EXPRESSION: 'EXPRESSION', // e.g. {name}
  BLOCK_IF_OPEN: 'BLOCK_IF_OPEN', // {if condition}
  BLOCK_ELSE: 'BLOCK_ELSE',       // {else}
  BLOCK_IF_CLOSE: 'BLOCK_IF_CLOSE', // {/if}
  BLOCK_FOR_OPEN: 'BLOCK_FOR_OPEN', // {for item of items}
  BLOCK_FOR_CLOSE: 'BLOCK_FOR_CLOSE', // {/for}
};

/**
 * A simple lexer (tokenizer) that scans a .nuv string
 * and turns it into an array of tokens.
 * @param {string} input 
 * @returns {Array} Array of token objects
 */
export function tokenize(input) {
  const tokens = [];
  let current = 0;

  while (current < input.length) {
    let char = input[current];

    // If we see a '<', it's the start of a tag
    if (char === '<') {
      // Check if it's a closing tag like "</div>"
      if (input[current + 1] === '/') {
        current += 2; // skip past "</"
        let tagName = '';
        while (input[current] !== '>' && current < input.length) {
          tagName += input[current];
          current++;
        }
        current++; // skip past ">"
        
        tokens.push({
          type: TokenType.TAG_CLOSE,
          value: tagName.trim()
        });
        continue;
      }
      
      // Otherwise, it's an opening tag like "<div>" or "<img src='...'>"
      current++; // skip past "<"
      let tagName = '';
      
      // Read the tag name until we hit a space, '>', or '/'
      while (input[current] !== '>' && input[current] !== ' ' && input[current] !== '/' && current < input.length) {
        tagName += input[current];
        current++;
      }
      
      let attributes = {};
      let isSelfClosing = false;
      
      // Parse attributes
      while (current < input.length && input[current] !== '>') {
        let char = input[current];
        
        if (char === ' ' || char === '\n' || char === '\r' || char === '\t') {
          current++;
          continue;
        }
        
        if (char === '/') {
          isSelfClosing = true;
          current++;
          continue;
        }
        
        // We found an attribute name
        let attrName = '';
        while (current < input.length && input[current] !== '=' && input[current] !== ' ' && input[current] !== '\n' && input[current] !== '\r' && input[current] !== '\t' && input[current] !== '>' && input[current] !== '/') {
          attrName += input[current];
          current++;
        }
        
        if (input[current] === '=') {
          current++; // skip '='
          
          let quote = input[current];
          if (quote === '"' || quote === "'") {
            current++; // skip quote
            let attrValue = '';
            while (current < input.length && input[current] !== quote) {
              attrValue += input[current];
              current++;
            }
            current++; // skip closing quote
            attributes[attrName] = attrValue;
          } else if (quote === '{') {
            current++; // skip '{'
            let attrValue = '';
            let braceCount = 1;
            while (current < input.length && braceCount > 0) {
              if (input[current] === '{') braceCount++;
              if (input[current] === '}') braceCount--;
              if (braceCount > 0) {
                attrValue += input[current];
              }
              current++;
            }
            attributes[attrName] = { type: 'expression', value: attrValue };
          } else {
             // unquoted attribute value
             let attrValue = '';
             while (current < input.length && input[current] !== ' ' && input[current] !== '\n' && input[current] !== '\r' && input[current] !== '\t' && input[current] !== '>' && input[current] !== '/') {
               attrValue += input[current];
               current++;
             }
             attributes[attrName] = attrValue;
          }
        } else if (attrName.length > 0) {
          // boolean attribute like 'disabled'
          attributes[attrName] = true;
        }
      }
      current++; // skip past ">"

      tokens.push({
        type: TokenType.TAG_OPEN,
        value: tagName.trim(),
        attributes: attributes,
        isSelfClosing: isSelfClosing
      });
      continue;
    }

    // If we see a '{', it's an expression
    if (char === '{') {
      current++; // skip '{'
      let expression = '';
      let braceCount = 1;
      while (current < input.length && braceCount > 0) {
        if (input[current] === '{') braceCount++;
        if (input[current] === '}') braceCount--;
        if (braceCount > 0) {
          expression += input[current];
        }
        current++;
      }
      
      const trimmedExpr = expression.trim();
      
      if (trimmedExpr.startsWith('if ')) {
        tokens.push({
          type: TokenType.BLOCK_IF_OPEN,
          condition: trimmedExpr.slice(3).trim()
        });
      } else if (trimmedExpr === 'else') {
        tokens.push({ type: TokenType.BLOCK_ELSE });
      } else if (trimmedExpr === '/if') {
        tokens.push({ type: TokenType.BLOCK_IF_CLOSE });
      } else if (trimmedExpr.startsWith('for ')) {
        tokens.push({
          type: TokenType.BLOCK_FOR_OPEN,
          expression: trimmedExpr.slice(4).trim()
        });
      } else if (trimmedExpr === '/for') {
        tokens.push({ type: TokenType.BLOCK_FOR_CLOSE });
      } else {
        tokens.push({
          type: TokenType.EXPRESSION,
          value: trimmedExpr
        });
      }
      continue;
    }

    // If it's not a '<' and not '{', it must be text inside a tag
    let text = '';
    while (current < input.length && input[current] !== '<' && input[current] !== '{') {
      text += input[current];
      current++;
    }

    // Only add text tokens if they are not just empty space
    if (text.trim().length > 0) {
      tokens.push({
        type: TokenType.TEXT,
        value: text
      });
    }
  }

  return tokens;
}
