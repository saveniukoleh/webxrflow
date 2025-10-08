# 🔥 Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `webxr-cms` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Firebase Services

### Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" provider
3. Enable "Google" provider (optional)
4. Configure authorized domains if needed

### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location close to your users

### Storage
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select the same location as Firestore

### Hosting (Optional for now)
1. Go to "Hosting"
2. Click "Get started"
3. Follow the setup instructions

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app (</>) icon
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 4. Update Frontend Configuration

1. Open `/frontend/src/firebase/config.ts`
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
}
```

## 5. Set Up Firestore Security Rules

1. Go to "Firestore Database" → "Rules"
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own projects
    match /projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow read: if resource.data.isPublished == true; // Published projects are publicly readable
    }
    
    // Users can read/write their own assets
    match /assets/{assetId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 6. Set Up Storage Security Rules

1. Go to "Storage" → "Rules"
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload to their own folders
    match /{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.metadata.userId;
    }
  }
}
```

## 7. Test the Setup

1. Start the development server: `npm run dev`
2. Try to register a new account
3. Check Firebase Console to see if the user was created
4. Try logging in and out

## Next Steps

Once Firebase is configured:
1. ✅ Authentication system will work
2. ✅ User data will be stored in Firestore
3. ✅ Projects can be saved and loaded
4. ✅ File uploads will work with Firebase Storage

## Troubleshooting

### Common Issues:
- **"Firebase: Error (auth/configuration-not-found)"**: Check your Firebase config values
- **"Permission denied"**: Check your Firestore security rules
- **"Storage permission denied"**: Check your Storage security rules
- **CORS errors**: Make sure your domain is added to authorized domains in Firebase Console

### Getting Help:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
