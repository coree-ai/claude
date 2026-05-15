#!/usr/bin/env node
/**
 * Usage: node scripts/update-npx-pin.mjs <plugin-version>
 *
 * Updates the @coree-ai/coree@VERSION pin in .mcp.json and hooks/hooks.json.
 * Called by release-it as an after:bump hook with the full plugin version
 * (e.g. 0.14.0-1). Derives the coree binary version by stripping the suffix.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');

const [pluginVersion] = process.argv.slice(2);
if (!pluginVersion) {
  console.error('Usage: node scripts/update-npx-pin.mjs <plugin-version>');
  process.exit(1);
}

const coreeVersion = pluginVersion.replace(/-\d+$/, '');

function replaceInFile(file, from, to) {
  const content = fs.readFileSync(file, 'utf8');
  const updated = content.replaceAll(from, to);
  if (content === updated) {
    console.warn(`  warning: no replacement made in ${path.relative(REPO_ROOT, file)}`);
  } else {
    fs.writeFileSync(file, updated);
    console.log(`  updated ${path.relative(REPO_ROOT, file)}`);
  }
}

const mcpPath = path.join(REPO_ROOT, '.mcp.json');
const hooksPath = path.join(REPO_ROOT, 'hooks', 'hooks.json');

const currentPin = fs.readFileSync(mcpPath, 'utf8').match(/@coree-ai\/coree@([^"]+)/)?.[1];
if (!currentPin) {
  console.error('Could not detect current coree version pin in .mcp.json');
  process.exit(1);
}

console.log(`npx pin: ${currentPin} -> ${coreeVersion}\n`);

replaceInFile(mcpPath, `@coree-ai/coree@${currentPin}`, `@coree-ai/coree@${coreeVersion}`);
replaceInFile(hooksPath, `@coree-ai/coree@${currentPin}`, `@coree-ai/coree@${coreeVersion}`);
