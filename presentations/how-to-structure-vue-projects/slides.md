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
layout: center
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
# Prag Vue 2025

---
layout: intro
class: 'flex flex-col items-center justify-center text-center'
background: 'linear-gradient(180deg, #212733 0%, #1a1f2c 100%)'
---

<div class="mb-4 text-primary opacity-70 font-mono tracking-widest">
BUILDING SCALABLE VUE APPLICATIONS
</div>

# How to Structure Vue Projects<br>From Simple to Enterprise

<div class="flex items-center justify-center gap-4 mt-6">
  <div class="i-logos-vue text-4xl animate-pulse" />
  <div class="i-carbon-folder text-4xl text-primary animate-bounce-slow" />
  <div class="i-carbon-analytics text-4xl animate-pulse" />
</div>

<div class="mt-8 text-lg opacity-70">
by Alexander Opalic
</div>

<style>
.animate-bounce-slow {
  animation: bounce 2s infinite;
}
</style>

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

# Why Structure Matters

<div class="text-xl opacity-80 mb-8">The foundation of maintainable Vue applications</div>
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

# Conway's Law in Practice

```mermaid{scale: 0.6}
graph LR
    subgraph org[" "]
        team1["👥 Frontend<br>Team"]:::team
        team2["👥 Backend<br>Team"]:::team
        team3["👥 Mobile<br>Team"]:::team
    end
    
    subgraph code[" "]
        fe["🖥️ Vue App"]:::frontend
        be["🔧 API"]:::backend
        mobile["📱 iOS/Android"]:::mobile
    end
    
    team1 --> fe
    team2 --> be  
    team3 --> mobile
    
    fe -.-> be
    mobile -.-> be
    
    classDef team fill:#344060,stroke:#AB4B99,stroke-width:2px
    classDef frontend fill:#212733,stroke:#FF6BED,stroke-width:2px
    classDef backend fill:#8A337B,stroke:#EAEDF3,stroke-width:2px
    classDef mobile fill:#344060,stroke:#AB4B99,stroke-width:2px
    
    style org fill:none,stroke:#FF6BED,stroke-width:1px
    style code fill:none,stroke:#AB4B99,stroke-width:1px
```

<div class="grid grid-cols-2 gap-8 mt-6">
  <div v-click="1" class="text-center">
    <div class="text-lg font-bold text-primary mb-2">Organization Structure</div>
    <div class="text-sm opacity-70">How teams are organized</div>
  </div>
  <div v-click="2" class="text-center">
    <div class="text-lg font-bold text-primary mb-2">Code Architecture</div>
    <div class="text-sm opacity-70">Reflects team boundaries</div>
  </div>
</div>

<div v-click="3" class="mt-4 text-center text-lg opacity-80">
  Your Vue project structure should match your team structure and project complexity
</div>

<style>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.6s ease-out forwards;
}
</style>

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

# 5 Vue Project Structures

<div class="text-xl opacity-80 mb-8">From simple to enterprise-scale solutions</div>

<div class="grid grid-cols-5 gap-4 mt-8">
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
    <div class="text-4xl mb-2">🍰</div>
    <div class="font-bold">FSD</div>
    <div class="text-sm opacity-70">Complex apps</div>
  </div>
  
  <div v-click="5" class="text-center">
    <div class="text-4xl mb-2">🏢</div>
    <div class="font-bold">Micro</div>
    <div class="text-sm opacity-70">Enterprise</div>
  </div>
</div>


---
layout: default
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
  :open-all="true"
/>

<div class="mt-8 grid grid-cols-2 gap-8">
  <div v-click="1">
    <div class="text-green-400 font-bold mb-2">✅ Advantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Easy to implement and understand</li>
      <li>• Minimal setup required</li>
      <li>• Fast development for small teams</li>
      <li>• Great for prototypes and MVPs</li>
    </ul>
  </div>
  
  <div v-click="2">
    <div class="text-red-400 font-bold mb-2">❌ Disadvantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Not scalable for large projects</li>
      <li>• Becomes cluttered quickly</li>
      <li>• Hard to find components as it grows</li>
      <li>• Lacks clear separation of concerns</li>
    </ul>
  </div>
</div>

---
layout: default
---

# 2. Atomic Design ⚛️
<div class="text-lg opacity-80 mb-6">Hierarchical component organization for scalable applications</div>

