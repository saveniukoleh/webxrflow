<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="text-6xl mb-4">🤔</div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p class="text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="space-y-4">
        <RouterLink to="/" class="btn-primary text-lg px-8 py-3 inline-block">
          Go Home
        </RouterLink>
        <div class="text-sm text-gray-500">
          or
        </div>
        <RouterLink to="/gallery" class="btn-secondary text-lg px-8 py-3 inline-block">
          Browse Gallery
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>