---
# You can also start simply with 'default'
theme: geist
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: How to test Vue Composables
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---


# How to Test Vue Composables
### A Comprehensive Guide with Vitest

alexop.dev | Nov 10, 2024

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

# Why test Vue Composables?

<v-clicks>

- Keep business logic in one place
- Split UI code from app code
- Test code to make it work right
- Make code easy to fix and reuse
- Test hard code in small pieces

</v-clicks>

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


