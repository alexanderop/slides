<template>
  <!-- Root: card + headline -->
  <section v-if="root" class="tree">
    <header class="tree__header">
      <h1 class="tree__title">{{ title }}</h1>
    </header>

    <ul class="tree__list" v-if="nodesToRender.length">
      <li
        v-for="node in nodesToRender"
        :key="node.path"
        class="tree__node"
        :class="{
          'tree__node--folder': node.type === 'folder',
          'tree__node--file': node.type === 'file',
          'tree__node--open': ctx.isOpen(node.path)
        }"
      >
        <!-- Folder row -->
        <button
          v-if="node.type === 'folder'"
          class="tree__label"
          type="button"
          :aria-expanded="ctx.isOpen(node.path)"
          @click="ctx.toggle(node.path)"
          :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
        >
          <div class="tree__caret" :class="{ 'tree__caret--open': ctx.isOpen(node.path) }" aria-hidden="true">
            <div class="i-carbon:chevron-right" />
          </div>
          <div class="tree__icon" aria-hidden="true">
            <div class="i-carbon:folder" />
          </div>
          <span class="tree__name">{{ node.name }}</span>
        </button>

        <!-- File row -->
        <span
          v-else
          class="tree__label tree__label--file"
          :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
        >
          <div class="tree__dot" aria-hidden="true">
            <div class="w-1 h-1 bg-current rounded-full opacity-60" />
          </div>
          <div class="tree__icon" aria-hidden="true" :class="getFileIconClass(node.name)" />
          <span class="tree__name">{{ node.name }}</span>
        </span>

        <!-- Children: render child instance WITHOUT header -->
        <transition name="tree-slide">
          <FolderTree
            v-if="node.type === 'folder' && ctx.isOpen(node.path)"
            :nodes="node.children"
            :depth="depth + 1"
            :indent-px="ctx.indentPx"
            :open-all="openAll"
          />
        </transition>
      </li>
    </ul>
  </section>

  <!-- Children: plain list only -->
  <ul v-else class="tree__list" v-if="nodesToRender.length">
    <li
      v-for="node in nodesToRender"
      :key="node.path"
      class="tree__node"
      :class="{
        'tree__node--folder': node.type === 'folder',
        'tree__node--file': node.type === 'file',
        'tree__node--open': ctx.isOpen(node.path)
      }"
    >
      <button
        v-if="node.type === 'folder'"
        class="tree__label"
        type="button"
        :aria-expanded="ctx.isOpen(node.path)"
        @click="ctx.toggle(node.path)"
        :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
      >
        <div class="tree__caret" :class="{ 'tree__caret--open': ctx.isOpen(node.path) }" aria-hidden="true">
          <div class="i-carbon:chevron-right" />
        </div>
        <div class="tree__icon" aria-hidden="true">
          <div class="i-carbon:folder" />
        </div>
        <span class="tree__name">{{ node.name }}</span>
      </button>

      <span
        v-else
        class="tree__label tree__label--file"
        :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
      >
        <div class="tree__dot" aria-hidden="true">
          <div class="w-1 h-1 bg-current rounded-full opacity-60" />
        </div>
        <div class="tree__icon" aria-hidden="true" :class="getFileIconClass(node.name)" />
        <span class="tree__name">{{ node.name }}</span>
      </span>

      <transition name="tree-slide">
        <FolderTree
          v-if="node.type === 'folder' && ctx.isOpen(node.path)"
          :nodes="node.children"
          :depth="depth + 1"
          :indent-px="ctx.indentPx"
          :open-all="openAll"
        />
      </transition>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, inject, provide, reactive, watch } from 'vue'

type NodeType = 'file' | 'folder'
interface TreeNode {
  name: string
  type: NodeType
  path: string
  children?: TreeNode[]
}

interface TreeContext {
  open: Record<string, boolean>
  indentPx: number
  isOpen: (path: string) => boolean
  toggle: (path: string) => void
}

const TreeCtxKey: unique symbol = Symbol('FolderTreeCtx')
defineOptions({ name: 'FolderTree' })

const props = withDefaults(defineProps<{
  root?: boolean            // <-- only true at the top-level
  title?: string
  structure?: string
  nodes?: TreeNode[]
  depth?: number
  indentPx?: number
  openAll?: boolean
}>(), {
  root: false,
  title: 'Project Files',
  depth: 0,
  indentPx: 16,
  openAll: true
})

const parentCtx = inject<TreeContext | null>(TreeCtxKey, null)
const ctx: TreeContext = parentCtx ?? (() => {
  // Root provides the shared state
  const open = reactive<Record<string, boolean>>({})
  const indentPx = props.indentPx
  const isOpen = (path: string) => !!open[path]
  
  const toggle = (path: string) => { 
    // Check if this is a direct child of src (format: /src/components, /src/composables, etc.)
    const isFirstLevelChild = path.match(/^\/src\/[^\/]+$/)
    
    if (isFirstLevelChild) {
      // For first-level children, close all other first-level siblings
      Object.keys(open).forEach(key => {
        if (key.match(/^\/src\/[^\/]+$/) && key !== path) {
          open[key] = false
          
          // Also close all children of other first-level nodes
          Object.keys(open).forEach(childKey => {
            if (childKey.startsWith(key + '/')) {
              open[childKey] = false
            }
          })
        }
      })
    }
    
    // Toggle the clicked item
    open[path] = !open[path] 
  }
  
  const newCtx: TreeContext = { open, indentPx, isOpen, toggle }
  provide(TreeCtxKey, newCtx)
  return newCtx
})()

