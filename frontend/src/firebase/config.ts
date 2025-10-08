import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDR2PnfRMjqNdUumbAvUjUl8tFJP1d5Fjw",
  authDomain: "webxrflow.firebaseapp.com",
  projectId: "webxrflow",
  storageBucket: "webxrflow.firebasestorage.app",
  messagingSenderId: "431702705151",
  appId: "1:431702705151:web:3aa72b4d4b01389f849dca",
  measurementId: "G-THHHE906WS"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
