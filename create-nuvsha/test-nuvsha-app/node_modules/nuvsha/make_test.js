import fs from 'fs';
import { compile } from './src/compiler/index.js';

const code = compile(fs.readFileSync('../playground/src/App.nuv', 'utf-8'));
fs.writeFileSync('scratch/test.html', '<script type="module">\n' + code + '\n</script>');
console.log('done');
