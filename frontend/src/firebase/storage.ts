import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

// File upload interface
export interface UploadResult {
  downloadURL: string | null
  error: string | null
}

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  '3D_MODELS': ['.glb', '.gltf'],
  'TEXTURES': ['.jpg', '.jpeg', '.png', '.webp'],
  'ALL': ['.glb', '.gltf', '.jpg', '.jpeg', '.png', '.webp']
}

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  '3D_MODELS': 50 * 1024 * 1024, // 50MB
  'TEXTURES': 10 * 1024 * 1024,  // 10MB
  'DEFAULT': 10 * 1024 * 1024    // 10MB
}

// Validate file type
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
  return allowedTypes.includes(fileExtension)
}

// Validate file size
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize
}

// Get file type category
export const getFileTypeCategory = (filename: string): '3D_MODELS' | 'TEXTURES' | 'OTHER' => {
  const extension = '.' + filename.split('.').pop()?.toLowerCase()
  
  if (ALLOWED_FILE_TYPES['3D_MODELS'].includes(extension)) {
    return '3D_MODELS'
  } else if (ALLOWED_FILE_TYPES['TEXTURES'].includes(extension)) {
    return 'TEXTURES'
  }
  
  return 'OTHER'
}

// Upload file to Firebase Storage
export const uploadFile = async (
  file: File,
  userId: string,
  folder: string = 'assets'
): Promise<UploadResult> => {
  try {
    // Validate file type
    const fileCategory = getFileTypeCategory(file.name)
    if (fileCategory === 'OTHER') {
      return {
        downloadURL: null,
        error: 'File type not supported. Allowed types: .glb, .gltf, .jpg, .jpeg, .png, .webp'
      }
    }
    
    // Validate file size
    const maxSize = FILE_SIZE_LIMITS[fileCategory]
    if (!validateFileSize(file, maxSize)) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      return {
        downloadURL: null,
        error: `File size too large. Maximum size: ${maxSizeMB}MB`
      }
    }
    
    // Create storage reference
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name}`
    const storageRef = ref(storage, `${folder}/${userId}/${fileName}`)
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return { downloadURL, error: null }
  } catch (error: any) {
    return { downloadURL: null, error: error.message }
  }
}

// Delete file from Firebase Storage
export const deleteFile = async (downloadURL: string): Promise<{ success: boolean, error: string | null }> => {
  try {
    // Create reference from URL
    const fileRef = ref(storage, downloadURL)
    
    // Delete file
    await deleteObject(fileRef)
    
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Upload project thumbnail
export const uploadThumbnail = async (
  file: File,
  userId: string,
  projectId: string
): Promise<UploadResult> => {
  try {
    // Validate file type (only images for thumbnails)
    if (!validateFileType(file, ALLOWED_FILE_TYPES['TEXTURES'])) {
      return {
        downloadURL: null,
        error: 'Thumbnail must be an image file (.jpg, .jpeg, .png, .webp)'
      }
    }
    
    // Validate file size
    if (!validateFileSize(file, FILE_SIZE_LIMITS['TEXTURES'])) {
      const maxSizeMB = Math.round(FILE_SIZE_LIMITS['TEXTURES'] / (1024 * 1024))
      return {
        downloadURL: null,
        error: `Thumbnail size too large. Maximum size: ${maxSizeMB}MB`
      }
    }
    
    // Create storage reference
    const timestamp = Date.now()
    const fileName = `thumbnail_${timestamp}_${file.name}`
    const storageRef = ref(storage, `thumbnails/${userId}/${projectId}/${fileName}`)
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return { downloadURL, error: null }
  } catch (error: any) {
    return { downloadURL: null, error: error.message }
  }
}
