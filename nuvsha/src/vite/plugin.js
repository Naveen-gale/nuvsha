import { compile } from '../compiler/index.js';
import { formatError } from '../compiler/error.js';

/**
 * A Vite plugin to tell Vite how to handle .nuv files.
 * Vite doesn't know what a .nuv file is by default, so we step in,
 * compile it to JavaScript, and hand that back to Vite.
 */
export default function nuvshaPlugin() {
  return {
    name: 'vite-plugin-nuvsha',
    
    // This tells Vite: whenever you try to load a file that ends in .nuv, let me handle it.
    transform(code, id) {
      if (id.endsWith('.nuv')) {
        try {
          // We use our compiler to turn the .nuv text into JavaScript
          const jsCode = compile(code, id);
          
          // Return it to Vite
          return {
            code: jsCode,
            map: null // We aren't building sourcemaps yet
          };
        } catch (e) {
          if (e.name === 'NuvshaError') {
            const err = new Error(formatError(e));
            err.id = id;
            err.plugin = 'vite-plugin-nuvsha';
            err.pluginCode = e.code;
            if (e.line && e.column) {
              err.loc = { file: id, line: e.line, column: e.column };
            }
            throw err;
          }
          throw e;
        }
      }
    }
  };
}
