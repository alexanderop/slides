#!/usr/bin/env node

import { readdir, stat, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const presentationsDir = join(rootDir, 'presentations');

async function extractSlideMetadata(presentationPath) {
  try {
    const slidesPath = join(presentationPath, 'slides.md');
    const content = await readFile(slidesPath, 'utf-8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\\s*\\n([\\s\\S]*?)\\n---/);
    if (!frontmatterMatch) return {};
    
    const frontmatter = frontmatterMatch[1];
    const metadata = {};
    
    // Parse YAML-like frontmatter
    const lines = frontmatter.split('\\n');
    for (const line of lines) {
      const match = line.match(/^(\\w+):\\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        metadata[key] = value.replace(/['"]/g, '');
      }
    }
    
    return metadata;
  } catch (error) {
    return {};
  }
}

async function listPresentations() {
  try {
    const items = await readdir(presentationsDir);
    const presentations = [];
    
    for (const item of items) {
      const itemPath = join(presentationsDir, item);
      const stats = await stat(itemPath);
      
      if (stats.isDirectory()) {
        const metadata = await extractSlideMetadata(itemPath);
        const packageJsonPath = join(itemPath, 'package.json');
        
        let packageInfo = {};
        try {
          const packageContent = await readFile(packageJsonPath, 'utf-8');
          packageInfo = JSON.parse(packageContent);
        } catch (error) {
          // Package.json not found or invalid
        }
        
        presentations.push({
          name: item,
          title: metadata.title || item,
          author: metadata.author || 'Unknown',
          theme: metadata.theme || 'default',
          date: metadata.date || 'Unknown',
          lastModified: stats.mtime,
          packageName: packageInfo.name || item
        });
      }
    }
    
    // Sort by last modified (most recent first)
    presentations.sort((a, b) => b.lastModified - a.lastModified);
    
    return presentations;
  } catch (error) {
    console.error('Error listing presentations:', error.message);
    return [];
  }
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function main() {
  console.log('📋 Slide Presentations\\n');
  
  const presentations = await listPresentations();
  
  if (presentations.length === 0) {
    console.log('No presentations found.');
    console.log('\\n💡 Create a new presentation with: pnpm new');
    return;
  }
  
  // Display presentations in a table format
  console.log('┌─────────────────────────────────────────────────────────────────────────┐');
  console.log('│ Name                    │ Title                    │ Author     │ Theme    │');
  console.log('├─────────────────────────────────────────────────────────────────────────┤');
  
  presentations.forEach(presentation => {
    const name = presentation.name.padEnd(23).substring(0, 23);
    const title = presentation.title.padEnd(24).substring(0, 24);
    const author = presentation.author.padEnd(10).substring(0, 10);
    const theme = presentation.theme.padEnd(8).substring(0, 8);
    
    console.log(`│ ${name} │ ${title} │ ${author} │ ${theme} │`);
  });
  
  console.log('└─────────────────────────────────────────────────────────────────────────┘');
  
  console.log('\\n🚀 Quick commands:');
  presentations.forEach(presentation => {
    console.log(`   pnpm dev ${presentation.name.padEnd(25)} # ${presentation.title}`);
  });
  
  console.log('\\n💡 Other commands:');
  console.log('   pnpm new                          # Create new presentation');
  console.log('   pnpm build:all                    # Build all presentations');
  console.log('   pnpm export:all                   # Export all presentations');
}

main();