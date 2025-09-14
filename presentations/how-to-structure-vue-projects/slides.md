---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-up
css: 
  - unocss
  - ./style.css
colorSchema: dark
background: '#212733'
title: 'How to Structure Vue Projects'
fonts:
  sans: 'Roboto'
  mono: 'Fira Code'
defaults:
  layout: 'center'
themeConfig:
  primary: '#FF6BED'
mermaid:
  theme: base
  themeVariables:
    background: '#212733'
    primaryColor: '#FF6BED'
    primaryTextColor: '#EAE9F3'
    primaryBorderColor: '#AB4B99'
    lineColor: '#AB4B99'
    secondaryColor: '#344060'
    tertiaryColor: '#8A337B'
mdc: true
layout: image
image: images/pragVue.png
backgroundSize: contain
glowSeed: 4
lang: en
icons:
  collections:
    logos:
      - vite
      - vue
      - laravel
      - nuxt-icon
      - tailwindcss-icon
      - graphql
      - express
      - astro
      - react
      - typescript
      - javascript
      - nodejs
      - mysql
      - postgresql
      - mongodb
      - docker
      - github
    carbon:
      - user
      - logo-github
      - email
      - logo-twitter
---

---
layout: image
image: images/howToStructure.png
backgroundSize: contain
---

---
layout: image
image: images/reddit.png
backgroundSize: contain
---

---
layout: image
image: images/chatgpt.png
backgroundSize: contain
---

---
layout: intro
glowSeed: 15
glowOpacity: 0.3
class: 'pl-30'
---


# Alexander Opalic

<div class="absolute top-20 right-30 flex flex-col items-center">
  <img src="https://avatars.githubusercontent.com/u/33398393?v=4" class="w-40 h-40 rounded-full" />
</div>

<div class="text-xl opacity-80 mb-4 flex items-center gap-2">
  <div class="opacity-50">Senior Full Stack Developer</div>
  <div>at</div>
  <div class="opacity-80">Otto Payments 🦞</div>
</div>

<div class="text-lg opacity-70 mb-8">
  7 years of development experience in the Munich Area
</div>

<div class="text-lg opacity-70 mb-8 text-primary font-bold">
  I write blog posts at alexop.dev - check them out!
</div>

<div class="flex flex-wrap gap-2 my-8">
  <ContactItem
    iconClass="i-carbon-user"
    text="alexop.dev"
    color="#60A5FA"
  />
  <ContactItem
    iconClass="i-carbon-logo-github"
    text="alexanderop"
    color="#A78BFA"
  />
  <ContactItem
    iconClass="i-carbon-email"
    text="alex.opalic.dev@gmail.com"
    color="#4ADE80"
  />
  <ContactItem
    iconClass="i-carbon-logo-x"
    text="@alexanderopalic"
    color="#3B82F6"
  />
</div>
---
layout: center
class: 'text-center'
---

# Why Structure  Matters

---
layout: quote
class: 'text-center'
---

<QuoteCard author="Mel Conway">
  "Organizations which design systems are constrained to produce designs which are <span v-mark.underline.red="1">copies of the communication structures</span> of these organizations."
</QuoteCard>

<div v-click="2" class="mt-8 text-lg opacity-70">
  Known as <span class="text-primary font-bold">Conway's Law</span>
</div>


---
layout: image
image: images/largeColocated.png
backgroundSize: contain
---

---
layout: image
image: images/smallTeams.png
backgroundSize: contain
---

---
layout: center
---

# How to Choose?

<div class="grid grid-cols-3 gap-8 mt-8">
  <div v-click="1" class="text-center">
    <div class="text-6xl mb-4">👤</div>
    <div class="font-bold text-xl mb-2">Team Size</div>
    <div class="opacity-70">Solo → Enterprise</div>
  </div>
  
  <div v-click="2" class="text-center">
    <div class="text-6xl mb-4">🎯</div>
    <div class="font-bold text-xl mb-2">Complexity</div>
    <div class="opacity-70">Simple → Advanced</div>
  </div>
  
  <div v-click="3" class="text-center">
    <div class="text-6xl mb-4">⏱️</div>
    <div class="font-bold text-xl mb-2">Timeline</div>
    <div class="opacity-70">Prototype → Long-term</div>
  </div>
