---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: false
info: |
  ## Local First Web Development with Vue
  Building resilient and user-centric web applications
drawings:
  persist: false
transition: slide-up
css: 
  - unocss
  - ./style.css
colorSchema: dark
background: '#212733'
title: 'Local First Web Development with Vue'
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
<VueNationLogo></VueNationLogo>

---
layout: intro
class: 'flex flex-col items-center justify-center text-center'
background: 'linear-gradient(180deg, #212733 0%, #1a1f2c 100%)'
---

<div class="mb-4 text-primary opacity-70 font-mono tracking-widest">
BUILDING BETTER WEB APPS
</div>

# What is Local-First Web Development <br> and How Can We Build It With Vue

<div class="flex items-center justify-center gap-4 mt-6">
  <div class="i-logos-vue text-4xl animate-pulse" />
  <div class="i-carbon-data-backup text-4xl text-primary animate-bounce-slow" />
  <div class="i-logos-pwa text-4xl animate-pulse" />
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
  <div class="opacity-80">Otto Payments</div>
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
    iconClass="i-carbon-logo-twitter"
    text="@alexanderopalic"
    color="#3B82F6"
  />
</div>
---
---
# How do we currently build Apps?
---
layout: center
---

```mermaid {scale: 0.7}
flowchart LR
    subgraph Traditional["Frontend Layer"]
        direction LR
        HTML["HTML<br>DOM"]
        State["JS app<br>state<br>e.g. Pinia"]
        
        HTML -->|user input| State
        State -->|render| HTML
    end
    
    style Traditional fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    
    class State state
    class HTML default
```

---
layout: center
---

```mermaid {scale: 0.7}
flowchart LR
    subgraph Traditional["Call Api"]
        direction LR
        HTML["HTML<br>DOM"]
        State["JS app<br>state<br>e.g. Pinia"]
        API["JSON<br>REST API"]
        
        HTML -->|user input| State
        State -->|request| API
        API -->|response| State
        State -->|render| HTML
    end
    
    style Traditional fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    classDef api fill:#344060,stroke:#FF6BED,color:#EAE9F3
    
    class State state
    class API api
    class HTML default
```

---
layout: center
---

```mermaid {scale: 0.7}
flowchart LR
    subgraph Traditional["Database Layer"]
        direction LR
        HTML["HTML<br>DOM"]
        State["JS app<br>state<br>e.g. Pinia"]
        API["JSON<br>REST API"]
        Model["model<br>objects"]
        DB[(database<br>e.g. SQL)]
        
        HTML -->|user input| State
        State -->|RPC request| API
        API -->|request| Model
        Model -->|ORM| DB
        DB -->|response| Model
        Model -->|response| API
        API -->|response| State
        State -->|render| HTML
    end
    
    style Traditional fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    classDef api fill:#344060,stroke:#FF6BED,color:#EAE9F3
    
    class DB storage
    class State state
    class API,Model api
    class HTML default
```

---
layout: center
---

```mermaid {scale: 0.5}
flowchart LR
    subgraph Traditional["Traditional Web App Model"]
        direction LR
        HTML["HTML<br>DOM"]
        State["JS app<br>state<br>e.g. Pinia"]
        API["JSON<br>REST API"]
        Model["model<br>objects"]
        DB[(database<br>e.g. SQL)]
        Storage["persistent<br>storage"]
        
        HTML -->|user input| State
        State -->|RPC request| API
        API -->|request| Model
        Model -->|ORM| DB
        DB <-->|I/O| Storage
        
        Storage -->|disk &<br>network| DB
        DB -->|response| Model
        Model -->|response| API
        API -->|response| State
        State -->|render| HTML
    end

    style Traditional fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    classDef api fill:#344060,stroke:#FF6BED,color:#EAE9F3
    
    class DB,Storage storage
    class State state
    class API,Model api
    class HTML default
```

---
layout: center
---

# The Problems of the Current Way
<div class="opacity-80 mb-8">What could go wrong?</div>

