<template>
    <div class="p-5 bg-[rgb(33,39,55)] text-[rgb(234,237,243)] rounded-lg">
      <div class="grid grid-cols-3 gap-5">
        <div class="bg-[rgb(52,63,96)] p-4 rounded-lg border border-[rgb(171,75,153)]">
          <h3 class="flex items-center gap-2">
            Device 1 
            <span :class="['text-sm ml-2 flex items-center gap-1', device1Online ? 'text-green-400' : 'text-red-400']">
              <div :class="device1Online ? 'i-carbon-wifi' : 'i-carbon-wifi-off'" class="text-lg" />
              {{ device1Online ? 'Online' : 'Offline' }}
            </span>
          </h3>
          <button @click="device1Online = !device1Online" 
                  class="mt-2 px-3 py-1 bg-[rgb(255,107,237)] text-[rgb(234,237,243)] rounded hover:bg-opacity-90 transition-colors">
            Toggle Connection
          </button>
          <div class="mt-4 space-y-2">
            <div v-for="todo in device1Todos" 
                 :key="todo.id" 
                 class="flex items-center gap-3 p-2 bg-[rgb(138,51,123)] rounded">
              <input type="checkbox" 
                     v-model="todo.completed" 
                     @change="syncFromDevice1(todo)"
                     class="rounded border-[rgb(171,75,153)]"/>
              <input type="text" 
                     v-model="todo.text" 
                     @blur="syncFromDevice1(todo)"
                     class="flex-1 bg-[rgb(33,39,55)] text-[rgb(234,237,243)] rounded px-2 py-1 border border-[rgb(171,75,153)] focus:outline-none focus:border-[rgb(255,107,237)]"/>
              <button @click="deleteTodo(1, todo.id)"
                      class="p-1 text-[rgb(234,237,243)] hover:text-[rgb(255,107,237)]">
                <div class="i-carbon-close" />
              </button>
            </div>
            <button @click="addTodo(1)"
                    class="w-full px-3 py-1 bg-[rgb(255,107,237)] text-[rgb(234,237,243)] rounded hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
              <div class="i-carbon-add" />
              Add Todo
            </button>
          </div>
        </div>
  
        <div class="bg-[rgb(52,63,96)] p-4 rounded-lg border border-[rgb(171,75,153)]">
          <h3 class="flex items-center gap-2">
            Server 
            <span class="text-sm ml-2 flex items-center gap-1">
              <div class="i-carbon-data-backup text-lg" />
              {{ pendingUpdates }} pending updates
            </span>
          </h3>
          <div class="mt-4 p-3 bg-[rgb(33,39,55)] rounded-lg">
            <div v-for="todo in serverTodos" 
                 :key="todo.id" 
                 class="py-1 text-[rgb(234,237,243)]">
              {{ todo.text }} <span v-if="todo.completed" class="i-carbon-checkmark inline-block" />
            </div>
          </div>
        </div>
  
        <div class="bg-[rgb(52,63,96)] p-4 rounded-lg border border-[rgb(171,75,153)]">
          <h3 class="flex items-center gap-2">
            Device 2 
            <span :class="['text-sm ml-2 flex items-center gap-1', device2Online ? 'text-green-400' : 'text-red-400']">
              <div :class="device2Online ? 'i-carbon-wifi' : 'i-carbon-wifi-off'" class="text-lg" />
              {{ device2Online ? 'Online' : 'Offline' }}
            </span>
          </h3>
          <button @click="device2Online = !device2Online"
                  class="mt-2 px-3 py-1 bg-[rgb(255,107,237)] text-[rgb(234,237,243)] rounded hover:bg-opacity-90 transition-colors">
            Toggle Connection
          </button>
          <div class="mt-4 space-y-2">
            <div v-for="todo in device2Todos" 
                 :key="todo.id" 
                 class="flex items-center gap-3 p-2 bg-[rgb(138,51,123)] rounded">
              <input type="checkbox" 
                     v-model="todo.completed" 
                     @change="syncFromDevice2(todo)"
                     class="rounded border-[rgb(171,75,153)]"/>
              <input type="text" 
                     v-model="todo.text" 
                     @blur="syncFromDevice2(todo)"
                     class="flex-1 bg-[rgb(33,39,55)] text-[rgb(234,237,243)] rounded px-2 py-1 border border-[rgb(171,75,153)] focus:outline-none focus:border-[rgb(255,107,237)]"/>
              <button @click="deleteTodo(2, todo.id)"
                      class="p-1 text-[rgb(234,237,243)] hover:text-[rgb(255,107,237)]">
                <div class="i-carbon-close" />
              </button>
            </div>
            <button @click="addTodo(2)"
                    class="w-full px-3 py-1 bg-[rgb(255,107,237)] text-[rgb(234,237,243)] rounded hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
              <div class="i-carbon-add" />
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  let nextId = 1;
  const generateId = () => nextId++;
  
  // Device states
  const device1Online = ref(true);
  const device2Online = ref(true);
  const device1Todos = ref([]);
  const device2Todos = ref([]);
  
  // Server state
  const serverTodos = ref([]);
  
  // Separate queues for each device
  const device1Queue = ref([]);
  const device2Queue = ref([]);
  
  // Watchers for online status
  watch(device1Online, (online) => {
    if (online) processDeviceQueue(1);
  });
  
  watch(device2Online, (online) => {
    if (online) processDeviceQueue(2);
  });
  
  const addTodo = (device) => {
    const newTodo = {
      id: generateId(),
      text: 'New Todo',
      completed: false,
      version: 1
    };
    
    if (device === 1) {
      device1Todos.value.push(newTodo);
      queueUpdate(1, newTodo);
    } else {
      device2Todos.value.push(newTodo);
      queueUpdate(2, newTodo);
    }
  };
  
  const deleteTodo = (device, id) => {
    if (device === 1) {
      device1Todos.value = device1Todos.value.filter(t => t.id !== id);
    } else {
      device2Todos.value = device2Todos.value.filter(t => t.id !== id);
    }
    queueDelete(device, id);
  };
  
  const syncFromDevice1 = (todo) => {
    queueUpdate(1, todo);
  };
  
  const syncFromDevice2 = (todo) => {
    queueUpdate(2, todo);
  };
  
  const queueUpdate = (device, todo) => {
    const queue = device === 1 ? device1Queue : device2Queue;
    queue.value.push({ 
      type: 'update', 
      data: { ...todo },
      timestamp: Date.now()
    });
    tryProcessQueue(device);
  };
  
  const queueDelete = (device, id) => {
    const queue = device === 1 ? device1Queue : device2Queue;
    queue.value.push({ 
      type: 'delete', 
      id,
      timestamp: Date.now()
    });
    tryProcessQueue(device);
  };
  
  const tryProcessQueue = (device) => {
    const isOnline = device === 1 ? device1Online.value : device2Online.value;
    if (isOnline) processDeviceQueue(device);
  };
  
  const processDeviceQueue = async (device) => {
    const queue = device === 1 ? device1Queue : device2Queue;
    if (!queue.value.length) return;
  
    // Process all queued items
    while (queue.value.length > 0) {
      const update = queue.value[0]; // Peek first item
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (update.type === 'update') {
        handleServerUpdate(update.data);
      } else {
        handleServerDelete(update.id);
      }
      
      queue.value.shift(); // Remove processed item
    }
  };
  
  const handleServerUpdate = (todo) => {
    const existing = serverTodos.value.find(t => t.id === todo.id);
    if (existing) {
      if (todo.version > existing.version) {
        Object.assign(existing, todo);
        propagateUpdate(todo);
      }
    } else {
      serverTodos.value.push({ ...todo });
      propagateUpdate(todo);
    }
  };
  
  const handleServerDelete = (id) => {
    serverTodos.value = serverTodos.value.filter(t => t.id !== id);
    propagateDelete(id);
  };
  
  const propagateUpdate = (todo) => {
    [device1Todos, device2Todos].forEach(device => {
      const existing = device.value.find(t => t.id === todo.id);
      if (existing) {
        if (todo.version > existing.version) {
          Object.assign(existing, todo);
        }
      } else {
        device.value.push({ ...todo });
      }
    });
  };
  
  const propagateDelete = (id) => {
    [device1Todos, device2Todos].forEach(device => {
      device.value = device.value.filter(t => t.id !== id);
    });
  };
  </script>
  
  <style>
  /* Remove all existing styles as we're using Tailwind classes */
  </style>