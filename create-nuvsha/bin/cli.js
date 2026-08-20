#!/usr/bin/env node
import { createProject } from '../index.js';

/**
 * The CLI entry point.
 *
 * This is the file that runs when you type:
 *   npx create-nuvsha my-app
 *
 * The first line (#!/usr/bin/env node) is called a "shebang".
 * It tells your operating system: "run this file using Node.js".
 * Without it, the OS would not know what program to use to run the file.
 */

// process.argv is a built-in Node.js array of everything you typed in the terminal.
// For example: npx create-nuvsha my-app
//   process.argv[0] = 'node'
//   process.argv[1] = '/path/to/cli.js'
//   process.argv[2] = 'my-app'   <-- this is the project name we want
const projectName = process.argv[2];

// --- Validation ---

if (!projectName) {
  console.error('\nNuvsha Error: Please provide a project name.\n');
  console.error('  Example: npx create-nuvsha my-app\n');
  process.exit(1); // Exit with error code 1 so the terminal knows something went wrong
}

// A valid project name should only contain letters, numbers, hyphens, and underscores.
// This matches what npm also allows for package names.
const validName = /^[a-zA-Z0-9_-]+$/.test(projectName);
if (!validName) {
  console.error(`\nNuvsha Error: "${projectName}" is not a valid project name.`);
  console.error('  Use only letters, numbers, hyphens (-), and underscores (_).\n');
  process.exit(1);
}

// --- Run ---

try {
  await createProject(projectName);
} catch (err) {
  console.error(`\nNuvsha Error: ${err.message}\n`);
  process.exit(1);
}
