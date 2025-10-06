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
            <RouterLink to="/gallery" class="text-gray-600 hover:text-gray-900">
              Gallery
            </RouterLink>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-700">Welcome, User!</span>
              <button class="text-gray-600 hover:text-gray-900">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
        <p class="text-gray-600">Create and manage your WebXR experiences</p>
      </div>

      <!-- Create New Project Button -->
      <div class="mb-8">
        <RouterLink to="/editor" class="btn-primary text-lg px-6 py-3 inline-flex items-center">
          <span class="text-xl mr-2">+</span>
          Create New Project
        </RouterLink>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Sample Project Cards -->
        <div class="card hover:shadow-md transition-shadow cursor-pointer">
          <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-gray-500">3D Preview</span>
          </div>
          <h3 class="text-lg font-semibold mb-2">My First Scene</h3>
          <p class="text-gray-600 text-sm mb-4">A simple WebXR experience with basic shapes</p>
          <div class="flex space-x-2">
            <RouterLink to="/editor/1" class="btn-secondary text-sm">Edit</RouterLink>
            <RouterLink to="/view/1" class="btn-primary text-sm">View</RouterLink>
            <button class="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>
        </div>

        <div class="card hover:shadow-md transition-shadow cursor-pointer">
          <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-gray-500">3D Preview</span>
          </div>
          <h3 class="text-lg font-semibold mb-2">AR Demo</h3>
          <p class="text-gray-600 text-sm mb-4">Augmented reality showcase</p>
          <div class="flex space-x-2">
            <RouterLink to="/editor/2" class="btn-secondary text-sm">Edit</RouterLink>
            <RouterLink to="/view/2" class="btn-primary text-sm">View</RouterLink>
            <button class="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>
        </div>

        <!-- Empty State -->
        <div class="card border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
          <div class="aspect-video flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl mb-2">+</div>
              <span class="text-gray-500">Create New Project</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Public Gallery Section -->
      <div class="mt-16">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Public Gallery</h2>
          <RouterLink to="/gallery" class="text-primary-600 hover:text-primary-700">
            View All →
          </RouterLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="card hover:shadow-md transition-shadow cursor-pointer">
            <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500">Preview</span>
            </div>
            <h4 class="font-semibold text-sm">Amazing AR Experience</h4>
            <p class="text-gray-600 text-xs">by @creator</p>
          </div>
          
          <div class="card hover:shadow-md transition-shadow cursor-pointer">
            <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500">Preview</span>
            </div>
            <h4 class="font-semibold text-sm">VR World</h4>
            <p class="text-gray-600 text-xs">by @artist</p>
          </div>
          
          <div class="card hover:shadow-md transition-shadow cursor-pointer">
            <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500">Preview</span>
            </div>
            <h4 class="font-semibold text-sm">Interactive Scene</h4>
            <p class="text-gray-600 text-xs">by @developer</p>
          </div>
          
          <div class="card hover:shadow-md transition-shadow cursor-pointer">
            <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500">Preview</span>
            </div>
            <h4 class="font-semibold text-sm">3D Gallery</h4>
            <p class="text-gray-600 text-xs">by @designer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>