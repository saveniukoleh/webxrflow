import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from 'firebase/auth'
import { 
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  logout, 
  onAuthStateChange,
  getUserData,
  type UserData 
} from '../firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const userData = ref<UserData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => userData.value?.email?.includes('admin') || false)

  // Actions
  const setUser = (newUser: User | null) => {
    user.value = newUser
    if (newUser) {
      loadUserData(newUser.uid)
    } else {
      userData.value = null
    }
  }

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const loadUserData = async (uid: string) => {
    try {
      const data = await getUserData(uid)
      userData.value = data
    } catch (err) {
      console.error('Error loading user data:', err)
    }
  }

  const register = async (email: string, password: string, displayName?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { user: newUser, error: registerError } = await registerWithEmail(email, password, displayName)
      
      if (registerError) {
        setError(registerError)
        return { success: false, error: registerError }
      }
      
      if (newUser) {
        setUser(newUser)
        return { success: true, error: null }
      }
      
      return { success: false, error: 'Registration failed' }
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { user: loggedInUser, error: loginError } = await loginWithEmail(email, password)
      
      if (loginError) {
        setError(loginError)
        return { success: false, error: loginError }
      }
      
      if (loggedInUser) {
        setUser(loggedInUser)
        return { success: true, error: null }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogleProvider = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { user: loggedInUser, error: loginError } = await loginWithGoogle()
      
      if (loginError) {
        setError(loginError)
        return { success: false, error: loginError }
      }
      
      if (loggedInUser) {
        setUser(loggedInUser)
        return { success: true, error: null }
      }
      
      return { success: false, error: 'Google login failed' }
    } catch (err: any) {
      const errorMessage = err.message || 'Google login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logoutUser = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { error: logoutError } = await logout()
      
      if (logoutError) {
        setError(logoutError)
        return { success: false, error: logoutError }
      }
      
      setUser(null)
      return { success: true, error: null }
    } catch (err: any) {
      const errorMessage = err.message || 'Logout failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  // Initialize auth state listener
  const initAuth = () => {
    onAuthStateChange((newUser) => {
      setUser(newUser)
    })
  }

  return {
    // State
    user,
    userData,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    register,
    login,
    loginWithGoogleProvider,
    logoutUser,
    clearError,
    initAuth
  }
})
