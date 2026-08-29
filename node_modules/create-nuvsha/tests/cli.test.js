import test from 'node:test';
import assert from 'node:assert';
import { mkdtempSync, rmSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { createProject } from '../index.js';

/**
 * Helper: creates a fresh temporary directory for each test.
 * We run each test in isolation so they don't interfere with each other.
 */
function makeTmpDir() {
  return mkdtempSync(join(tmpdir(), 'nuvsha-test-'));
}

// ─────────────────────────────────────────────
// Tests: createProject() creates the right files
// ─────────────────────────────────────────────

test('creates the project directory', async (t) => {
  const tmpDir = makeTmpDir();
  const projectName = 'test-app';
  const originalCwd = process.cwd();
  
  try {
    process.chdir(tmpDir);
    await createProject(projectName);
    assert.ok(existsSync(join(tmpDir, projectName)), 'project directory should exist');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates package.json with correct project name', async (t) => {
  const tmpDir = makeTmpDir();
  const projectName = 'my-nuvsha-app';
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject(projectName);
    
    const pkgPath = join(tmpDir, projectName, 'package.json');
    assert.ok(existsSync(pkgPath), 'package.json should exist');
    
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    assert.strictEqual(pkg.name, projectName);
    assert.strictEqual(pkg.type, 'module');
    assert.ok(pkg.dependencies.nuvsha, 'should have nuvsha dependency');
    assert.ok(pkg.devDependencies.vite, 'should have vite devDependency');
    assert.strictEqual(pkg.scripts.dev, 'vite');
    assert.strictEqual(pkg.scripts.build, 'vite build');
    assert.strictEqual(pkg.scripts.preview, 'vite preview');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates vite.config.js', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject('test-app');
    
    const configPath = join(tmpDir, 'test-app', 'vite.config.js');
    assert.ok(existsSync(configPath), 'vite.config.js should exist');
    
    const content = readFileSync(configPath, 'utf-8');
    assert.ok(content.includes('nuvshaPlugin'), 'vite.config.js should use nuvshaPlugin');
    assert.ok(content.includes('server'), 'vite.config.js should configure server');
    assert.ok(content.includes('open: true'), 'vite.config.js should have open: true');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates index.html', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject('test-app');
    
    const htmlPath = join(tmpDir, 'test-app', 'index.html');
    assert.ok(existsSync(htmlPath), 'index.html should exist');
    
    const content = readFileSync(htmlPath, 'utf-8');
    assert.ok(content.includes('id="app"'), 'index.html should have the #app container');
    assert.ok(content.includes('/src/main.js'), 'index.html should load main.js');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates src/main.js', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject('test-app');
    
    const mainPath = join(tmpDir, 'test-app', 'src', 'main.js');
    assert.ok(existsSync(mainPath), 'src/main.js should exist');
    
    const content = readFileSync(mainPath, 'utf-8');
    assert.ok(content.includes("from 'nuvsha'"), 'main.js should import from nuvsha');
    assert.ok(content.includes("from './App.nuv'"), 'main.js should import App.nuv');
    assert.ok(content.includes('mount('), 'main.js should call mount()');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates src/App.nuv', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject('test-app');
    
    const nuvPath = join(tmpDir, 'test-app', 'src', 'App.nuv');
    assert.ok(existsSync(nuvPath), 'src/App.nuv should exist');
    
    const content = readFileSync(nuvPath, 'utf-8');
    assert.ok(content.includes('Nuvsha'), 'App.nuv should contain Nuvsha branding');
    assert.ok(content.includes('<div'), 'App.nuv should contain a div');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('creates public/nuvsha.svg', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    await createProject('test-app');
    
    const svgPath = join(tmpDir, 'test-app', 'public', 'nuvsha.svg');
    assert.ok(existsSync(svgPath), 'public/nuvsha.svg should exist');
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ─────────────────────────────────────────────
// Tests: validation
// ─────────────────────────────────────────────

test('rejects if target directory is not empty', async (t) => {
  const tmpDir = makeTmpDir();
  const originalCwd = process.cwd();

  try {
    process.chdir(tmpDir);
    
    // Create the project directory and put a file in it
    const projectDir = join(tmpDir, 'existing-app');
    mkdirSync(projectDir);
    writeFileSync(join(projectDir, 'some-file.txt'), 'hello');
    
    await assert.rejects(
      () => createProject('existing-app'),
      /already exists and is not empty/,
      'should throw if directory is not empty'
    );
  } finally {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
  }
});
