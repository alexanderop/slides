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
          <span class="tree__caret" :class="{ 'tree__caret--open': ctx.isOpen(node.path) }" aria-hidden="true">▸</span>
          <span class="tree__icon" aria-hidden="true">📁</span>
          <span class="tree__name">{{ node.name }}</span>
        </button>

        <!-- File row -->
        <span
          v-else
          class="tree__label tree__label--file"
          :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
        >
          <span class="tree__dot" aria-hidden="true">•</span>
          <span class="tree__icon" aria-hidden="true">📄</span>
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
        <span class="tree__caret" :class="{ 'tree__caret--open': ctx.isOpen(node.path) }" aria-hidden="true">▸</span>
        <span class="tree__icon" aria-hidden="true">📁</span>
        <span class="tree__name">{{ node.name }}</span>
      </button>

      <span
        v-else
        class="tree__label tree__label--file"
        :style="{ paddingLeft: (depth * ctx.indentPx) + 'px' }"
      >
        <span class="tree__dot" aria-hidden="true">•</span>
        <span class="tree__icon" aria-hidden="true">📄</span>
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
  const toggle = (path: string) => { open[path] = !open[path] }
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

// Open-all only once (at the root that provides context)
if (!parentCtx) {
  let initialized = false
  watch(
    () => nodesToRender.value,
    (tree) => {
      if (initialized) return
      if (props.openAll) {
        const openAll = (nodes: TreeNode[]) => {
          for (const n of nodes) {
            if (n.type === 'folder') {
              ctx.open[n.path] = true
              if (n.children?.length) openAll(n.children)
            }
          }
        }
        openAll(tree)
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
  border-radius: 12px;
  padding: 1rem;
}

.tree__header {
  padding-bottom: .5rem;
  margin-bottom: .75rem;
  border-bottom: 1px solid rgba(var(--color-border), .4);
}
.tree__title { margin: 0; font-size: 1.05rem; color: rgb(var(--color-accent)); }

.tree__list { list-style: none; margin: 0; padding: 0; }
.tree__node { margin: 0; }

.tree__label {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .25rem .5rem;
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  text-align: left;
  font: inherit;
  color: rgb(var(--color-text-base));
  cursor: pointer;
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
  width: 1rem;
  display: inline-block;
  transform: rotate(0deg);
  transition: transform .14s ease;
  opacity: .9;
}
.tree__caret--open { transform: rotate(90deg); color: rgb(var(--color-accent)); }
.tree__icon { width: 1rem; text-align: center; opacity: .9; }
.tree__dot { width: 1rem; text-align: center; opacity: .6; }
.tree__name { white-space: nowrap; }

.tree-slide-enter-from, .tree-slide-leave-to { opacity: 0; transform: translateY(-2px); }
.tree-slide-enter-active, .tree-slide-leave-active { transition: opacity .14s ease, transform .14s ease; }
</style>