<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-4">
            <RouterLink to="/gallery" class="text-gray-300 hover:text-white">
              ← Back to Gallery
            </RouterLink>
            <div class="text-sm text-gray-400">
              {{ projectTitle }}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="text-gray-300 hover:text-white">Settings</button>
            <button class="text-gray-300 hover:text-white">Share</button>
            <button class="text-gray-300 hover:text-white">Fullscreen</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- WebXR Viewport -->
    <div class="relative h-[calc(100vh-4rem)]">
      <!-- Three.js WebXR Container -->
      <div id="webxr-container" class="w-full h-full">
        <!-- Placeholder for WebXR content -->
        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div class="text-center">
            <div class="text-8xl mb-6">🥽</div>
            <h2 class="text-3xl font-bold mb-4">WebXR Experience</h2>
            <p class="text-gray-400 mb-8 max-w-md">
              This is where your immersive 3D scene will be rendered. 
              WebXR content will appear here when implemented.
            </p>
            
            <!-- WebXR Controls -->
            <div class="space-y-4">
              <button 
                @click="startAR"
                :disabled="!isARSupported"
                class="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="mr-2">📱</span>
                Start AR Experience
              </button>
              
              <button 
                @click="startVR"
                :disabled="!isVRSupported"
                class="btn-secondary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="mr-2">🎮</span>
                Start VR Experience
              </button>
              
              <button 
                @click="startDesktop"
                class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                <span class="mr-2">🖥️</span>
                View in Browser
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div class="text-center">
          <div class="loading-spinner mx-auto mb-4"></div>
          <p class="text-lg">Loading WebXR experience...</p>
        </div>
      </div>

      <!-- Instructions Overlay -->
      <div v-if="showInstructions" class="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 backdrop-blur-sm rounded-lg p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold mb-2">How to Use</h3>
            <ul class="text-sm text-gray-300 space-y-1">
              <li>• Point your device at a flat surface</li>
              <li>• Tap to place objects in AR mode</li>
              <li>• Use gestures to interact with objects</li>
              <li>• Move around to explore the scene</li>
            </ul>
          </div>
          <button @click="showInstructions = false" class="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      </div>

      <!-- WebXR Status -->
      <div class="absolute top-4 left-4 bg-black bg-opacity-75 backdrop-blur-sm rounded-lg p-3">
        <div class="flex items-center space-x-2 text-sm">
          <div :class="webxrStatus.color" class="w-2 h-2 rounded-full"></div>
          <span>{{ webxrStatus.text }}</span>
        </div>
      </div>
    </div>

    <!-- Project Info Modal -->
    <div v-if="showProjectInfo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-gray-900">Project Information</h3>
          <button @click="showProjectInfo = false" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <p class="text-gray-900">{{ projectTitle }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <p class="text-gray-600">{{ projectDescription }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Author</label>
            <p class="text-gray-900">@{{ projectAuthor }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Created</label>
            <p class="text-gray-600">{{ projectDate }}</p>
          </div>
        </div>
        
        <div class="flex space-x-3 mt-6">
          <button @click="showProjectInfo = false" class="btn-secondary">
            Close
          </button>
          <button class="btn-primary">
            View in Gallery
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const showInstructions = ref(true)
const showProjectInfo = ref(false)

const projectTitle = ref('Amazing AR Experience')
const projectDescription = ref('An incredible augmented reality showcase featuring interactive 3D objects and realistic lighting.')
const projectAuthor = ref('creator')
const projectDate = ref('2 days ago')

const isARSupported = ref(false)
const isVRSupported = ref(false)

const webxrStatus = computed(() => {
  if (loading.value) {
    return { text: 'Loading...', color: 'bg-yellow-500' }
  } else if (isARSupported.value || isVRSupported.value) {
    return { text: 'WebXR Ready', color: 'bg-green-500' }
  } else {
    return { text: 'WebXR Not Supported', color: 'bg-red-500' }
  }
})

const startAR = async () => {
  loading.value = true
  try {
    // TODO: Implement WebXR AR session
    console.log('Starting AR experience...')
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Initialize AR scene
  } catch (error) {
    console.error('AR start error:', error)
  } finally {
    loading.value = false
  }
}

const startVR = async () => {
  loading.value = true
  try {
    // TODO: Implement WebXR VR session
    console.log('Starting VR experience...')
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Initialize VR scene
  } catch (error) {
    console.error('VR start error:', error)
  } finally {
    loading.value = false
  }
}

const startDesktop = () => {
  // TODO: Start desktop 3D viewer
  console.log('Starting desktop experience...')
}

const checkWebXRSupport = () => {
  // TODO: Check for WebXR support
  if ((navigator as any).xr) {
    (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
      isARSupported.value = supported
    })
    
    (navigator as any).xr.isSessionSupported('immersive-vr').then((supported: boolean) => {
      isVRSupported.value = supported
    })
  }
}

onMounted(() => {
  checkWebXRSupport()
  
  // Load project data based on route parameter
  const projectId = route.params.id
  if (projectId) {
    // TODO: Load project data from Firebase
    console.log('Loading project:', projectId)
  }
})
</script>