<div class="grid grid-cols-2 gap-4 mt-8">
  <div v-click="1">
    <SlidingCard
      icon="🔌"
      title="Offline Limitations"
    >
      Applications don't work without internet connection
    </SlidingCard>
  </div>

  <div v-click="2">
    <SlidingCard
      icon="🔒"
      title="Data Control"
    >
      User is not in control of their data
    </SlidingCard>
  </div>

  <div v-click="3">
    <SlidingCard
      icon="⚡️"
      title="Performance"
    >
      Can be slow due to network dependencies
    </SlidingCard>
  </div>

  <div v-click="4">
    <SlidingCard
      icon="🔧"
      title="Complexity"
    >
      Complicated to build and maintain
    </SlidingCard>
  </div>
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
layout: quote
---

<QuoteCard author="Martin Kleppmann">
  In <span v-mark.underline.blue="1">local-first</span> software, "<span v-mark.underline.red="2">the availability of another computer</span> should never prevent you from working."
</QuoteCard>

---
layout: iframe-left
url: https://www.inkandswitch.com/local-first
---
# Local-First Principles

<ul class="space-y-4">
  <li v-click="1">
    <div class="flex items-center gap-2">
      <span class="text-xl">⚡️</span>
      <span class="font-bold">1. No Spinners:</span>
      Instant local operations
    </div>
  </li>

  <li v-click="2">
    <div class="flex items-center gap-2">
      <span class="text-xl">📱</span>
      <span class="font-bold">2. Multi-Device:</span>
      Access from any device
    </div>
  </li>

  <li v-click="3">
    <div class="flex items-center gap-2">
      <span class="text-xl">🔌</span>
      <span class="font-bold">3. Network Optional:</span>
      Works offline
    </div>
  </li>

  <li v-click="4">
    <div class="flex items-center gap-2">
      <span class="text-xl">👥</span>
      <span class="font-bold">4. Collaboration:</span>
      Real-time teamwork
    </div>
  </li>

  <li v-click="5">
    <div class="flex items-center gap-2">
      <span class="text-xl">⏳</span>
      <span class="font-bold">5. Long Now:</span>
      Long-term data access
    </div>
  </li>

  <li v-click="6">
    <div class="flex items-center gap-2">
      <span class="text-xl">🔒</span>
      <span class="font-bold">6. Privacy & Security:</span>
      Built-in protection
    </div>
  </li>

  <li v-click="7">
    <div class="flex items-center gap-2">
      <span class="text-xl">🎮</span>
      <span class="font-bold">7. User Control:</span>
      Full data ownership
    </div>
  </li>
</ul>

<div v-click="8" class="mt-8 text-sm opacity-70 flex items-center gap-2">
  <span class="i-carbon-link text-lg" />
  Source: <a href="https://www.inkandswitch.com/local-first/" target="_blank" class="text-primary hover:underline">inkandswitch.com/local-first</a>
</div>


---
layout: center
---

```mermaid {scale: 0.5}
flowchart LR
    subgraph LocalFirst["Local-First Model"]
        direction LR
        HTML2["HTML<br>DOM"]
        State2["JS app<br>state<br>sync engine"]
        Storage2["storage<br>& sync"]
        
        HTML2 -->|user input| State2
        State2 -->|I/O| Storage2
        Storage2 -->|disk &<br>network| State2
        State2 -->|render| HTML2
    end
    
    style LocalFirst fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    
    class Storage2 storage
    class State2 state
    class HTML2 default
```

---
layout: center
class: 'text-center'
---

# Traditional vs Local-First Architecture

<div class="mb-4 text-xl opacity-70">From Complex to Simple</div>

```mermaid
flowchart LR
    subgraph Traditional["Traditional Web App Model"]
        direction LR
        HTML["HTML<br>DOM"]
        State["JS app<br>state<br>e.g. Pinia"]
        API["JSON<br>REST API"]
        Model["model<br>objects"]
        DB[(database<br>e.g. SQL)]
        Storage["persistent<br>storage"]
        
        HTML -->|user input| State
        State -->|request| API
        API -->|request| Model
        Model -->|ORM| DB
        DB <-->|I/O| Storage
        
        Storage -->|disk &<br>network| DB
        DB -->|response| Model
        Model -->|response| API
        API -->|response| State
        State -->|render| HTML
    end

    style Traditional fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    classDef api fill:#344060,stroke:#FF6BED,color:#EAE9F3
    
    class DB,Storage storage
    class State state
    class API,Model api
    class HTML default
```

<div class="my-8 text-xl opacity-70">To</div>

