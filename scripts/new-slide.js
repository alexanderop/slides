#!/usr/bin/env node

import { readdir, cp, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const templatesDir = join(rootDir, 'templates');
const presentationsDir = join(rootDir, 'presentations');

// Create readline interface for user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function replaceTemplateVariables(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

async function processTemplateFile(sourcePath, destPath, variables) {
  try {
    const content = await readFile(sourcePath, 'utf-8');
    const processedContent = await replaceTemplateVariables(content, variables);
    await writeFile(destPath, processedContent, 'utf-8');
  } catch (error) {
    // If file is not text (e.g., images), just copy it
    await cp(sourcePath, destPath);
  }
}

async function copyTemplate(templatePath, destPath, variables) {
  const items = await readdir(templatePath, { withFileTypes: true });
  
  for (const item of items) {
    const sourcePath = join(templatePath, item.name);
    const destItemPath = join(destPath, item.name);
    
    if (item.isDirectory()) {
      await mkdir(destItemPath, { recursive: true });
      await copyTemplate(sourcePath, destItemPath, variables);
    } else {
      await processTemplateFile(sourcePath, destItemPath, variables);
    }
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function main() {
  try {
    console.log('🎬 Create a new Slidev presentation\\n');
    
    // Get presentation details from user
    const title = await question('Presentation title: ');
    const author = await question('Author name: ');
    const description = await question('Description (optional): ');
    
    // Generate presentation name from title
    const presentationName = slugify(title);
    
    if (!title || !author) {
      console.error('❌ Title and author are required');
      process.exit(1);
    }
    
    // Check if presentation already exists
    const destPath = join(presentationsDir, presentationName);
    try {
      await readdir(destPath);
      console.error(`❌ Presentation "${presentationName}" already exists`);
      process.exit(1);
    } catch {
      // Directory doesn't exist, which is what we want
    }
    
    // Template variables
    const variables = {
      PRESENTATION_NAME: presentationName,
      PRESENTATION_TITLE: title,
      AUTHOR_NAME: author,
      PRESENTATION_DESCRIPTION: description || `A presentation by ${author}`,
      CURRENT_DATE: new Date().toISOString().split('T')[0]
    };
    
    console.log(`\\n📁 Creating presentation: ${presentationName}`);
    
    // Create destination directory
    await mkdir(destPath, { recursive: true });
    
    // Copy template files
    const templatePath = join(templatesDir, 'default');
    await copyTemplate(templatePath, destPath, variables);
    
    console.log('✅ Presentation created successfully!');
    console.log(`\\n📂 Location: presentations/${presentationName}`);
    console.log('\\n🚀 Next steps:');
    console.log(`   cd presentations/${presentationName}`);
    console.log(`   pnpm dev`);
    console.log('\\n   Or from the root:');
    console.log(`   pnpm dev ${presentationName}`);
    
  } catch (error) {
    console.error('❌ Error creating presentation:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();