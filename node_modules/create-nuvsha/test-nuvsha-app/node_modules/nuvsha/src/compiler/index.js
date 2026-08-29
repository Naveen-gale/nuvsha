import { tokenize } from './lexer.js';
import { parse } from './parser.js';
import { generate } from './compiler.js';

/**
 * The main compile function that takes raw .nuv code
 * and converts it all the way to JavaScript code.
 * 
 * @param {string} source - The raw string from a .nuv file
 * @returns {string} The generated JavaScript code
 */
export function compile(source, filename = '') {
  // Step 1: Lexer turns raw string into tokens
  const tokens = tokenize(source, filename);
  
  // Step 2: Parser turns tokens into a tree (AST)
  const ast = parse(tokens, source, filename);
  
  // Step 3: Generator turns the tree into JavaScript
  const code = generate(ast);
  
  return code;
}