```mermaid
flowchart LR
    subgraph LocalFirst["Local-First Model"]
        direction LR
        HTML2["HTML<br>DOM"]
        State2["JS app<br>state<br>sync engine"]
        Storage2["storage<br>& sync"]
        
        HTML2 -->|user input| State2
        State2 -->|I/O| Storage2
        Storage2 -->|disk &<br>network| State2
        State2 -->|render| HTML2
    end
    
    style LocalFirst fill:#2d1b36,stroke:#FF6BED
    classDef default fill:#344060,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    classDef state fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    
    class Storage2 storage
    class State2 state
    class HTML2 default
```

---
---
# How to do that with Vue?
---
layout: center
clicks: 3
---

<ProgressTracker
  :items="[
    {
      stage: 'PWA Ready',
      percentage: '33%',
      description: 'Install PWA dependencies, configure manifest & service worker',
      clickIndex: 1
    },
    {
      stage: 'Storage Ready',
      percentage: '66%',
      description: 'Implement client-side storage for reliable data persistence',
      clickIndex: 2
    },
    {
      stage: 'Local-First Ready',
      percentage: '100%',
      description: 'Implement sync engine and offline-first functionality',
      clickIndex: 3
    }
  ]"
  :is-complete="$clicks === 3"
/>

---
layout: default
---

# Implementation Guides

<div class="text-lg opacity-80 mb-8">
  Want to dive deeper? Check out my detailed guides after the talk:
</div>

<div class="grid grid-cols-2 gap-8">
  <GuideCard
    href="https://alexop.dev/posts/create-pwa-vue3-vite-4-steps/"
    icon="📖"
    title="PWA Implementation"
  >
    Complete guide to creating a PWA with Vue 3 + Vite
  </GuideCard>

  <GuideCard
    href="https://alexop.dev/posts/sqlite-vue3-offline-first-web-apps-guide/"
    icon="💾"
    title="SQLite Integration"
  >
    Step-by-step SQLite setup for offline-first apps
  </GuideCard>
</div>
---
---
```mermaid
---
title: Local-First Architecture with Central Server
---
flowchart LR
    subgraph Client1["Client Device"]
        UI1["UI"] --> DB1["Local Data"]
    end

    subgraph Client2["Client Device"]
        UI2["UI"] --> DB2["Local Data"]
    end

    subgraph Server["Central Server"]
        SDB["Server Data"]
        Sync["Sync Service"]
    end

    DB1 <--> Sync
    DB2 <--> Sync
    Sync <--> SDB
```

Key decisions:
- How much data to store locally (full vs. partial dataset)
- How to handle multi-user conflict resolution

---
layout: image
image: /images/linear.png
backgroundSize: contain
---
---
layout: iframe-left
url: https://dexie.org/
---

# Dexie.js

<div class="mt-8 space-y-8">
  <div v-click="1">
    <FeatureCard
      icon="🔧"
      title="Enhanced IndexedDB Usage"
    >
      Provides a friendly and intuitive way to work with IndexedDB
    </FeatureCard>
  </div>

  <div v-click="2">
    <FeatureCard
      icon="☁️"
      title="Built-in Cloud Solutions"
    >
      Includes ready-to-use sync engine, authentication, and cloud storage options
    </FeatureCard>
  </div>

  <div v-click="3">
    <FeatureCard
      icon="🔄"
      title="Flexible Server Options"
    >
      Freedom to use your own server infrastructure instead of their cloud services
    </FeatureCard>
  </div>
</div>

---
layout: image-left
image: /images/todoApp.png
backgroundSize: contain
---


<div class="text-lg opacity-80 flex items-center justify-center h-full">Setting Up Dexie.js with Cloud Sync</div>

---
layout: center
---

# Project Structure

```bash {all|1-5|6-7|8-9|10-11}
src/
├── components/
│   ├── Ui/           # UI components using shadcn
│   ├── TodoList.vue  # Todo list component
│   └── AuthGuard.vue # Auth wrapper component
├── composables/
│   └── useTodos.ts   # Todo management logic
├── pages/
│   └── index.vue     # Main page with AuthGuard and TodoList
└── db/
    └── todo.ts       # Dexie configuration
```

<div class="mt-8">
<div v-click="1">
1. Components handle the UI and user interactions with shadcn integration
</div>

<div v-click="2">
2. Composables contain reusable business logic for todo management
</div>

<div v-click="3">
3. Main page combines AuthGuard for authentication and TodoList for task management
</div>

