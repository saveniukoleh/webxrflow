import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './config'

// Project interface
export interface Project {
  id?: string
  userId: string
  title: string
  description: string
  sceneData: any // JSON data for the 3D scene
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  thumbnailUrl?: string
}

// Asset interface
export interface Asset {
  id?: string
  userId: string
  filename: string
  downloadURL: string
  fileSize: number
  fileType: string
  createdAt: Date
}

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate()
  }
  return new Date(timestamp)
}

// Convert Date to Firestore timestamp
const convertToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date)
}

// Projects collection operations
export const projectsCollection = collection(db, 'projects')

// Create a new project
export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ project: Project | null, error: string | null }> => {
  try {
    const now = new Date()
    const projectToCreate = {
      ...projectData,
      createdAt: convertToTimestamp(now),
      updatedAt: convertToTimestamp(now)
    }
    
    // Debug: Log the data being sent to Firestore
    console.log('Creating project with data:', JSON.stringify(projectToCreate, null, 2))
    
    const docRef = await addDoc(projectsCollection, projectToCreate)
    const project: Project = {
      id: docRef.id,
      ...projectData,
      createdAt: now,
      updatedAt: now
    }
    
    return { project, error: null }
  } catch (error: any) {
    console.error('Error creating project:', error)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      details: error.details
    })
    return { project: null, error: error.message || 'Failed to create project' }
  }
}

// Get a project by ID
export const getProject = async (projectId: string): Promise<{ project: Project | null, error: string | null }> => {
  try {
    const projectRef = doc(db, 'projects', projectId)
    const projectSnap = await getDoc(projectRef)
    
    if (projectSnap.exists()) {
      const data = projectSnap.data()
      const project: Project = {
        id: projectSnap.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        sceneData: data.sceneData,
        isPublished: data.isPublished,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        thumbnailUrl: data.thumbnailUrl
      }
      return { project, error: null }
    }
    
    return { project: null, error: 'Project not found' }
  } catch (error: any) {
    return { project: null, error: error.message }
  }
}

// Get all projects for a user
export const getUserProjects = async (userId: string): Promise<{ projects: Project[], error: string | null }> => {
  try {
    // Query without orderBy to avoid needing a composite index
    const q = query(
      projectsCollection,
      where('userId', '==', userId)
    )
    
    const querySnapshot = await getDocs(q)
    const projects: Project[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      projects.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        sceneData: data.sceneData,
        isPublished: data.isPublished,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        thumbnailUrl: data.thumbnailUrl
      })
    })
    
    // Sort by updatedAt in descending order on the client side
    projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    
    return { projects, error: null }
  } catch (error: any) {
    return { projects: [], error: error.message }
  }
}

// Get all published projects
export const getPublishedProjects = async (limitCount: number = 20): Promise<{ projects: Project[], error: string | null }> => {
  try {
    const q = query(
      projectsCollection,
      where('isPublished', '==', true),
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const projects: Project[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      projects.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        sceneData: data.sceneData,
        isPublished: data.isPublished,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        thumbnailUrl: data.thumbnailUrl
      })
    })
    
    return { projects, error: null }
  } catch (error: any) {
    return { projects: [], error: error.message }
  }
}

// Update a project
export const updateProject = async (projectId: string, updates: Partial<Project>): Promise<{ success: boolean, error: string | null }> => {
  try {
    const projectRef = doc(db, 'projects', projectId)
    const updateData = {
      ...updates,
      updatedAt: convertToTimestamp(new Date())
    }
    
    // Remove id from updates if it exists
    delete updateData.id
    
    await updateDoc(projectRef, updateData)
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Delete a project
export const deleteProject = async (projectId: string): Promise<{ success: boolean, error: string | null }> => {
  try {
    const projectRef = doc(db, 'projects', projectId)
    await deleteDoc(projectRef)
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Assets collection operations
export const assetsCollection = collection(db, 'assets')

// Create a new asset record
export const createAsset = async (assetData: Omit<Asset, 'id' | 'createdAt'>): Promise<{ asset: Asset | null, error: string | null }> => {
  try {
    const now = new Date()
    const assetToCreate = {
      ...assetData,
      createdAt: convertToTimestamp(now)
    }
    
    const docRef = await addDoc(assetsCollection, assetToCreate)
    const asset: Asset = {
      id: docRef.id,
      ...assetData,
      createdAt: now
    }
    
    return { asset, error: null }
  } catch (error: any) {
    return { asset: null, error: error.message }
  }
}

// Get all assets for a user
export const getUserAssets = async (userId: string): Promise<{ assets: Asset[], error: string | null }> => {
  try {
    const q = query(
      assetsCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const assets: Asset[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      assets.push({
        id: doc.id,
        userId: data.userId,
        filename: data.filename,
        downloadURL: data.downloadURL,
        fileSize: data.fileSize,
        fileType: data.fileType,
        createdAt: convertTimestamp(data.createdAt)
      })
    })
    
    return { assets, error: null }
  } catch (error: any) {
    return { assets: [], error: error.message }
  }
}
