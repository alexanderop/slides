#!/usr/bin/env node

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const presentationsDir = join(rootDir, 'presentations');

async function listPresentations() {
  try {
    const items = await readdir(presentationsDir);
    const presentations = [];
    
    for (const item of items) {
      const itemPath = join(presentationsDir, item);
      const stats = await stat(itemPath);
      if (stats.isDirectory()) {
        presentations.push(item);
      }
    }
    
    return presentations;
  } catch (error) {
    console.error('Error listing presentations:', error.message);
    return [];
  }
}

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit'
    });
    
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function main() {
  const presentationName = process.argv[2];
  
  if (!presentationName) {
    const presentations = await listPresentations();
    console.log('📋 Available presentations:');
    presentations.forEach(name => console.log(`   - ${name}`));
    console.log('\\n💡 Usage: pnpm export <presentation-name>');
    console.log('   Example: pnpm export how-i-use-llms');
    console.log('   Or export all: pnpm export:all');
    process.exit(1);
  }
  
  const presentationPath = join(presentationsDir, presentationName);
  
  try {
    await stat(presentationPath);
  } catch (error) {
    console.error(`❌ Presentation "${presentationName}" not found`);
    const presentations = await listPresentations();
    console.log('\\n📋 Available presentations:');
    presentations.forEach(name => console.log(`   - ${name}`));
    process.exit(1);
  }
  
  console.log(`📄 Exporting presentation: ${presentationName}`);
  
  try {
    await runCommand('pnpm', ['export'], presentationPath);
    console.log(`✅ Successfully exported: ${presentationName}`);
  } catch (error) {
    console.error(`❌ Failed to export: ${presentationName}`);
    console.error(error.message);
    process.exit(1);
  }
}

main();