<div v-click="4">
4. Database setup and configuration for Dexie.js
</div>
</div>
---
---
```mermaid
flowchart TD
    subgraph VueApp["Vue Application"]
        App["App.vue"]
        TodoList["TodoList.vue<br>Component"]
        UseTodo["useTodo.ts<br>Composable"]
        Database["database.ts<br>Dexie Configuration"]
        
        App --> TodoList
        TodoList --> UseTodo
        UseTodo --> Database
    end
    
    subgraph DexieLayer["Dexie.js Layer"]
        IndexedDB["IndexedDB"]
        SyncEngine["Dexie Sync Engine"]
        
        Database --> IndexedDB
        Database --> SyncEngine
    end
    
    subgraph Backend["Backend Services"]
        Server["Server"]
        ServerDB["Server Database"]
        
        SyncEngine <-.-> Server
        Server <-.-> ServerDB
    end

    style VueApp fill:#2d1b36,stroke:#FF6BED
    style DexieLayer fill:#344060,stroke:#AB4B99
    style Backend fill:#1a1f2c,stroke:#8A337B
    
    classDef default fill:#8A337B,stroke:#AB4B99,color:#EAE9F3
    classDef storage fill:#1a1f2c,stroke:#AB4B99,color:#EAE9F3
    
    class Server,ServerDB storage
```
---
layout: two-cols
class: 'gap-12'
---

# Why RxJS with Vue?

<div class="space-y-4">
  <div v-click="1">
    <h3 class="text-xl text-primary mb-2">🔄 Reactive Data Streams</h3>
    <p class="opacity-80">Perfect for handling real-time data and complex state changes</p>
  </div>

  <div v-click="2">
    <h3 class="text-xl text-primary mb-2">🔗 Bridge to IndexedDB</h3>
    <p class="opacity-80">Seamlessly connect Dexie's live queries with Vue's reactivity</p>
  </div>

  <div v-click="3">
    <h3 class="text-xl text-primary mb-2">⚡️ VueUse Integration</h3>
    <p class="opacity-80">useObservable hook makes RxJS feel native to Vue</p>
  </div>
</div>

::right::

```ts {all|2-3|5-8|10-14|all}
// Without VueUse
const todos$ = from(liveQuery(() => 
  db.todos.toArray()))

// Manual subscription
todos$.subscribe(todos => {
  // Update local state
  this.todos = todos
})

// With VueUse - clean & reactive!
const todos = useObservable(
  from(liveQuery(() => 
    db.todos.toArray()))
)
```

<div class="mt-8" v-click="4">
<div class="text-xl text-primary mb-2">🎯 Key Benefits</div>
<ul class="space-y-2 opacity-80">
  <li>• Automatic subscription management</li>
  <li>• Native Vue reactivity</li>
  <li>• Cleaner code with less boilerplate</li>
</ul>
</div>

<style>
.slidev-code {
  @apply text-sm leading-6 px-4 py-3 mt-4;
}
</style>

---
---
# 🔗 Learn More

<div class="grid grid-cols-2 gap-4">

<div class="p-4 border rounded hover:shadow-lg transition-shadow">

## 📦 Source Code
[github.com/alexanderop/vue-dexie](https://github.com/alexanderop/vue-dexie)

</div>

<div class="p-4 border rounded hover:shadow-lg transition-shadow">

## 📝 Blog Post
[Building Local-First Apps with Vue & Dexie](https://alexop.dev/posts/building-local-first-apps-vue-dexie/)

</div>

</div>

---
---
# when to use local first?

## Local-First Software Fit Guide

| Good Fit ✅ | Bad Fit ❌ |
|------------|------------|
| Text editors, documents, spreadsheets 📝 | Banking & payments 💰 |
| Notes, tasks, calendars 📋 | E-commerce & inventory 📦 |
| Media editing & creative tools 🎨 | Vehicle & logistics systems 🚗 |
| Personal data management 👤 | Real-world resource tracking 🌐 |

---
---
# Thank You! 🙏

<div class="text-center">

## Questions?

Feel free to reach out:

- 🌐 [alexop.dev](https://alexop.dev)
- 🐦 [@alexanderop](https://twitter.com/alexanderop)
- 📧 [alex@alexop.dev](mailto:alex@alexop.dev)

</div>
