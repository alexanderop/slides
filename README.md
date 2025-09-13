# Slidev Presentations Workspace

A pnpm workspace for managing multiple [Slidev](https://sli.dev/) presentations with shared dependencies, templates, and easy presentation creation.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

### Setup
```bash
# Install all dependencies
pnpm install

# List all presentations
pnpm list

# Create a new presentation
pnpm new

# Start development server for a specific presentation
pnpm dev <presentation-name>
```

## 📁 Project Structure

```
slides/
├── pnpm-workspace.yaml        # Workspace configuration
├── package.json              # Root dependencies and scripts
├── presentations/            # All slide presentations
│   ├── how-i-use-llms/
│   ├── how-to-test-vue-composables/
│   └── localFirstVue/
├── shared/                   # Shared resources
│   ├── components/          # Reusable Vue components
│   ├── themes/             # Custom themes
│   ├── assets/             # Images, icons, etc.
│   └── utils/              # Helper functions
├── templates/               # Presentation templates
│   └── default/            # Default template
└── scripts/                # Utility scripts
    ├── new-slide.js        # Create new presentations
    ├── dev.js             # Development server
    ├── build.js           # Build presentations
    ├── export.js          # Export presentations
    └── list-presentations.js
```

## 🛠️ Commands

### Workspace Management
```bash
# List all presentations
pnpm list

# Install dependencies for all presentations
pnpm install

# Clean all node_modules
pnpm clean
```

### Development
```bash
# Start development server for a specific presentation
pnpm dev <presentation-name>
pnpm dev how-i-use-llms

# Start development for multiple presentations (in separate terminals)
pnpm dev how-i-use-llms &
pnpm dev localFirstVue &
```

### Building & Exporting
```bash
# Build a specific presentation
pnpm build <presentation-name>
pnpm build how-i-use-llms

# Build all presentations
pnpm build:all

# Export a specific presentation (PDF, PNG, etc.)
pnpm export <presentation-name>
pnpm export how-i-use-llms

# Export all presentations
pnpm export:all
```

### Creating New Presentations
```bash
# Interactive presentation creation
pnpm new

# This will prompt you for:
# - Presentation title
# - Author name
# - Description (optional)
```

## 📝 Creating a New Presentation

1. **Run the creation command:**
   ```bash
   pnpm new
   ```

2. **Fill in the details:**
   - **Title**: Your presentation title (e.g., "Introduction to Vue.js")
   - **Author**: Your name
   - **Description**: Brief description of the presentation

3. **Start developing:**
   ```bash
   pnpm dev <generated-presentation-name>
   ```

The new presentation will be created in `presentations/<slugified-title>/` with:
- Pre-configured `package.json` with workspace dependencies
- Template `slides.md` with your details
- Standard directory structure (components, images, etc.)
- Git-ready with `.gitignore`

## 🔧 Workspace Benefits

### Shared Dependencies
All presentations share common Slidev dependencies through the workspace:
- `@slidev/cli`
- `@slidev/theme-default`
- `@slidev/theme-seriph`
- `@slidev/theme-apple-basic`
- `slidev-theme-geist`
- `vue`

### Shared Resources
- **Components**: Reusable Vue components in `shared/components/`
- **Themes**: Custom theme configurations in `shared/themes/`
- **Assets**: Common images, icons in `shared/assets/`
- **Utils**: Helper functions in `shared/utils/`

### Template System
New presentations are created from templates in `templates/` with:
- Pre-configured frontmatter
- Standard directory structure
- Workspace dependency references
- Example content

## 🎨 Using Shared Resources

### Shared Components
```markdown
---
setup: |
  import { MyComponent } from '@slides/shared/components/MyComponent.vue'
---

# My Slide

<MyComponent />
```

### Shared Assets
```markdown
![Logo](../../../shared/assets/logo.png)
```

### Shared Utilities
```typescript
// In setup/main.ts
import { formatDate, slugify } from '@slides/shared/utils'
```

## 📋 Existing Presentations

- **how-i-use-llms**: How I use LLMs as a Software Developer
- **how-to-test-vue-composables**: How to Test Vue Composables
- **localFirstVue**: Local-First Vue Applications

## 🔄 Migration from Individual Projects

This workspace was created by:
1. Moving existing presentations to `presentations/` directory
2. Extracting common dependencies to root `package.json`
3. Converting individual `package.json` files to use workspace dependencies
4. Creating shared resource structure
5. Adding automation scripts for common tasks

## 🚀 Development Workflow

1. **List available presentations:**
   ```bash
   pnpm list
   ```

2. **Create new presentation:**
   ```bash
   pnpm new
   ```

3. **Start development:**
   ```bash
   pnpm dev <presentation-name>
   ```

4. **Build for production:**
   ```bash
   pnpm build <presentation-name>
   ```

5. **Export as PDF/PNG:**
   ```bash
   pnpm export <presentation-name>
   ```

## 📦 Adding Dependencies

### Workspace-wide Dependencies
Add to root `package.json`:
```bash
pnpm add -w <package-name>
pnpm add -Dw <dev-package-name>
```

### Presentation-specific Dependencies
```bash
cd presentations/<presentation-name>
pnpm add <package-name>
```

## 🤝 Contributing

1. Create presentations using `pnpm new`
2. Use shared resources when possible
3. Add reusable components to `shared/components/`
4. Update templates for common patterns
5. Keep individual presentations focused and minimal

## 📚 Resources

- [Slidev Documentation](https://sli.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Vue.js](https://vuejs.org/)

---

*Happy presenting! 🎉*