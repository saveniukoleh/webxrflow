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
              <span class="text-sm text-gray-700">Welcome, {{ authStore.userData?.displayName || 'User' }}!</span>
              <button 
                @click="handleLogout" 
                class="text-gray-600 hover:text-gray-900"
                :disabled="authStore.loading"
              >
                {{ authStore.loading ? 'Logging out...' : 'Logout' }}
              </button>
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

      <!-- Error Message -->
      <div v-if="projectsStore.error" class="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {{ projectsStore.error }}
        <button @click="projectsStore.clearError()" class="ml-2 text-red-800 hover:text-red-900">×</button>
      </div>

      <!-- Create New Project Button -->
      <div class="mb-8">
        <button 
          @click="showCreateModal = true"
          :disabled="projectsStore.loading"
          class="btn-primary text-lg px-6 py-3 inline-flex items-center disabled:opacity-50"
        >
          <span class="text-xl mr-2">+</span>
          {{ projectsStore.loading ? 'Loading...' : 'Create New Project' }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="projectsStore.loading && projectsStore.projects.length === 0" class="text-center py-12">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading your projects...</p>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="projectsStore.projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project Cards -->
        <div 
          v-for="project in projectsStore.projects" 
          :key="project.id"
          class="card hover:shadow-md transition-shadow"
        >
          <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-gray-500">3D Preview</span>
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ project.description || 'No description' }}</p>
          <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
            <span>{{ formatDate(project.createdAt) }}</span>
            <span v-if="project.isPublished" class="bg-green-100 text-green-800 px-2 py-1 rounded">Published</span>
            <span v-else class="bg-gray-100 text-gray-800 px-2 py-1 rounded">Draft</span>
          </div>
          <div class="flex space-x-2">
            <RouterLink :to="`/editor/${project.id}`" class="btn-secondary text-sm">Edit</RouterLink>
            <RouterLink :to="`/view/${project.id}`" class="btn-primary text-sm">View</RouterLink>
            <button 
              @click="confirmDeleteProject(project)"
              class="text-red-600 hover:text-red-800 text-sm"
              :disabled="projectsStore.loading"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- Add New Project Card -->
        <div 
          class="card border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
          @click="showCreateModal = true"
        >
          <div class="aspect-video flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl mb-2">+</div>
              <span class="text-gray-500">Create New Project</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🎮</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
        <p class="text-gray-600 mb-6">Create your first WebXR experience to get started!</p>
        <button 
          @click="showCreateModal = true"
          class="btn-primary text-lg px-6 py-3 inline-flex items-center"
        >
          <span class="text-xl mr-2">+</span>
          Create Your First Project
        </button>
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

    <!-- Create Project Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">Create New Project</h3>
        
        <form @submit.prevent="handleCreateProject">
          <div class="mb-4">
            <label for="projectTitle" class="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              id="projectTitle"
              v-model="newProject.title"
              type="text"
              required
              class="input-field"
              placeholder="Enter project title"
            />
          </div>
          
          <div class="mb-6">
            <label for="projectDescription" class="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="projectDescription"
              v-model="newProject.description"
              rows="3"
              class="input-field"
              placeholder="Describe your project..."
            ></textarea>
          </div>
          
          <div class="flex space-x-3">
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 btn-secondary"
              :disabled="projectsStore.loading"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 btn-primary"
              :disabled="projectsStore.loading || !newProject.title.trim()"
            >
              {{ projectsStore.loading ? 'Creating...' : 'Create Project' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">Delete Project</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ projectToDelete?.title }}"? This action cannot be undone.
        </p>
        
        <div class="flex space-x-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 btn-secondary"
            :disabled="projectsStore.loading"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteProject"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            :disabled="projectsStore.loading"
          >
            {{ projectsStore.loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProjectsStore } from '../stores/projects'
import type { Project } from '../firebase/firestore'

const router = useRouter()
const authStore = useAuthStore()
const projectsStore = useProjectsStore()

// Modal states
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const projectToDelete = ref<Project | null>(null)

// New project form
const newProject = ref({
  title: '',
  description: ''
})

// Load projects when component mounts
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await projectsStore.loadUserProjects()
  }
})

// Format date for display
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Handle project creation
const handleCreateProject = async () => {
  if (!newProject.value.title.trim()) return

  const { success, project } = await projectsStore.createNewProject(
    newProject.value.title.trim(),
    newProject.value.description.trim()
  )

  if (success && project) {
    showCreateModal.value = false
    newProject.value = { title: '', description: '' }
    // Navigate to editor with the new project
    router.push(`/editor/${project.id}`)
  }
}

// Confirm project deletion
const confirmDeleteProject = (project: Project) => {
  projectToDelete.value = project
  showDeleteModal.value = true
}

// Handle project deletion
const handleDeleteProject = async () => {
  if (!projectToDelete.value?.id) return

  const { success } = await projectsStore.deleteExistingProject(projectToDelete.value.id)
  
  if (success) {
    showDeleteModal.value = false
    projectToDelete.value = null
  }
}

// Handle logout
const handleLogout = async () => {
  const { success } = await authStore.logoutUser()
  if (success) {
    router.push('/')
  }
}
</script>