</div>

---
layout: center
class: 'text-center'
---

# 4 Vue Project Structures

<div class="text-xl opacity-80 mb-8">From simple to enterprise-scale solutions</div>

<div class="grid grid-cols-4 gap-6 mt-8">
  <div v-click="1" class="text-center">
    <div class="text-4xl mb-2">📁</div>
    <div class="font-bold">Flat</div>
    <div class="text-sm opacity-70">Small projects</div>
  </div>
  
  <div v-click="2" class="text-center">
    <div class="text-4xl mb-2">⚛️</div>
    <div class="font-bold">Atomic</div>
    <div class="text-sm opacity-70">Scalable apps</div>
  </div>
  
  <div v-click="3" class="text-center">
    <div class="text-4xl mb-2">🧩</div>
    <div class="font-bold">Modular</div>
    <div class="text-sm opacity-70">Feature-based</div>
  </div>
  
  <div v-click="4" class="text-center">
    <div class="text-4xl mb-2">🏢</div>
    <div class="font-bold">Micro</div>
    <div class="text-sm opacity-70">Enterprise</div>
  </div>
</div>


---
layout: default
clicks: 4
---

  <FolderTree
    root
    title="Flat"
    :structure="`src/
  App.vue
  Main.ts
  routes.ts
  components/
    Button.vue
    baseButton.vue
    Btn.vue
    mycomponent.vue
    Todo.vue
    todoItem.vue
  views/
    Home.vue
  pages/
    HomePage.vue
  composables/
    useUser.ts
    formatDate.ts
    mathHelpers.ts
  store/
    index.js
  stores/
    user.js`"
    :open-on-clicks="[
      '/src',
      '/src/components',
      '/src/views',
      '/src/pages',
      '/src/composables',
      '/src/stores'
    ]"
  />
---
layout: image
image: 'images/styleGuide.png'
backgroundSize: contain
---


---
layout: default
clicks: 9
---

<FolderTree
  root
  title="Flat Structure"
  :structure="`src/
  components/
    BaseButton.vue
    BaseCard.vue
    PokemonCard.vue
  composables/
    usePokemon.js
  utils/
    validators.js
  layout/
    DefaultLayout.vue
    AdminLayout.vue
  views/
    Home.vue
  router/
    index.js
  store/
    index.js
  assets/
App.vue
main.js`"
  :open-on-clicks="[
    '/src',
    '/src/components',
    '/src/composables', 
    '/src/utils',
    '/src/layout',
    '/src/views',
    '/src/router',
    '/src/store',
    '/src/assets'
  ]"
/>


---
layout: image
image: 'images/atomic.svg'
backgroundSize: contain
---

---
layout: center
---

# Atomic Design Cheatsheet

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">⚛️ Atoms</div>
    <div class="text-sm opacity-80 mb-2">Basic building blocks that can't be broken down further</div>
    <div class="text-xs opacity-70">Examples: Button, Input, Icon, Label</div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🧬 Molecules</div>
    <div class="text-sm opacity-80 mb-2">Groups of atoms bonded together</div>
    <div class="text-xs opacity-70">Examples: SearchBox (Input + Button), Form Field (Label + Input)</div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🦠 Organisms</div>
    <div class="text-sm opacity-80 mb-2">Groups of molecules joined together to form distinct sections</div>
    <div class="text-xs opacity-70">Examples: Header, Footer, Product List, Navigation</div>
  </div>
  
  <div v-click="4" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">📄 Templates</div>
    <div class="text-sm opacity-80 mb-2">Page-level objects that place components into a layout</div>
    <div class="text-xs opacity-70">Examples: Homepage Layout, Article Layout, Dashboard Layout</div>
  </div>
</div>

<div v-click="5" class="mt-8 p-4 bg-card rounded-lg text-center">
  <div class="text-lg font-bold text-primary mb-2">🎯 Key Principle</div>
  <div class="opacity-80">Build from small to large - each level combines elements from the level below</div>
</div>

---
layout: default
clicks: 7
---

<FolderTree
  root
  title="Atomic Design Structure"
  :structure="`src/
  components/
    atoms/
      AtomButton.vue
      AtomIcon.vue
    molecules/
      MoleculeSearchInput.vue
      MoleculePokemonCard.vue
    organisms/
      OrganismHeader.vue
      OrganismPokemonList.vue
    templates/
      TemplateHomePage.vue
      TemplateDetailPage.vue
  pages/
    PageHome.vue
    PagePokemonDetail.vue
  composables/
  utils/
  store/
