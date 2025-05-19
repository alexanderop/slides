---
title: How I use llms as a Software Developer
author: Alexander Opalic
date: May 2025
theme: seriph
highlight: night-owl
lang: en
layout: image
image: 'images/cover2.png'
backgroundSize: contain
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
image: 'images/cover.png'
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

# How LLMs Learn

### (the *really* short version)

<img src="https://alexop.dev/_astro/monster.DOIJKwqy_2nh7DJ.webp" class="w-80 mx-auto" />

<div v-click="1">
1. <strong>Pre‑training</strong> – The model reads a huge collection of text and code to learn how to predict the next word.
</div>
<div v-click="2">
2. <strong>Supervised Fine‑tuning</strong> – We teach the model using specific examples and questions to make it better at certain tasks.
</div>
<div v-click="3">
3. <strong>Human Feedback</strong> – People rate the model's responses to help it give better answers.
</div>

<div v-click="4">
  <small>Under the hood, they're still just predicting <strong>the next token</strong> given everything so far.</small>
</div>


---
layout: iframe
url: https://tiktokenizer.vercel.app
---

---
layout: center
---

<img src="https://us1.discourse-cdn.com/openai1/optimized/4X/5/c/0/5c0d5882b9651fab40a71246423bdd0f9781b0e6_2_509x499.jpeg" class="w-80 mx-auto" />


---
layout: image
image: 'images/chooseTheRightLlmModel.png'
backgroundSize: contain
---

---
layout: center
---

<Tweet id='1921216202090967237'/>


---
layout: iframe-right
url: 'https://simonwillison.net/2025/Apr/26/o3-photo-locations/'
---

# o3 Photo Location Finder - Quick Guide

- **What it does:** The o3 model finds where photos were taken, even without clear landmarks
- **How it works:** It looks at things like plants, buildings, and small details (like car plates)
- **Example:** Someone shared a California photo. The model found it was on the Central Coast but not the exact city




---
layout: center
---

```mermaid{scale: 0.5}
---
title: How I chose which model I need
---
flowchart TD
    A(Task) --> B{Need deep reasoning?}
    B -- Yes --> C[Reasoning model]
    B -- No --> D{Need external tools?}
    D -- Yes --> E[Agentic model]
    D -- No --> F[Base model]
```

---
layout: image
image: '/images/catDragonball.png'
backgroundSize: contain
---

---
layout: center
---

<SlidevVideo class="h-[500px]" autoplay controls>
  <source src="./images/tab-tab-tab-mp4.mp4" type="video/mp4" />
</SlidevVideo>
---
layout: center
---

<SlidevVideo class="h-[900px]" autoplay controls>
  <source src="./images/knows-your-codebase.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
---

<SlidevVideo class="h-[500px]" autoplay controls>
  <source src="./images/inline-refactoring.mp4" type="video/mp4" />
</SlidevVideo>

---

<div class="flex flex-col justify-center items-center h-full gap-4">
  <h1 class="text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
    How can we Improve the Output of a LLM?
  </h1>
  <p class="text-xl text-gray-600 animate-pulse">Let's make those responses shine ✨</p>
</div>


---
layout: image
image: 'images/improveLlm.png'
backgroundSize: contain
---

---
layout: image
image: 'images/learnPromptEngeniering.png'
backgroundSize: contain
---

---
layout: image
image: 'images/systemPrompt.png'
backgroundSize: contain
---


---
layout: image-right
image: '/images/goggelingISDead.png'
---

## Web Search with LLMs vs Google

<article class="prose prose-lg">
  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-2">Google Search Issues</h3>
    <p class="text-gray-700">
      Declining quality due to ads and SEO manipulation
    </p>
  </div>

  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-2">LLM Advantages</h3>
    <ul class="list-disc pl-6 mt-2">
      <li>Parallel search processing</li>
      <li>Concise, focused responses</li>
      <li>Time-efficient research</li>
    </ul>
  </div>
</article>


---
layout: image-right
image: 'images/bruceExtractCodebase.png'
---

# Extracting Codebase Content for LLM Analysis