const nodesToRender = computed<TreeNode[]>(() => {
  if (props.nodes) return props.nodes
  const input = (props.structure ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '  ')
  return parseStructure(input)
})

function parseStructure(input: string): TreeNode[] {
  const lines = input.split('\n').map(l => l.replace(/\t/g, '  '))
  const root: TreeNode[] = []
  const stack: Array<{ indent: number; node: TreeNode }> = []
  let prevIndent = 0
  let prevNode: TreeNode | null = null

  const getIndent = (line: string) => {
    let i = 0
    while (i < line.length && line[i] === ' ') i++
    return i
  }

  for (const raw of lines) {
    if (!raw.trim()) continue
    const indent = getIndent(raw)
    let trimmed = raw.trim()

    let forcedFolder = false
    if (trimmed.endsWith('/')) {
      forcedFolder = true
      trimmed = trimmed.slice(0, -1)
    }

    if (prevNode && indent > prevIndent) {
      if (prevNode.type === 'file') {
        prevNode.type = 'folder'
        prevNode.children = []
      }
      stack.push({ indent: prevIndent, node: prevNode })
    } else {
      while (stack.length && indent <= stack[stack.length - 1].indent) {
        stack.pop()
      }
    }

    const parent = stack.length ? stack[stack.length - 1].node : null
    const node: TreeNode = {
      name: trimmed,
      type: forcedFolder ? 'folder' : 'file',
      path: parent ? `${parent.path}/${trimmed}` : `/${trimmed}`,
      children: forcedFolder ? [] : undefined
    }

    if (parent) {
      parent.children = parent.children ?? []
      parent.children.push(node)
    } else {
      root.push(node)
    }

    prevIndent = indent
    prevNode = node
  }

  return root
}

// Function to get appropriate icon class for file types
function getFileIconClass(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'vue':
      return 'i-logos:vue text-green-500'
    case 'ts':
      return 'i-logos:typescript-icon text-blue-500'
    case 'js':
      return 'i-logos:javascript text-yellow-500'
    case 'json':
      return 'i-carbon:settings text-gray-400'
    case 'md':
      return 'i-carbon:document text-blue-400'
    case 'css':
      return 'i-logos:css-3 text-blue-500'
    case 'scss':
    case 'sass':
      return 'i-logos:sass text-pink-500'
    case 'html':
      return 'i-logos:html-5 text-orange-500'
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return 'i-carbon:image text-purple-400'
    case 'ico':
      return 'i-vscode-icons:file-type-favicon text-blue-400'
    default:
      return 'i-carbon:document text-gray-400'
  }
}

// Open-all only once (at the root that provides context)
if (!parentCtx) {
  let initialized = false
  watch(
    () => nodesToRender.value,
    (tree) => {
      if (initialized) return
      if (props.openAll) {
        // Find the src folder and open it + its first child folder
        const srcFolder = tree.find(node => node.name === 'src' && node.type === 'folder')
        if (srcFolder) {
          // Always open src
          ctx.open[srcFolder.path] = true
          
          // Open ONLY the first child of src (not its nested children initially)
          if (srcFolder.children && srcFolder.children.length > 0) {
            const firstChild = srcFolder.children[0]
            if (firstChild.type === 'folder') {
              ctx.open[firstChild.path] = true
            }
          }
        }
      }
      initialized = true
    },
    { immediate: true }
  )
}
</script>

<style scoped>
.tree {
  background: rgb(var(--color-card));
  color: rgb(var(--color-text-base));
  border: 1px solid rgb(var(--color-border));
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.85rem;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.tree__header {
  padding-bottom: .25rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid rgba(var(--color-border), .4);
}
.tree__title { margin: 0; font-size: 0.9rem; color: rgb(var(--color-accent)); }

.tree__list { list-style: none; margin: 0; padding: 0; }
.tree__node { margin: 0; }

.tree__label {
  display: flex;
  align-items: center;
  gap: .35rem;
  padding: .15rem .35rem;
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: left;
  font: inherit;
  color: rgb(var(--color-text-base));
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1.2;
}
.tree__label--file { cursor: default; }
.tree__label:hover {
  background: rgba(var(--color-card-muted), .12);
  border-color: rgba(var(--color-border), .25);
}
/* Accessible focus without the big blue ring */
.tree__label:focus { outline: none; }
.tree__label:focus-visible {
  outline: 2px solid rgb(var(--color-accent));
  outline-offset: 2px;
}

.tree__caret {
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(0deg);
  transition: transform .14s ease;
  opacity: .9;
}
.tree__caret--open { 
  transform: rotate(90deg); 
}
.tree__caret--open div { 
  color: rgb(var(--color-accent)); 
}
.tree__icon { 
  width: 0.75rem; 
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .9; 
}
.tree__dot { 
  width: 0.75rem; 
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .6; 
}
.tree__name { white-space: nowrap; }

.tree-slide-enter-from, .tree-slide-leave-to { opacity: 0; transform: translateY(-1px); }
.tree-slide-enter-active, .tree-slide-leave-active { transition: opacity .12s ease, transform .12s ease; }

/* Custom scrollbar styling */
.tree::-webkit-scrollbar {
  width: 8px;
}

.tree::-webkit-scrollbar-track {
  background: rgba(var(--color-card-muted), 0.2);
  border-radius: 4px;
}

.tree::-webkit-scrollbar-thumb {
  background: rgba(var(--color-border), 0.6);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.tree::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--color-accent), 0.8);
}

/* Firefox scrollbar */
.tree {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--color-border), 0.6) rgba(var(--color-card-muted), 0.2);
}
</style>