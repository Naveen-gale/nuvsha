const fs = require('fs');
const path = require('path');

function fix(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      fix(p);
    } else if (p.endsWith('.nuv') || p.endsWith('.js')) {
      let c = fs.readFileSync(p, 'utf8');
      const original = c;
      c = c.replace(/import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+["']([^"']+\.nuv)["']/g, 'import $1 from "$2"');
      if (c !== original) {
        fs.writeFileSync(p, c);
      }
    }
  });
}
fix('src');
console.log('Fixed imports');