```mermaid{scale: 0.9}
---
title: Atomic Design Hierarchy
---
graph TD
    A[Atoms<br>Button, Icon, Input]:::atom
    M[Molecules<br>Search Bar, Card Header]:::molecule
    O[Organisms<br>Navigation, Product List]:::organism
    T[Templates<br>Page Layout, Grid]:::template
    P[Pages<br>Home, Product Detail]:::page
    
    A --> M
    M --> O
    O --> T
    T --> P
    
    classDef atom fill:#FF6BED,stroke:#AB4B99,stroke-width:2px,color:#000
    classDef molecule fill:#344060,stroke:#AB4B99,stroke-width:2px
    classDef organism fill:#8A337B,stroke:#EAEDF3,stroke-width:2px
    classDef template fill:#212733,stroke:#FF6BED,stroke-width:2px
    classDef page fill:#1a1f2c,stroke:#8A337B,stroke-width:2px
```

<div class="mt-4 grid grid-cols-2 gap-8">
  <div v-click="1">
    <div class="text-green-400 font-bold mb-2">✅ Advantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Highly scalable structure</li>
      <li>• Clear component hierarchy</li>
      <li>• Maximum reusability</li>
      <li>• Great for design systems</li>
    </ul>
  </div>
  
  <div v-click="2">
    <div class="text-red-400 font-bold mb-2">❌ Disadvantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Initial complexity to set up</li>
      <li>• Can be overkill for small projects</li>
      <li>• Requires discipline to maintain</li>
      <li>• Overhead in managing layers</li>
    </ul>
  </div>
</div>
---
layout: default
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
  :open-all="true"
/>
---
layout: default
---

<FolderTree
  root
  title="Modular Approach Structure"
  :structure="`src/
  core/
    components/
      BaseButton.vue
      BaseIcon.vue
    utils/
    services/
  modules/
    pokemon/
      components/
        PokemonCard.vue
        PokemonList.vue
      composables/
        usePokemon.js
      store/
        pokemonStore.js
      views/
        PokemonPage.vue
    search/
      components/
        SearchInput.vue
      composables/
        useSearch.js
      store/
        searchStore.js
  assets/
App.vue
main.js`"
  :open-all="true"
/>

<div class="mt-8 grid grid-cols-2 gap-8">
  <div v-click="1">
    <div class="text-green-400 font-bold mb-2">✅ Advantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Clear feature boundaries</li>
      <li>• Scalable for large projects</li>
      <li>• Easy to find related code</li>
      <li>• Teams can own modules</li>
    </ul>
  </div>
  
  <div v-click="2">
    <div class="text-red-400 font-bold mb-2">❌ Disadvantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Potential code duplication</li>
      <li>• Requires discipline to maintain</li>
      <li>• Module dependencies can get complex</li>
      <li>• Not suitable for small projects</li>
    </ul>
  </div>
</div>

---
layout: default
---

# 4. Feature-Sliced Design 🍰
<div class="text-lg opacity-80 mb-6">Layered architecture for complex applications</div>

```mermaid{scale: 0.8}
---
title: Feature-Sliced Design Layers
---
graph TD
    App[App<br>Global settings, providers]:::app
    Processes[Processes<br>Global business processes]:::processes
    Pages[Pages<br>Full pages using widgets]:::pages
    Widgets[Widgets<br>UI blocks combining features]:::widgets
    Features[Features<br>User interactions]:::features
    Entities[Entities<br>Business models]:::entities
    Shared[Shared<br>Reusable utilities]:::shared
    
    App --> Processes
    Processes --> Pages
    Pages --> Widgets
    Widgets --> Features
    Features --> Entities
    Entities --> Shared
    
    classDef app fill:#FF6BED,stroke:#AB4B99,stroke-width:2px,color:#000
    classDef processes fill:#8A337B,stroke:#EAEDF3,stroke-width:2px
    classDef pages fill:#344060,stroke:#AB4B99,stroke-width:2px
    classDef widgets fill:#212733,stroke:#FF6BED,stroke-width:2px
    classDef features fill:#1a1f2c,stroke:#8A337B,stroke-width:2px
    classDef entities fill:#2a2a3e,stroke:#AB4B99,stroke-width:2px
    classDef shared fill:#1a1a2e,stroke:#FF6BED,stroke-width:2px
