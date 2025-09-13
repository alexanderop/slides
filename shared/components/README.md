# Shared Components

Place reusable Vue components here that can be used across multiple presentations.

## Usage

Import components from your presentation's slides.md:

```markdown
---
setup: |
  import { MyComponent } from '@slides/shared/components/MyComponent.vue'
---

# My Slide

<MyComponent />
```