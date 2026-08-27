import fs from 'fs';
import { compile } from './nuvsha/src/compiler/index.js';

const appCode = fs.readFileSync('./playground/src/App.nuv', 'utf-8');
const js = compile(appCode);
console.log(js);
