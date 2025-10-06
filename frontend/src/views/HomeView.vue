<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary-600">🎮 WebXR CMS</h1>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink to="/gallery" class="text-gray-600 hover:text-gray-900">
              Gallery
            </RouterLink>
            <RouterLink to="/login" class="btn-secondary">
              Sign In
            </RouterLink>
            <RouterLink to="/register" class="btn-primary">
              Get Started
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Create Immersive
          <span class="text-primary-600">WebXR Experiences</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Build, edit, and share AR/VR scenes with our intuitive web-based editor. 
          No coding required - just drag, drop, and create amazing immersive content.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/register" class="btn-primary text-lg px-8 py-3">
            Start Creating
          </RouterLink>
          <RouterLink to="/gallery" class="btn-secondary text-lg px-8 py-3">
            View Gallery
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Create
          </h2>
          <p class="text-xl text-gray-600">
            Powerful tools for building immersive WebXR experiences
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-semibold mb-2">Visual Editor</h3>
            <p class="text-gray-600">
              Intuitive drag-and-drop interface for creating 3D scenes with basic shapes and materials.
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">🥽</div>
            <h3 class="text-xl font-semibold mb-2">AR/VR Ready</h3>
            <p class="text-gray-600">
              Experience your creations in AR and VR modes on supported devices and browsers.
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">🌐</div>
            <h3 class="text-xl font-semibold mb-2">Share & Discover</h3>
            <p class="text-gray-600">
              Publish your projects and explore amazing creations from the community.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to Start Creating?
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Join thousands of creators building the future of immersive web experiences.
        </p>
        <RouterLink to="/register" class="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200">
          Get Started Free
        </RouterLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">🎮 WebXR CMS</h3>
          <p class="text-gray-400 mb-4">
            Building the future of immersive web experiences
          </p>
          <p class="text-gray-500 text-sm">
            © 2024 WebXR CMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>