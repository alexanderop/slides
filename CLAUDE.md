# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm workspace for managing multiple Slidev presentations with shared dependencies, templates, and utilities. The workspace architecture allows multiple presentation projects to share common resources while maintaining isolation.

## Architecture

### Workspace Structure
- **Root**: Contains workspace configuration and shared scripts
- **presentations/**: Individual Slidev presentation projects (how-i-use-llms, how-to-test-vue-composables, localFirstVue)
- **shared/**: Shared components, themes, assets, and utilities accessible to all presentations
- **scripts/**: Node.js automation scripts for presentation management
- **templates/**: Base templates for creating new presentations

### Key Design Patterns
- **Monorepo with pnpm workspaces**: All presentations share dependencies through workspace configuration
- **Shared resource system**: Components, themes, and utilities are centralized in `shared/` and imported using `@slides/shared/*` paths
- **Script-based automation**: Custom Node.js scripts handle common tasks like dev servers, building, and presentation creation

## Common Commands

### Workspace Management
```bash
# List all available presentations
pnpm list

# Install all dependencies across workspace
pnpm install

# Clean all node_modules
pnpm clean
```

### Development
```bash
# Start development server for specific presentation
pnpm dev <presentation-name>
pnpm dev how-i-use-llms

# Build specific presentation
pnpm build <presentation-name>

# Build all presentations in parallel
pnpm build:all

# Export presentation to PDF/PNG
pnpm export <presentation-name>

# Export all presentations
pnpm export:all
```

### Creating New Presentations
```bash
# Interactive presentation creator
pnpm new
```

## Development Workflow

1. Use `pnpm list` to see available presentations
2. Use `pnpm dev <name>` to start development server
3. Edit slides in `presentations/<name>/slides.md`
4. Use shared resources from `@slides/shared/*` imports
5. Build with `pnpm build <name>` before exporting

## Important Files

- `pnpm-workspace.yaml`: Defines workspace packages structure
- `scripts/`: Contains all automation logic for presentation management
- `shared/package.json`: Defines export paths for shared resources
- `presentations/*/slides.md`: Main presentation content files

## Shared Resources Usage

Import shared components in presentation setup:
```typescript
import { ComponentName } from '@slides/shared/components/ComponentName.vue'
```

Access shared assets with relative paths:
```markdown
![Image](../../../shared/assets/image.png)
```

## Technical Notes

- All presentations use Slidev framework
- Scripts are ES modules using Node.js spawn for process management
- Workspace uses pnpm for dependency management and parallel execution
- Each presentation maintains its own package.json but inherits workspace dependencies