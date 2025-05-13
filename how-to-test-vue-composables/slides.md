---
# You can also start simply with 'default'
theme: seriph
highlighter: shiki
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: How to test Vue Composables
class: text-center
drawings:
  persist: false
transition: slide-up
mdc: true
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


# How to Test Vue Composables


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
layout: image
image: 'images/definitions.png'
backgroundSize: contain
---

---
layout: image
image: 'images/funny-comp.png'
backgroundSize: contain
---

---

# What are Composables?

<v-clicks>

- reusable functions
- they use Vue's reactivity system
- improve modularity
- enhance code reuse

</v-clicks>


---
layout: two-cols
---

## Not a Composable (Plain JS)

```ts
// Plain JavaScript function
// No Vue reactivity used.
export function useSum(a: number, b: number): number {
  return a + b;
}
```

::right::

## Composable (Vue Reactivity)

```ts
import { ref, computed, Ref } from 'vue';

export function useSum(
  num1: Ref<number>,
  num2: Ref<number>
) {
  const sum = computed(() => num1.value + num2.value);
  return { sum };
}
```

---
layout: image
image: 'images/vitest.png'
backgroundSize: contain
---

---
layout: image
image: 'images/vue-testing-pyramid.png'
backgroundSize: contain
---

---

# Types of Composables
<v-clicks>

- **Independent Composables**: use only Vue reactivity (ref, computed, watch)
- **Dependent Composables**: rely on component instance (lifecycle hooks, provide/inject)

</v-clicks>

---

# Independent Composables

<v-clicks> 

- Use only Vue's reactivity APIs
- Easy to test directly

**Example:**
```ts
import { ref, computed } from 'vue'

// A simple Vue composable function
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  // Expose managed state and methods
  return { count, double, increment }
}
```

</v-clicks>


---

# Testing an Independent Composable

```ts
describe('useSum', () => {
  it('correctly computes the sum of two numbers', () => {
    const num1 = ref(2)
    const num2 = ref(3)
    const sum = useSum(num1, num2)
    expect(sum.value).toBe(5)
  })
})
```

---

# Dependent Composables

<v-clicks> 

- Use Vue reactivity **plus** component features (lifecycle, `provide`/`inject`)
- Need a component context to test these features

</v-clicks> 


---

# Example 

<v-clicks>

`useLocalStorage` (Uses `onMounted`, `watch`, and browser `localStorage`)

```ts
import { ref, onMounted, watch } from 'vue'

function useLocalStorage<T>(key: string, initialValue: T) {
  const value = ref<T>(initialValue)

  function loadFromLocalStorage() {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      value.value = JSON.parse(storedValue) // Potential side-effect!
    }
  }

  onMounted(loadFromLocalStorage) // Needs component context!

  watch(value, newValue => {
    localStorage.setItem(key, JSON.stringify(newValue)) // Potential side-effect!
  })

  return { value }
}
```

</v-clicks>

---

# Lets Try to test it

```ts

describe("useLocalStorage", () => {
  it("should load the initialValue", () => {
    const { value } = useLocalStorage("testKey", "initValue");
    expect(value.value).toBe("initValue");
  });

  it("should load from localStorage", async () => {
    localStorage.setItem("testKey", JSON.stringify("fromStorage"));
    const { value } = useLocalStorage("testKey", "initialValue");
    expect(value.value).toBe("fromStorage");
  });
});
```

---

# Improve Testing with the withSetup Helper Function

```ts
import type { App } from "vue";
import { createApp } from "vue";

export function withSetup<T>(composable: () => T): [T, App] {
  let result: T;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });
  app.mount(document.createElement("div"));
  return [result, app];
}
```

---

# Utilizing `withSetup` in Tests

```ts
it("should load the value from localStorage if it was set before", async () => {
  localStorage.setItem("testKey", JSON.stringify("valueFromLocalStorage"));
  const [result] = withSetup(() => useLocalStorage("testKey", "testValue"));
  expect(result.value.value).toBe("valueFromLocalStorage");
});
```

---

# Provide Inject

```ts

import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export const MessageKey: InjectionKey<string> = Symbol('message')

export function useMessage() {
  const message = inject(MessageKey)

  if (!message) {
    throw new Error('Message must be provided')
  }

  const getUpperCase = () => message.toUpperCase()
  const getReversed = () => message.split('').reverse().join('')

  return {
    message,
    getUpperCase,
    getReversed,
  }
}
```

---

# How the test should look

