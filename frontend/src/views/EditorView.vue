<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-4">
            <RouterLink to="/dashboard" class="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </RouterLink>
            <div class="text-sm text-gray-500">
              Project: {{ projectName || 'Untitled Project' }}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="btn-secondary">Save</button>
            <button class="btn-primary">Publish</button>
            <button class="btn-secondary">Preview</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Editor Layout -->
    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Left Sidebar - Object Library -->
      <div class="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">Object Library</h3>
        
        <!-- Basic Shapes -->
        <div class="mb-6">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Basic Shapes</h4>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="shape in basicShapes" 
              :key="shape.name"
              @click="addObject(shape.type)"
              class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div class="text-2xl mb-1">{{ shape.icon }}</div>
              <div class="text-xs text-gray-600">{{ shape.name }}</div>
            </button>
          </div>
        </div>

        <!-- Materials -->
        <div class="mb-6">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Materials</h4>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input type="color" v-model="selectedColor" class="w-8 h-8 rounded border border-gray-300">
              <span class="text-sm text-gray-600">Color</span>
            </div>
            <select v-model="selectedMaterial" class="w-full input-field text-sm">
              <option value="basic">Basic</option>
              <option value="phong">Phong</option>
              <option value="standard">Standard</option>
            </select>
          </div>
        </div>

        <!-- Assets -->
        <div class="mb-6">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Assets</h4>
          <button class="w-full btn-secondary text-sm mb-2">
            Upload 3D Model
          </button>
          <button class="w-full btn-secondary text-sm">
            Upload Texture
          </button>
        </div>
      </div>

      <!-- Center - 3D Viewport -->
      <div class="flex-1 bg-gray-100 relative">
        <div id="three-container" class="w-full h-full">
          <!-- Three.js scene will be rendered here -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <div class="text-6xl mb-4">🎮</div>
              <h3 class="text-xl font-semibold mb-2">3D Scene Viewport</h3>
              <p class="text-sm">Three.js scene will be rendered here</p>
              <p class="text-xs mt-2">Add objects from the sidebar to get started</p>
            </div>
          </div>
        </div>
        
        <!-- Viewport Controls -->
        <div class="absolute top-4 right-4 space-y-2">
          <button class="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50" title="Reset View">
            🎯
          </button>
          <button class="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50" title="Toggle Grid">
            ⊞
          </button>
          <button class="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50" title="Toggle Wireframe">
            ⚡
          </button>
        </div>
      </div>

      <!-- Right Sidebar - Properties Panel -->
      <div class="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">Properties</h3>
        
        <div v-if="selectedObject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Object Type</label>
            <div class="text-sm text-gray-600">{{ selectedObject.type }}</div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="selectedObject.position.x" type="number" step="0.1" class="input-field text-sm" placeholder="X">
              <input v-model.number="selectedObject.position.y" type="number" step="0.1" class="input-field text-sm" placeholder="Y">
              <input v-model.number="selectedObject.position.z" type="number" step="0.1" class="input-field text-sm" placeholder="Z">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rotation</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="selectedObject.rotation.x" type="number" step="0.1" class="input-field text-sm" placeholder="X">
              <input v-model.number="selectedObject.rotation.y" type="number" step="0.1" class="input-field text-sm" placeholder="Y">
              <input v-model.number="selectedObject.rotation.z" type="number" step="0.1" class="input-field text-sm" placeholder="Z">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Scale</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model.number="selectedObject.scale.x" type="number" step="0.1" class="input-field text-sm" placeholder="X">
              <input v-model.number="selectedObject.scale.y" type="number" step="0.1" class="input-field text-sm" placeholder="Y">
              <input v-model.number="selectedObject.scale.z" type="number" step="0.1" class="input-field text-sm" placeholder="Z">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input type="color" v-model="selectedObject.color" class="w-full h-10 rounded border border-gray-300">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Material</label>
            <select v-model="selectedObject.material" class="w-full input-field text-sm">
              <option value="basic">Basic</option>
              <option value="phong">Phong</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <button class="w-full btn-secondary text-sm text-red-600 hover:bg-red-50">
              Delete Object
            </button>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 py-8">
          <div class="text-4xl mb-2">👆</div>
          <p class="text-sm">Select an object to edit its properties</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const projectName = ref('My Awesome Scene')
const selectedColor = ref('#3b82f6')
const selectedMaterial = ref('basic')

const selectedObject = ref<any>(null)

const basicShapes = [
  { name: 'Cube', type: 'cube', icon: '📦' },
  { name: 'Sphere', type: 'sphere', icon: '⚪' },
  { name: 'Plane', type: 'plane', icon: '⬜' },
  { name: 'Cylinder', type: 'cylinder', icon: '🥫' }
]

const addObject = (type: string) => {
  console.log(`Adding ${type} to scene`)
  // TODO: Implement Three.js object creation
}

onMounted(() => {
  // TODO: Initialize Three.js scene
  console.log('Editor mounted, initializing Three.js...')
})
</script>