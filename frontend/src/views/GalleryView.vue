<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="text-2xl font-bold text-primary-600">🎮 WebXR CMS</RouterLink>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink to="/login" class="text-gray-600 hover:text-gray-900">
              Sign In
            </RouterLink>
            <RouterLink to="/register" class="btn-primary">
              Get Started
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Public Gallery</h1>
        <p class="text-xl text-gray-600 mb-8">
          Discover amazing WebXR experiences created by our community
        </p>
        
        <!-- Search and Filter -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="Search projects..."
              class="w-full input-field pl-10 pr-4 py-3"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Project -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Project</h2>
        <div class="card overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/2">
              <div class="aspect-video bg-gray-200 flex items-center justify-center">
                <span class="text-gray-500 text-lg">3D Preview</span>
              </div>
            </div>
            <div class="md:w-1/2 p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Amazing AR Experience</h3>
              <p class="text-gray-600 mb-4">
                An incredible augmented reality showcase featuring interactive 3D objects, 
                realistic lighting, and smooth animations. Perfect for demonstrating the 
                power of WebXR technology.
              </p>
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-600">by @creator</span>
                </div>
                <span class="text-sm text-gray-500">2 days ago</span>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="mr-1">👁️</span>
                  <span>1.2k views</span>
                </div>
              </div>
              <div class="flex space-x-3">
                <RouterLink to="/view/featured" class="btn-primary">
                  View in AR/VR
                </RouterLink>
                <button class="btn-secondary">
                  ❤️ Like
                </button>
                <button class="btn-secondary">
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Projects -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">All Projects</h2>
          <div class="flex space-x-2">
            <button class="btn-secondary text-sm">Latest</button>
            <button class="btn-secondary text-sm">Popular</button>
            <button class="btn-secondary text-sm">Trending</button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="card hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(`/view/${project.id}`)"
          >
            <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500">3D Preview</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">{{ project.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ project.description }}</p>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>by @{{ project.author }}</span>
              <span>{{ project.views }} views</span>
            </div>
            <div class="flex items-center mt-2 text-xs text-gray-500">
              <span class="mr-4">{{ project.likes }} ❤️</span>
              <span>{{ project.date }}</span>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-8">
          <button class="btn-secondary px-8 py-3">
            Load More Projects
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const projects = ref([
  {
    id: 1,
    title: 'Virtual Art Gallery',
    description: 'Explore a 3D art gallery with interactive exhibits',
    author: 'artist',
    views: 856,
    likes: 42,
    date: '3 days ago'
  },
  {
    id: 2,
    title: 'AR Furniture Demo',
    description: 'Place virtual furniture in your real space',
    author: 'designer',
    views: 1.2e3,
    likes: 78,
    date: '1 week ago'
  },
  {
    id: 3,
    title: 'Space Exploration',
    description: 'Journey through the solar system in VR',
    author: 'explorer',
    views: 2.1e3,
    likes: 156,
    date: '2 weeks ago'
  },
  {
    id: 4,
    title: 'Interactive City',
    description: 'Walk through a bustling virtual city',
    author: 'architect',
    views: 934,
    likes: 67,
    date: '2 weeks ago'
  },
  {
    id: 5,
    title: 'Underwater World',
    description: 'Dive into an immersive underwater experience',
    author: 'marine',
    views: 1.5e3,
    likes: 89,
    date: '3 weeks ago'
  },
  {
    id: 6,
    title: 'Medieval Castle',
    description: 'Explore a detailed medieval castle interior',
    author: 'historian',
    views: 1.8e3,
    likes: 124,
    date: '3 weeks ago'
  },
  {
    id: 7,
    title: 'Abstract Art Space',
    description: 'Immersive abstract art installation',
    author: 'abstract',
    views: 567,
    likes: 34,
    date: '1 month ago'
  },
  {
    id: 8,
    title: 'Futuristic Lab',
    description: 'High-tech laboratory with interactive elements',
    author: 'scientist',
    views: 1.1e3,
    likes: 91,
    date: '1 month ago'
  }
])
</script>