App.vue`"
  :open-on-clicks="[
    '/src',
    '/src/components',
    '/src/components/atoms',
    '/src/components/molecules',
    '/src/components/organisms',
    '/src/components/templates',
    '/src/pages',
  ]"
/>
---
layout: center
---

# The Tractor Store Exercise 🚜

<div class="text-lg opacity-80 mb-6">A real-world example to compare architectural approaches</div>

<div class="grid grid-cols-3 gap-6 mt-8">
  <div v-click="1" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-4xl mb-3">🔍</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">Explore</div>
    <div class="text-sm opacity-80">Browse tractors by category, search, filter products</div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-4xl mb-3">📋</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">Decide</div>
    <div class="text-sm opacity-80">Product details, specifications, recommendations</div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-4xl mb-3">🛒</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">Checkout</div>
    <div class="text-sm opacity-80">Shopping cart, order process, payment</div>
  </div>
</div>

<div v-click="4" class="mt-8 p-4 bg-card rounded-lg">
  <div class="text-lg font-bold text-primary mb-2">🎯 The Challenge</div>
  <div class="opacity-80">How do we split this into independent parts while maintaining a seamless user experience?</div>
</div>

<div v-click="5" class="mt-6 text-center">
  <div class="text-lg opacity-90">Let's explore two approaches:</div>
  <div class="flex justify-center gap-8 mt-4">
    <div class="flex items-center gap-2">
      <div class="text-2xl">🧩</div>
      <div class="font-bold">Modular (Build-time)</div>
    </div>
    <div class="flex items-center gap-2">
      <div class="text-2xl">🏢</div>
      <div class="font-bold">Micro Frontends (Runtime)</div>
    </div>
  </div>
</div>

---
layout: default
clicks: 6
---

<FolderTree
  root
  title="Modular: Tractor Store with pnpm Workspace"
  :structure="`tractor-store/
  apps/
    main/
      src/
        App.vue
        main.js
        router/
          index.js
        views/
          HomePage.vue
      package.json
  modules/
    explore/
      components/
        ProductGrid.vue
        CategoryFilter.vue
      composables/
        useProductSearch.js
      store/
        exploreStore.js
      package.json
    decide/
      components/
        ProductDetail.vue
        RecommendationList.vue
      composables/
        useProductDetail.js
      package.json
    checkout/
      components/
        CartSummary.vue
        CheckoutForm.vue
      composables/
        useCart.js
      store/
        cartStore.js
      package.json
  packages/
    shared/
      components/
        Button.vue
        Input.vue
      tokens/
        colors.js
      package.json
  pnpm-workspace.yaml
  package.json`"
  :open-on-clicks="[
    '/tractor-store',
    '/tractor-store/apps',
    '/tractor-store/apps/main',
    '/tractor-store/modules',
    '/tractor-store/modules/explore',
    '/tractor-store/modules/decide', 
    '/tractor-store/modules/checkout',
    '/tractor-store/packages',
    '/tractor-store/packages/shared'
  ]"
/>

---
layout: center
---

# Modular Approach: Key Concepts

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🔧 Build-time Composition</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Modules imported as regular dependencies</div>
      <div>• Single build process and deployment</div>
      <div>• Shared code through workspace packages</div>
    </div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">👥 Team Boundaries</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Clear ownership per module</div>
      <div>• Independent development</div>
      <div>• Coordinated releases</div>
    </div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">✅ Benefits</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Simple deployment model</div>
      <div>• No runtime complexity</div>
      <div>• Strong TypeScript support</div>
      <div>• Easy local development</div>
    </div>
  </div>
  
  <div v-click="4" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">⚠️ Trade-offs</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Coordinated deployments required</div>
      <div>• Shared technology stack</div>
      <div>• Build-time coupling</div>
    </div>
  </div>
</div>

<div v-click="5" class="mt-8 p-4 bg-card rounded-lg text-center">
  <div class="text-lg font-bold text-primary mb-2">💡 Perfect For</div>
  <div class="opacity-80">Teams that want clear boundaries without deployment complexity</div>
</div>

---
layout: default
---

# 4. Micro Frontends: Tractor Store with Module Federation 🏢
<div class="text-lg opacity-80 mb-6">Runtime composition with independent deployments</div>

```mermaid{scale: 0.8}
---
title: Tractor Store Micro Frontend Architecture
---
graph TB
    subgraph host["Host App (Rspack)"]
        Router["Router & Shell"]:::host
    end
    
    subgraph explore["Explore MF (Rspack)"]
        ExploreApp["Product Discovery<br>localhost:3004"]:::explore
    end
    
    subgraph decide["Decide MF (Vite)"]
        DecideApp["Product Details<br>localhost:5175"]:::decide
    end
    
    subgraph checkout["Checkout MF (Rspack)"]
        CheckoutApp["Cart & Orders<br>localhost:3003"]:::checkout
    end
    
    Router -.->|"mf:navigate events"| ExploreApp
    Router -.->|"remote loading"| DecideApp
    Router -.->|"cart sync"| CheckoutApp
    
    ExploreApp -.->|"add-to-cart"| CheckoutApp
    DecideApp -.->|"add-to-cart"| CheckoutApp
    CheckoutApp -.->|"updated-cart"| ExploreApp
    
    classDef host fill:#FF6BED,stroke:#AB4B99,stroke-width:2px,color:#000
    classDef explore fill:#344060,stroke:#AB4B99,stroke-width:2px
    classDef decide fill:#8A337B,stroke:#EAEDF3,stroke-width:2px
    classDef checkout fill:#212733,stroke:#FF6BED,stroke-width:2px
