export class NuvshaError extends Error {
  /**
   * @param {Object} options
   * @param {string} options.code - The error code (e.g. NV1001)
   * @param {string} options.message - The human-readable error message
   * @param {string} [options.file] - The path to the file where the error occurred
   * @param {number} [options.line] - The 1-indexed line number
   * @param {number} [options.column] - The 1-indexed column number
   * @param {number} [options.length] - Length of the erroneous token/span
   * @param {string} [options.hint] - A helpful suggestion to fix the error
   * @param {string} [options.phase] - The compiler phase (LEXER, PARSER, COMPILER)
   * @param {string} [options.source] - The raw source code for code frame generation
   */
  constructor({ code, message, file, line, column, length = 1, hint, phase, source }) {
    super(message);
    this.name = 'NuvshaError';
    this.code = code;
    
    // Normalize path for display if we have one
    let displayFile = file;
    if (displayFile) {
        displayFile = displayFile.replace(/\\/g, '/');
        const srcIndex = displayFile.lastIndexOf('/src/');
        if (srcIndex !== -1) {
            displayFile = displayFile.substring(srcIndex + 1);
        } else {
            const lastSlash = displayFile.lastIndexOf('/');
            if (lastSlash !== -1) {
                displayFile = displayFile.substring(lastSlash + 1);
            }
        }
    }
    
    this.file = file; // original absolute
    this.displayFile = displayFile || 'unknown.nuv';
    this.line = line;
    this.column = column;
    this.length = length;
    this.hint = hint;
    this.phase = phase;
    this.source = source;
  }
}

/**
 * Generates a human-readable string representation of the error, 
 * including a code frame if source and location are available.
 * 
 * @param {NuvshaError} error 
 * @returns {string} Formatted error string
 */
export function formatError(error) {
  let output = `Nuvsha Error [${error.code}]\n\n`;
  output += `${error.message}\n\n`;
  
  if (error.line && error.column) {
    output += `File: ${error.displayFile}\n`;
    output += `Line: ${error.line}\n`;
    output += `Column: ${error.column}\n\n`;
  }
  
  if (error.source && error.line && error.column) {
    output += generateCodeFrame(error.source, error.line, error.column, error.length) + '\n\n';
  }
  
  if (error.hint) {
    output += `Hint:\n${error.hint}\n`;
  }
  
  return output;
}

function generateCodeFrame(source, line, column, length) {
  const lines = source.split('\n');
  const lineIndex = line - 1;
  const startLine = Math.max(0, lineIndex - 2);
  const endLine = Math.min(lines.length - 1, lineIndex + 2);
  
  // Find max line number length for padding
  const maxLineNumLength = String(endLine + 1).length;
  
  let frame = '';
  
  for (let i = startLine; i <= endLine; i++) {
    const isErrorLine = i === lineIndex;
    const lineNum = String(i + 1).padStart(maxLineNumLength, ' ');
    const prefix = isErrorLine ? '>' : ' ';
    
    frame += `${prefix} ${lineNum} | ${lines[i]}\n`;
    
    if (isErrorLine) {
        // Build pointer line
        // We need to match the whitespace before the pipe character
        const padding = ' '.repeat(prefix.length + 1 + maxLineNumLength + 3 + column - 1);
        const pointer = '^'.repeat(Math.max(1, length));
        frame += `${padding}${pointer}\n`;
    }
  }
  
  return frame.trimEnd();
}
