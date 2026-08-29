import test from 'node:test';
import assert from 'node:assert';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { compile } from '../nuvsha/src/compiler/index.js';

const MASTER_TEST_DIR = join(process.cwd(), 'nuvsha-master-test', 'src');

test('Master Test App: all components compile to valid JavaScript', (t) => {
  const pagesDir = join(MASTER_TEST_DIR, 'pages');
  const componentsDir = join(MASTER_TEST_DIR, 'components');
  
  const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith('.nuv'));
  const compFiles = readdirSync(componentsDir).filter(f => f.endsWith('.nuv'));
  const rootApp = join(MASTER_TEST_DIR, 'App.nuv');

  assert.ok(pageFiles.length >= 11, 'should have at least 11 test pages');
  assert.ok(compFiles.length >= 6, 'should have at least 6 reusable components');
  assert.ok(existsSync(rootApp), 'App.nuv should exist');

  // Compile root App
  const appSource = readFileSync(rootApp, 'utf-8');
  const appJs = compile(appSource, rootApp);
  assert.ok(appJs.includes('export default function render'), 'App.nuv compiles to render function');

  // Compile all pages
  for (const file of pageFiles) {
    const filePath = join(pagesDir, file);
    const source = readFileSync(filePath, 'utf-8');
    const js = compile(source, filePath);
    assert.ok(js.includes('export default function render'), `${file} compiles to render function`);
  }

  // Compile all components
  for (const file of compFiles) {
    const filePath = join(componentsDir, file);
    const source = readFileSync(filePath, 'utf-8');
    const js = compile(source, filePath);
    assert.ok(js.includes('export default function render'), `${file} compiles to render function`);
  }
});

test('Master Test App: router routes map correctly', (t) => {
  const routesFile = join(MASTER_TEST_DIR, 'router', 'routes.js');
  assert.ok(existsSync(routesFile), 'routes.js should exist');
  
  const content = readFileSync(routesFile, 'utf-8');
  const expectedPaths = [
    "'/'",
    "'/language'",
    "'/reactivity'",
    "'/components'",
    "'/forms'",
    "'/routing'",
    "'/data'",
    "'/async'",
    "'/styling'",
    "'/errors'",
    "'/performance'",
    "'*'"
  ];

  for (const path of expectedPaths) {
    assert.ok(content.includes(path), `routes.js should configure path: ${path}`);
  }
});