```

---
layout: default
clicks: 4
---

<FolderTree
  root
  title="Micro Frontends: Tractor Store Structure"
  :structure="`tractor-store-mf/
  apps/
    host/
      src/
        App.vue
        router.ts
        utils/
          remote.ts
        mf.ts
      package.json
    explore/
      src/
        components/
          ProductGrid.vue
          CategoryFilter.vue
        App.vue
        main.ts
        mf.config.ts
      package.json
    decide/
      src/
        components/
          ProductDetail.vue
        App.vue
        main.ts
        vite.config.ts
      package.json
    checkout/
      src/
        components/
          CartSummary.vue
        stores/
          cartStore.ts
        App.vue
        main.ts
      package.json
  packages/
    shared/
      components/
        Button.vue
        Input.vue
      package.json
  pnpm-workspace.yaml`"
  :open-on-clicks="[
    '/tractor-store-mf',
    '/tractor-store-mf/apps',
    '/tractor-store-mf/apps/host',
    '/tractor-store-mf/apps/explore',
    '/tractor-store-mf/apps/decide',
    '/tractor-store-mf/apps/checkout',
    '/tractor-store-mf/packages'
  ]"
/>

---
layout: default
---

# Module Federation: Key Implementation

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🛣️ Host Router</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Uses <code>remote()</code> utility to load components</div>
      <div>• Routes to <code>explore/HomePage</code></div>
      <div>• Routes to <code>decide/ProductPage</code></div>
      <div>• Routes to <code>checkout/CartPage</code></div>
    </div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🔄 Remote Loader</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Uses Vue's <code>defineAsyncComponent</code></div>
      <div>• Shows loading spinner while fetching</div>
      <div>• Falls back to error component on fail</div>
      <div>• Retries once before giving up</div>
    </div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">📡 Navigation Events</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Host listens for <code>mf:navigate</code> events</div>
      <div>• Remotes dispatch with <code>detail: { to }</code></div>
      <div>• Enables cross-app navigation</div>
      <div>• No direct coupling between apps</div>
    </div>
  </div>
  
  <div v-click="4" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🛒 Cart Synchronization</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Checkout owns cart state</div>
      <div>• Listens for <code>add-to-cart</code> events</div>
      <div>• Syncs via localStorage + events</div>
      <div>• Broadcasts <code>updated-cart</code> changes</div>
    </div>
  </div>
</div>

---
layout: default
---

# Micro Frontends: Trade-offs

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-green-400 font-bold text-lg mb-4">✅ Advantages</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• <strong>Independent deployments</strong> - Teams deploy when ready</div>
      <div>• <strong>Technology flexibility</strong> - Mix Vue 2, Vue 3, even React</div>
      <div>• <strong>Team autonomy</strong> - Own the full stack per domain</div>
      <div>• <strong>Failure isolation</strong> - One remote fails, others work</div>
    </div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-red-400 font-bold text-lg mb-4">❌ Disadvantages</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• <strong>Runtime complexity</strong> - Network requests, loading states</div>
      <div>• <strong>Bundle overhead</strong> - Duplicate dependencies possible</div>
      <div>• <strong>Testing complexity</strong> - Integration tests across remotes</div>
      <div>• <strong>DevOps burden</strong> - Multiple deployment pipelines</div>
    </div>
  </div>
</div>

<div v-click="3" class="mt-8 grid grid-cols-2 gap-8">
  <div class="p-4 bg-card rounded-lg">
    <div class="text-lg font-bold text-primary mb-2">🎯 Perfect For</div>
    <div class="opacity-80 text-sm">Large organizations with multiple teams building complex domains that need independent deployment cycles</div>
  </div>
  
  <div class="p-4 bg-card rounded-lg">
    <div class="text-lg font-bold text-primary mb-2">📚 Learn More</div>
    <div class="opacity-80 text-sm">
      <a href="https://alexop.dev/posts/microfrontends-module-federation-vue/" class="hover:text-primary transition-colors">
        Full implementation guide →
      </a>
    </div>
  </div>
</div>

---
layout: center
class: 'text-center'
---

# Structure Comparison

<div class="text-xl opacity-80 mb-8">Which one should you choose?</div>

| Structure | Team Size | Complexity | Best For |
|-----------|-----------|------------|----------|
| **Flat** 📁 | Solo - Small | Low | Prototypes, MVPs, Simple apps |
| **Atomic** ⚛️ | Small - Medium | Medium | Design systems, Scalable apps |
| **Modular** 🧩 | Medium | Medium-High | Feature-rich applications |
| **Micro** 🏢 | Enterprise | Very High | Multi-team organizations |

<div v-click="1" class="mt-8 p-4 bg-card rounded-lg">
  <div class="text-lg font-bold text-primary mb-2">💡 Golden Rule</div>
  <div class="opacity-80">Start simple and evolve your structure as your team and project grow</div>
</div>

---
layout: center
---

# Best Practices

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1">
    <div class="text-primary font-bold text-lg mb-4">📝 Naming Conventions</div>
    <div class="space-y-2 text-sm">
      <div>• **Base components**: `BaseButton.vue`, `BaseIcon.vue`</div>
      <div>• **Related components**: `TodoList.vue`, `TodoListItem.vue`</div>
      <div>• **High-level first**: `SearchButtonClear.vue`</div>
    </div>
  </div>

  <div v-click="2">
    <div class="text-primary font-bold text-lg mb-4">🧪 Test Organization</div>
    <div class="space-y-2 text-sm">
      <div>• **Option 1**: Separate `/tests` folder</div>
      <div>• **Option 2**: Inline `.spec.js` files</div>
      <div>• **Key**: Be consistent across project</div>
    </div>
  </div>

  <div v-click="3">
    <div class="text-primary font-bold text-lg mb-4">📁 Folder Structure</div>
    <div class="space-y-2 text-sm">
      <div>• Keep related files together</div>
      <div>• Use clear, descriptive names</div>
      <div>• Group by feature, not by file type</div>
    </div>
  </div>

  <div v-click="4">
    <div class="text-primary font-bold text-lg mb-4">🔄 Evolution</div>
    <div class="space-y-2 text-sm">
      <div>• Start simple, refactor as needed</div>
      <div>• Document your decisions</div>
      <div>• Get team buy-in before big changes</div>
    </div>
  </div>
</div>
---
layout: center
class: 'text-center'
---

# When to Use Each Structure?

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="p-4 border rounded" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <h3 class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🚀 Start Here</h3>
    <ul class="space-y-4 text-left" style="color: rgb(234, 237, 243);">
      <li class="flex items-center gap-2">
        <span class="i-carbon-checkmark text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">Personal Projects</div>
          <div class="text-sm opacity-70">Start with Flat Structure</div>
        </div>
      </li>
      <li class="flex items-center gap-2">
        <span class="i-carbon-growth text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">Growing Teams</div>
          <div class="text-sm opacity-70">Move to Atomic Design</div>
        </div>
      </li>
      <li class="flex items-center gap-2">
        <span class="i-carbon-enterprise text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">Large Projects</div>
          <div class="text-sm opacity-70">Consider Modular approach</div>
        </div>
      </li>
    </ul>
  </div>

  <div class="p-4 border rounded" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <h3 class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">⚠️ Avoid These</h3>
    <ul class="space-y-4 text-left" style="color: rgb(234, 237, 243);">
      <li class="flex items-center gap-2">
        <span class="i-carbon-warning text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">Premature Optimization</div>
          <div class="text-sm opacity-70">Don't start with complex structures</div>
        </div>
      </li>
      <li class="flex items-center gap-2">
        <span class="i-carbon-fragile text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">One Size Fits All</div>
          <div class="text-sm opacity-70">Different projects need different approaches</div>
        </div>
      </li>
      <li class="flex items-center gap-2">
        <span class="i-carbon-block text-xl" style="color: rgb(255, 107, 237);" />
        <div>
          <div class="font-bold">Ignoring Team Size</div>
          <div class="text-sm opacity-70">Structure must match your organization</div>
        </div>
      </li>
    </ul>
  </div>
</div>

---
layout: center
---

# Bonus: Why Every Project Should Use Modular Structure

<div class="text-lg opacity-80 mb-8 text-center">My strong opinion: Start modular from day one</div>

<div class="grid grid-cols-2 gap-8 mt-8">
  <div v-click="1" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🚀 Future-Proof Growth</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Easy transition to microfrontends when team scales</div>
      <div>• Clear boundaries from the start</div>
      <div>• No painful refactoring later</div>
    </div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🧪 Better Testing</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Run tests only for changed modules</div>
      <div>• Faster CI/CD pipelines</div>
      <div>• Isolated test failures</div>
    </div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🤖 LLM-Friendly</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Send entire checkout module to AI</div>
      <div>• Context stays focused on one domain</div>
      <div>• Better code suggestions</div>
    </div>
  </div>
  
  <div v-click="4" class="p-4 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">📚 Documentation</div>
    <div class="text-sm opacity-80 space-y-2">
      <div>• Module-specific dev docs with VitePress</div>
      <div>• Each team owns their documentation</div>
      <div>• Clear API contracts between modules</div>
    </div>
  </div>
</div>

<div v-click="5" class="mt-8 p-4 bg-card rounded-lg">
  <div class="text-lg font-bold text-primary mb-3">🎯 The Composable Analogy</div>
  <div class="opacity-80 text-sm">
    Just like <code>useCheckout()</code> combines related <code>ref</code>, <code>watch</code>, and <code>computed</code> for a business domain, 
    modular structure combines related <strong>components</strong>, <strong>stores</strong>, and <strong>composables</strong> in folders by business domain.
  </div>
</div>

---
layout: center
---

# My Modular Setup Essentials

<div class="grid grid-cols-3 gap-6 mt-8">
  <div v-click="1" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-3xl mb-3">📦</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">Separate UI Module</div>
    <div class="text-xs opacity-80">All reusable components in their own workspace package</div>
  </div>
  
  <div v-click="2" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-3xl mb-3">📖</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">VitePress Docs</div>
    <div class="text-xs opacity-80">Dev documentation for each module and component library</div>
  </div>
  
  <div v-click="3" class="p-4 border rounded-lg text-center" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <div class="text-3xl mb-3">🧠</div>
    <div class="font-bold text-lg mb-2" style="color: rgb(255, 107, 237);">Think Modular</div>
    <div class="text-xs opacity-80">Domain-driven from day one, even for personal projects</div>
  </div>
</div>

<div v-click="4" class="mt-8 p-4 bg-card rounded-lg">
  <div class="text-lg font-bold text-primary mb-2">💪 Personal Experience</div>
  <div class="opacity-80">I use modular structure even for solo projects. The mental model of "business domains as folders" 
  makes code organization intuitive and prepares for any future growth.</div>
</div>

<div v-click="5" class="mt-6 text-center">
  <div class="text-lg font-bold text-primary">Start modular. Scale confidently. 🚀</div>
</div>

---
layout: default
clicks: 6
---

<FolderTree
  root
  title="My Go-To Vue Project Structure"
  :structure="`my-vue-project/
  apps/
    web/
      src/
        App.vue
        main.ts
        router/
          index.ts
        views/
          HomePage.vue
      package.json
  modules/
    auth/
      components/
        LoginForm.vue
        UserProfile.vue
      composables/
        useAuth.ts
      stores/
        authStore.ts
      services/
        authApi.ts
        authService.ts
      package.json
    products/
      components/
        ProductCard.vue
        ProductList.vue
      composables/
        useProducts.ts
      stores/
        productsStore.ts
      services/
        productsApi.ts
        pricingService.ts
      package.json
  packages/
    ui/
      components/
        BaseButton.vue
        BaseInput.vue
        BaseModal.vue
      tokens/
        colors.ts
        spacing.ts
      package.json
    shared/
      utils/
        formatters.ts
        validators.ts
      types/
        api.ts
      package.json
  docs/
    .vitepress/
      config.ts
    modules/
      auth.md
      products.md
    components.md
  pnpm-workspace.yaml`"
  :open-on-clicks="[
    '/my-vue-project',
    '/my-vue-project/apps',
    '/my-vue-project/apps/web',
    '/my-vue-project/modules',
    '/my-vue-project/modules/auth',
    '/my-vue-project/modules/auth/services',
    '/my-vue-project/modules/products',
    '/my-vue-project/modules/products/services',
    '/my-vue-project/packages',
    '/my-vue-project/packages/ui',
    '/my-vue-project/packages/shared',
    '/my-vue-project/docs'
  ]"
/>

---
---

<div class="text-center">
Thank You! 🙏

<div class="flex flex-col items-center gap-4 mt-8">
  <div class="flex items-center gap-2">
    <carbon:globe class="text-2xl" />
    <a href="https://alexop.dev" class="hover:text-primary transition-colors">alexop.dev</a>
  </div>
  
  <div class="flex items-center gap-2">
    <carbon:logo-x class="text-2xl" />
    <a href="https://twitter.com/alexanderop" class="hover:text-primary transition-colors">@alexanderopalic</a>
  </div>
</div>

<div class="mt-12 p-4 bg-card rounded-lg">
  <h3 class="text-xl font-bold mb-2">Key Takeaways</h3>
  <ul class="mb-4 space-y-2 text-left">
    <li>• Start simple with Flat Structure</li>
    <li>• Evolve as your team and project grow</li>
    <li>• Match structure to team organization</li>
    <li>• Consistency is more important than perfection</li>
  </ul>
  <a href="https://alexop.dev/posts/how-to-structure-vue-projects/" class="inline-flex items-center gap-2 text-primary hover:underline">
    <carbon:arrow-right />
    Read the full blog post
  </a>
</div>

</div>