```
---
layout: default
---

<FolderTree
  root
  title="Feature-Sliced Design Structure"
  :structure="`src/
  app/
    App.vue
    main.js
  processes/
    auth/
      AuthProcess.vue
  pages/
    HomePage.vue
    ProductPage.vue
  widgets/
    UserProfile.vue
    ProductStats.vue
  features/
    pokemon/
      CatchPokemon.vue
      PokemonList.vue
  entities/
    user/
      userService.js
      userModel.js
  shared/
    ui/
      BaseButton.vue
      BaseInput.vue
    lib/
      helpers.js`"
  :open-all="true"
/>

---
layout: default
---

# 5. Micro Frontends 🏢
<div class="text-lg opacity-80 mb-6">Enterprise-level independent deployments</div>

```mermaid{scale: 0.9}
---
title: Micro Frontend Architecture
---
graph TB
    subgraph shell["Application Shell"]
        Router["Router & Layout"]:::shell
    end
    
    subgraph mf1["Product MF"]
        ProductApp["Vue 3<br>Product Catalog"]:::product
    end
    
    subgraph mf2["Cart MF"]
        CartApp["Vue 2<br>Shopping Cart"]:::cart
    end
    
    subgraph mf3["User MF"]
        UserApp["React<br>User Profile"]:::user
    end
    
    Router --> ProductApp
    Router --> CartApp
    Router --> UserApp
    
    classDef shell fill:#FF6BED,stroke:#AB4B99,stroke-width:2px,color:#000
    classDef product fill:#344060,stroke:#AB4B99,stroke-width:2px
    classDef cart fill:#8A337B,stroke:#EAEDF3,stroke-width:2px
    classDef user fill:#212733,stroke:#FF6BED,stroke-width:2px
    
    style shell fill:none,stroke:#FF6BED,stroke-width:2px
    style mf1 fill:none,stroke:#AB4B99,stroke-width:2px
    style mf2 fill:none,stroke:#8A337B,stroke-width:2px
    style mf3 fill:none,stroke:#212733,stroke-width:2px
```

<div class="mt-4 grid grid-cols-2 gap-8">
  <div v-click="1">
    <div class="text-green-400 font-bold mb-2">✅ Advantages</div>
    <ul class="space-y-1 text-sm">
      <li>• Independent deployments</li>
      <li>• Technology agnostic</li>
      <li>• Team autonomy</li>
      <li>• Scalable for large organizations</li>
    </ul>
  </div>
  
  <div v-click="2">
    <div class="text-red-400 font-bold mb-2">❌ Disadvantages</div>
    <ul class="space-y-1 text-sm">
      <li>• High infrastructure complexity</li>
      <li>• Bundle size overhead</li>
      <li>• Potential UX inconsistencies</li>
      <li>• Not suitable for small teams</li>
    </ul>
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
| **FSD** 🍰 | Large | High | Complex, long-term projects |
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
          <div class="text-sm opacity-70">Consider Modular or FSD</div>
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

# Resources & References

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="p-6 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <h3 class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">📚 Learn More</h3>
    <ul class="space-y-3" style="color: rgb(234, 237, 243);">
      <li>
        <a href="https://alexop.dev/posts/how-to-structure-vue-projects/" class="hover:text-primary transition-colors">
          📖 Complete Blog Post
        </a>
      </li>
      <li>
        <a href="https://alexop.dev/posts/atomic-architecture-vue-nuxt/" class="hover:text-primary transition-colors">
          ⚛️ Atomic Design Guide
        </a>
      </li>
      <li>
        <a href="https://feature-sliced.design/" class="hover:text-primary transition-colors">
          🍰 Feature-Sliced Design Docs
        </a>
      </li>
      <li>
        <a href="https://alexop.dev/posts/microfrontends-module-federation-vue/" class="hover:text-primary transition-colors">
          🏢 Micro Frontends with Vue
        </a>
      </li>
    </ul>
  </div>

  <div class="p-6 border rounded-lg" style="background-color: rgb(52, 63, 96); border-color: rgb(171, 75, 153);">
    <h3 class="text-xl font-bold mb-4" style="color: rgb(255, 107, 237);">🛠️ Tools & Templates</h3>
    <ul class="space-y-3" style="color: rgb(234, 237, 243);">
      <li>
        <a href="https://vue.new" class="hover:text-primary transition-colors">
          🚀 Vue Starter Templates
        </a>
      </li>
      <li>
        <a href="https://vuejs.org/style-guide/" class="hover:text-primary transition-colors">
          📏 Vue Style Guide
        </a>
      </li>
      <li>
        <a href="https://github.com/alexanderop" class="hover:text-primary transition-colors">
          💻 Example Projects
        </a>
      </li>
      <li>
        <a href="https://alexop.dev" class="hover:text-primary transition-colors">
          ✍️ More Articles & Tutorials
        </a>
      </li>
    </ul>
  </div>
</div>

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