```ts
import { describe, expect, it } from 'vitest'
import { useInjectedSetup } from '../helper'
import { MessageKey, useMessage } from '../useMessage'

describe('useMessage', () => {
  it('should handle injected message', () => {
    const wrapper = useInjectedSetup(
      () => useMessage(),
      [{ key: MessageKey, value: 'hello world' }],
    )

    expect(wrapper.message).toBe('hello world')
    expect(wrapper.getUpperCase()).toBe('HELLO WORLD')
    expect(wrapper.getReversed()).toBe('dlrow olleh')

    wrapper.unmount()
  })

  it('should throw error when message is not provided', () => {
    expect(() => {
      useInjectedSetup(() => useMessage(), [])
    }).toThrow('Message must be provided')
  })
})
```

---

# What useInjectedSetup Does


When you test Vue composables that use `inject()`, you need a helper that:

<v-clicks>

1. **Adds Test Dependencies**
   - Works as a parent component
   - Adds test values

2. **Runs Your Code**
   - Runs your setup function
   - Returns the values

3. **Sets Up the Test**
   - Creates a test Vue app
   - Places components
   - Returns results like a real app

</v-clicks>

---

# Visual Flow of useInjectedSetup

1. **First Step**
   - You call `useInjectedSetup()` with your composable and test values

2. **Making Components**
   - It makes two parts:
     - `Parent`: Puts in the test values
     - `Child`: Runs your composable code

3. **Building the App**
   - It builds a test Vue app
   - It puts the parts together like this:
     ```html
     <div>
       <Parent>
         <Child />
       </Parent>
     </div>
     ```

4. **Using the Results**
   - It gives back what your composable returns
   - You can use these values in your test
   - When done, call `.unmount()` to clean up

---

````md magic-move

/* STEP 1 – imports */
```ts
import type { InjectionKey } from 'vue'
import { createApp, defineComponent, h, provide } from 'vue'
```

/* STEP 2 – helper types */
```ts
import type { InjectionKey } from 'vue'
import { createApp, defineComponent, h, provide } from 'vue'

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never
type VM<V> = InstanceType<V> & { unmount: () => void }
```

/* STEP 3 – `InjectionConfig` interface */
```ts
import type { InjectionKey } from 'vue'
import { createApp, defineComponent, h, provide } from 'vue'

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never
type VM<V> = InstanceType<V> & { unmount: () => void }

interface InjectionConfig {
  key: InjectionKey<any> | string
  value: any
}
```

/* STEP 4 – function signature */
```ts
export function useInjectedSetup<TResult>(
  setup: () => TResult,
  injections: InjectionConfig[] = [],
): TResult & { unmount: () => void } {
}
```

```ts
export function useInjectedSetup<TResult>(
  setup: () => TResult,
  injections: InjectionConfig[] = [],
): TResult & { unmount: () => void } {
  let result!: TResult                     // <-- capture result
}
```

```ts
export function useInjectedSetup<TResult>(
  setup: () => TResult,
  injections: InjectionConfig[] = [],
): TResult & { unmount: () => void } {
  let result!: TResult                     // <-- capture result

  // 👉 tiny render-only wrapper
  const Child = defineComponent({
    setup() {
      result = setup()                     // <-- run user setup
      return () => h('div')
    },
  })
}
```

```ts
export function useInjectedSetup<TResult>(
  setup: () => TResult,
  injections: InjectionConfig[] = [],
): TResult & { unmount: () => void } {
  let result!: TResult                     // <-- capture result

  // 👉 tiny render-only wrapper
  const Child = defineComponent({
    setup() {
      result = setup()                     // <-- run user setup
      return () => h('div')
    },
  })

  // 👉 provider that injects values then renders Comp
  const Parent = defineComponent({
    setup() {
      injections.forEach(({ key, value }) => provide(key, value))
      return () => h(Child)
    },
  })
}
```

/* STEP 6 – mount and return value */
```ts
export function useInjectedSetup<TResult>(
  setup: () => TResult,
  injections: InjectionConfig[] = [],
): TResult & { unmount: () => void } {
  let result!: TResult

  const Child = defineComponent({ /* … */ })
  const Parent = defineComponent({ /* … */ })

  const mounted = mount(Parent)          // <-- actual DOM mount

  return {
    ...result,                             // <-- expose user setup result
    unmount: mounted.unmount,              // <-- expose teardown
  } as TResult & { unmount: () => void }
}
```

/* STEP 7 – the `mount` helper */
```ts
export function useInjectedSetup<TResult>( /* …full body… */ )

function mount<V>(Comp: V) {
  const el = document.createElement('div')
  const app = createApp(Comp as any)
  const unmount = () => app.unmount()
  const comp = app.mount(el) as any as VM<V>
  comp.unmount = unmount
  return comp
}
```
````

---
layout: iframe
url: 'https://play.vuejs.org/#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'
---

---
layout: image
image: 'images/provideInject2.png'
backgroundSize: contain
---

---
layout: image
image: 'images/anyQuestions.png'
backgroundSize: contain
---




