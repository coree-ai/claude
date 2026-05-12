import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function replaceInFile(p, oldStr, newStr) {
  const content = fs.readFileSync(p, 'utf8');
  const newContent = content.replaceAll(oldStr, newStr);
  fs.writeFileSync(p, newContent);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/bump-version.mjs <new-version>');
  process.exit(1);
}

const newVersion = args[0];

// Update .claude-plugin/plugin.json
const pluginPath = path.join(REPO_ROOT, '.claude-plugin/plugin.json');
const plugin = readJson(pluginPath);
const currentVersionFull = plugin.version;
const currentVersion = currentVersionFull.split('-')[0];

plugin.version = `${newVersion}-1`;
writeJson(pluginPath, plugin);

// Update MCP server version in .mcp.json
const mcpPath = path.join(REPO_ROOT, '.mcp.json');
replaceInFile(mcpPath, currentVersion, newVersion);

// Update hooks.json
const hooksPath = path.join(REPO_ROOT, 'hooks/hooks.json');
replaceInFile(hooksPath, currentVersion, newVersion);

console.log(`Bumped Claude plugin to ${newVersion}-1`);
console.log(`Updated MCP server reference to @coree-ai/coree@${newVersion}`);
