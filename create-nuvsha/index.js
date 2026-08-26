import { readFileSync, mkdirSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname doesn't exist in ES Modules (the "type: module" files).
// This is how we recreate it: we get the path to this file, then take its directory.
const __dirname = dirname(fileURLToPath(import.meta.url));

// This is where our template files live, relative to this file.
const TEMPLATES_DIR = join(__dirname, 'templates', 'default');

/**
 * A small helper to print a colored checkmark line to the console.
 * \u001b[32m is the ANSI code for green color, \u001b[0m resets it.
 */
function ok(msg) {
  console.log(`  \u001b[32m\u2714\u001b[0m ${msg}`);
}

/**
 * Copies a file from the template directory into the new project directory.
 *
 * @param {string} templateRelPath - e.g., "src/main.js"
 * @param {string} projectDir - The absolute path to the new project folder
 */
function copyTemplateFile(templateRelPath, projectDir) {
  const sourcePath = join(TEMPLATES_DIR, templateRelPath);
  const destPath = join(projectDir, templateRelPath);

  // Make sure the destination directory exists (e.g., create "src/" if needed)
  mkdirSync(dirname(destPath), { recursive: true });

  // Read the template file content and write it to the new location
  const content = readFileSync(sourcePath, 'utf-8');
  writeFileSync(destPath, content, 'utf-8');
}

/**
 * Creates a directory and places a .gitkeep inside so the folder is tracked by git.
 * These are the convention folders — empty by default.
 * Developers can add their own files here, or add entirely different folders.
 *
 * @param {string} relPath - e.g., "src/hooks"
 * @param {string} projectDir
 */
function createEmptyDir(relPath, projectDir) {
  const dirPath = join(projectDir, relPath);
  mkdirSync(dirPath, { recursive: true });
  writeFileSync(join(dirPath, '.gitkeep'), '', 'utf-8');
}

/**
 * Creates a brand-new Nuvsha project in a folder named `projectName`.
 *
 * Generated structure:
 *
 *   my-app/
 *   ├── package.json
 *   ├── vite.config.js
 *   ├── index.html
 *   └── src/
 *       ├── App.nuv           ← root component
 *       ├── main.js           ← entry point
 *       ├── pages/
 *       │   └── Home.nuv
 *       ├── components/
 *       │   ├── Navbar.nuv
 *       │   └── Button.nuv
 *       ├── layouts/
 *       │   └── MainLayout.nuv
 *       ├── hooks/            ← empty (add your own hooks here)
 *       ├── logic/            ← empty (add reusable logic here)
 *       ├── services/         ← empty (add API/service code here)
 *       ├── store/            ← empty (add state stores here)
 *       ├── utils/            ← empty (add helper utilities here)
 *       └── assets/           ← empty (put images, fonts, etc. here)
 *
 * You are NOT required to use every directory.
 * Add your own folders freely — the compiler doesn't care about structure.
 *
 * @param {string} projectName - The name the user passed in, e.g. "my-app"
 */
export async function createProject(projectName) {
  const projectDir = join(process.cwd(), projectName);

  console.log('');
  console.log(`  Creating Nuvsha app \u001b[36m${projectName}\u001b[0m...`);
  console.log('');

  // --- Safety Check ---
  // If the folder already exists and has files in it, refuse to continue.
  // We NEVER delete or overwrite someone's existing work.
  if (existsSync(projectDir)) {
    const existing = readdirSync(projectDir);
    if (existing.length > 0) {
      throw new Error(
        `Directory "${projectName}" already exists and is not empty.\n` +
        `  Choose a different name or delete the folder first.`
      );
    }
  }

  // --- Create Project Folder ---
  mkdirSync(projectDir, { recursive: true });
  ok('Creating project');

  // --- Copy Root Template Files ---
  copyTemplateFile('index.html', projectDir);
  copyTemplateFile('vite.config.js', projectDir);
  ok('Configuring Vite');

  // --- Copy Source Template Files ---
  copyTemplateFile('src/main.js', projectDir);
  copyTemplateFile('src/App.nuv', projectDir);
  copyTemplateFile('src/pages/Home.nuv', projectDir);
  copyTemplateFile('src/components/Navbar.nuv', projectDir);
  copyTemplateFile('src/components/Button.nuv', projectDir);
  copyTemplateFile('src/layouts/MainLayout.nuv', projectDir);
  ok('Copying template');

  // --- Create Empty Convention Directories ---
  // These are useful defaults. You are free to ignore them or add your own.
  createEmptyDir('src/hooks', projectDir);
  createEmptyDir('src/logic', projectDir);
  createEmptyDir('src/services', projectDir);
  createEmptyDir('src/store', projectDir);
  createEmptyDir('src/utils', projectDir);
  copyTemplateFile('src/assets/main.css', projectDir);
  ok('Creating project structure');

  // --- Write package.json with the correct project name ---
  // We write this one programmatically so we can insert the actual project name.
  const packageJson = {
    name: projectName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      nuvsha: '^0.1.0'
    },
    devDependencies: {
      vite: '^5.0.0',
      '@tailwindcss/vite': '^4.0.0',
      'tailwindcss': '^4.0.0'
    }
  };
  writeFileSync(
    join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  );
  ok('Configuring Nuvsha');
  ok('Project created');

  // --- Success Message ---
  console.log('');
  console.log('  \u001b[32mNext steps:\u001b[0m');
  console.log('');
  console.log(`    \u001b[36mcd ${projectName}\u001b[0m`);
  console.log(`    \u001b[36mnpm install\u001b[0m`);
  console.log(`    \u001b[36mnpm run dev\u001b[0m`);
  console.log('');
  console.log('  Happy building with Nuvsha! \u2728');
  console.log('');
}