1. Find your target repository (e.g., https://github.com/vueuse/vueuse)
2. Replace "github" with "uithub" in the URL
3. This will display the entire codebase as plain text
4. Copy the content and paste it into your LLM to:
   - Ask specific questions about the codebase
   - Generate proof-of-concepts
   - Analyze implementation patterns


---
layout: iframe-right
url: https://deepwiki.com/alexanderop/vue-vector-search
---

# Deepwiki

1. Visit [Deepwiki](https://deepwiki.com/)
2. Upload your source project (open-source or private)
3. Let the tool automatically index your codebase
4. Get comprehensive documentation generated
5. Review and refine the generated docs as needed

<small>Note: Created by the Devin AI team, this tool offers free indexing for your projects.</small>

---
layout: iframe
url: "https://alexop.dev/posts/how-to-use-ai-for-effective-diagram-creation-a-guide-to-chatgpt-and-mermaid/"
---

---
layout: iframe
url: "https://mermaid.live/edit#pako:eNpVjs1ugzAQhF_F2lMrkYjwEwcfKjWkzSVSKzWnQg4rcDBKsJExSlPg3WtIW7V7mtV8M7sdZCrnwOB4VpdMoDZkv0klsfOYxEKXjamwOZDZ7KHfckMqJfm1J-u7rSKNUHVdyuL-xq9HiMTdbsQ4MaKUp-FmxVP-RfKebJId1kbVh7_O_qJ68pSUr8LW_3eE5jb1nByRHXGWoSYx6gM4UHFdYZnb17sxkIIRvOIpMCtz1KcUUjlYDluj3q4yA2Z0yx3Qqi0E2LJzY7e2ztHwTYmFxuoHqVG-K_W7Fno8853mMuc6Vq00wBZ0YoF18AHMD4L5Kggiz6cu9axYOnAFFnrzIIoi6kVh4Ef-YhEODnxO9e58RUPXjrd0KXW90Bu-AIZjeo4"
---

---
layout: image
image: 'images/modularMonlith.png'
backgroundSize: contain
---


---
layout: image
image: 'images/customInstraction.png'
backgroundSize: contain
---

---

```plaintext
my-app/
├── .cursor/
│   └── rules/
│       └── project-guidelines.mdc       # General code style, naming, formatting
├── frontend/
│   ├── .cursor/
│   │   └── rules/
│   │       ├── vue-components.mdc       # Naming + structure for components
│   │       └── tailwind-usage.mdc       # Utility-first CSS rules
│   └── src/
│       └── ...
├── backend/
│   ├── .cursor/
│   │   └── rules/
│   │       ├── api-structure.mdc        # REST/GraphQL structure conventions
│   │       └── service-patterns.mdc     # How to organize business logic
│   └── src/
│       └── ...
├── shared/
│   ├── .cursor/
│   │   └── rules/
│   │       └── shared-types.mdc         # How to define + use shared TypeScript types
│   └── src/
│       └── ...
├── README.md
└── package.json
```

---

```mdc
---
description: Base project guidelines and conventions
globs:
  - "**/*.ts"
  - "**/*.vue"
alwaysApply: false 
---

- Use `PascalCase` for component names.
- Use `camelCase` for variables, functions, and file names (except components).
- Prefer composition API (`setup()`) over options API.
- Type everything. Avoid `any` unless absolutely necessary.
- Keep files under 150 LOC. Split logic into composables or utilities.
- Use absolute imports from `@/` instead of relative paths.
- Every module must have tests that reflect the feature's acceptance criteria.
- Commit messages must follow Conventional Commits format.
- Use TODO: and FIXME: comments with your initials (e.g., `// TODO(alex): refactor`).
- Format code with Prettier. Lint with ESLint before committing.

Referenced files:
@.eslintrc.js  
@.prettierrc  
@tsconfig.json
```


---

# Write better Image Prompt

1. Describe what you want
2. Say give me a midjourney prompt
3. Now customize it or brainstorm


---
layout: image
image: 'images/imagePrompt.png'
backgroundSize: contain
---

---
layout: image
image: 'images/monadTypescript.png'
backgroundSize: contain
---

---
layout: image
image: 'images/keyTakeaways.png'
backgroundSize: contain
---

---
layout: iframe
url: 'https://alexop.dev/tags/ai/'
---





