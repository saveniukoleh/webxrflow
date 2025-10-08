import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
  type Project
} from '../firebase/firestore'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const userProjects = computed(() => projects.value)
  const projectCount = computed(() => projects.value.length)

  // Actions
  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    setError(null)
  }

  // Load user's projects
  const loadUserProjects = async () => {
    const authStore = useAuthStore()
    if (!authStore.user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { projects: userProjects, error: loadError } = await getUserProjects(authStore.user.uid)
      
      if (loadError) {
        setError(loadError)
        return
      }

      projects.value = userProjects
    } catch (err: any) {
      setError(err.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  // Create a new project
  const createNewProject = async (title: string, description: string = '') => {
    const authStore = useAuthStore()
    if (!authStore.user) {
      setError('User not authenticated')
      return { success: false, project: null }
    }

    setLoading(true)
    setError(null)

    try {
      // Start with minimal data to test
      const projectData = {
        userId: authStore.user.uid,
        title,
        description,
        sceneData: {
          version: "1.0",
          objects: []
        },
        isPublished: false
      }

      const { project, error: createError } = await createProject(projectData)
      
      if (createError) {
        setError(createError)
        return { success: false, project: null }
      }

      if (project) {
        projects.value.unshift(project) // Add to beginning of array
        return { success: true, project }
      }

      return { success: false, project: null }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create project'
      setError(errorMessage)
      return { success: false, project: null }
    } finally {
      setLoading(false)
    }
  }

  // Update a project
  const updateExistingProject = async (projectId: string, updates: Partial<Project>) => {
    setLoading(true)
    setError(null)

    try {
      const { success, error: updateError } = await updateProject(projectId, updates)
      
      if (updateError) {
        setError(updateError)
        return { success: false }
      }

      if (success) {
        // Update the project in the local array
        const index = projects.value.findIndex(p => p.id === projectId)
        if (index !== -1) {
          projects.value[index] = { ...projects.value[index], ...updates }
        }
        return { success: true }
      }

      return { success: false }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update project'
      setError(errorMessage)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Delete a project
  const deleteExistingProject = async (projectId: string) => {
    setLoading(true)
    setError(null)

    try {
      const { success, error: deleteError } = await deleteProject(projectId)
      
      if (deleteError) {
        setError(deleteError)
        return { success: false }
      }

      if (success) {
        // Remove the project from the local array
        projects.value = projects.value.filter(p => p.id !== projectId)
        return { success: true }
      }

      return { success: false }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete project'
      setError(errorMessage)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Get a specific project by ID
  const getProjectById = (projectId: string): Project | undefined => {
    return projects.value.find(p => p.id === projectId)
  }

  return {
    // State
    projects,
    loading,
    error,
    
    // Getters
    userProjects,
    projectCount,
    
    // Actions
    loadUserProjects,
    createNewProject,
    updateExistingProject,
    deleteExistingProject,
    getProjectById,
    clearError
  }
})
