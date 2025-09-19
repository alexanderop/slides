---
layout: default
---

# Module-Specific AI Instructions

<div class="grid grid-cols-2 gap-6">
  <div v-click="1">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">📄 CLAUDE.md</div>
    
```markdown
# Tech Stack
- Framework: Vue 3 + Vite
- State: Pinia stores  
- Types: TypeScript
- Testing: Vitest + Testing Library

# Project Structure
- `modules/checkout/`: Shopping cart & orders
- `modules/checkout/stores/`: Cart state management
- `modules/checkout/types/`: TypeScript interfaces

# Commands
- `pnpm test checkout`: Run checkout tests
- `pnpm dev`: Start development server

# Code Style
- All prices in cents (integer)
- Use CartItem interface for cart data
- Validate with Zod before submission
```
  </div>

  <div v-click="2">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🤖 VS Code Scoped Instructions</div>
    
```markdown
---
applyTo: "modules/checkout/**/*"
description: "E-commerce checkout rules"
---
# Checkout Module Instructions

## Data Handling
- Store prices as integers (cents)
- Use CartItem interface consistently
- Validate all forms with Zod schemas

## State Management  
- Use Pinia stores for cart state
- Implement optimistic updates
- Handle payment failures gracefully

## Testing
- Test all payment flows
- Mock payment providers
- Verify cart persistence
```
  </div>
</div>