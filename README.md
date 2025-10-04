# WebXR CMS

A content management system for creating, editing, and publishing WebXR experiences. This project enables users to build immersive AR/VR scenes through a web-based editor and share them with others.

## 🚀 Features

### Core MVP Features

- **Authentication & User Management**
  - User registration and login (email/password + optional OAuth with Google)
  - Secure access control for project editing
  - User profile management

- **WebXR Scene Editor**
  - Load and edit WebXR scenes using Three.js or A-Frame
  - Add basic 3D objects (cubes, spheres, planes)
  - Transform objects (move, rotate, scale)
  - Edit object properties (color, material, transparency)
  - Save scenes as JSON for later editing
  - Project management panel (title, description)

- **Asset Management**
  - Upload 3D models (.glb/.gltf) and textures (jpg/png)
  - Link assets to projects
  - File size optimization for performance

- **Publishing & Gallery**
  - Publish projects with unique shareable links
  - Browse published projects in gallery view
  - View project metadata (title, author, publication date)
  - Open projects directly in WebXR mode

- **WebXR Support**
  - AR scene viewing with surface tracking
  - VR scene viewing with basic interactions
  - Cross-platform compatibility

## 🛠 Tech Stack

- **Frontend**: Vue.js + TailwindCSS
- **Backend**: Firebase (Authentication, Firestore, Storage, Hosting)
- **WebXR**: Three.js or A-Frame
- **Hosting**: 
  - Frontend → Firebase Hosting
  - Backend → Firebase (All-in-one solution)

## 📋 Development Timeline

### Weeks 1-2: Planning & Setup
- [x] Define MVP features
- [x] Create development plan
- [ ] Design wireframes and prototypes
- [ ] Set up development environment
- [ ] Initialize Git repository

### Weeks 3-4: Backend & Database
- [ ] Set up Firebase project and configuration
- [ ] Implement Firebase Authentication (email/password + Google OAuth)
- [ ] Design Firestore database structure (Users, Projects, Assets collections)
- [ ] Implement Firestore CRUD operations for projects
- [ ] Set up Firebase Storage for asset uploads

### Weeks 5-6: Scene Editor (MVP)
- [ ] Set up basic WebXR scene
- [ ] Add basic 3D objects
- [ ] Implement object transformations
- [ ] Enable project saving
- [ ] Create properties panel

### Weeks 7-8: Publishing & Gallery
- [ ] Implement project publishing
- [ ] Build project gallery
- [ ] Add asset upload functionality
- [ ] Optimize assets for mobile

### Weeks 9-10: WebXR Implementation
- [ ] Implement AR surface tracking
- [ ] Add VR viewing capabilities
- [ ] Cross-device testing

### Weeks 11-12: Testing & Launch
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Deploy to Firebase Hosting
- [ ] Beta launch and feedback collection

## 🎯 MVP Goals

The minimum viable product allows users to:

1. **Register and log into the system**
2. **Create simple WebXR projects** with basic 3D objects
3. **Save and publish projects** for sharing
4. **View projects in a gallery** (own and others')
5. **Experience scenes in WebXR** (AR/VR modes)

## 🚧 Future Enhancements

- Drag-and-drop object placement
- Advanced material library
- SLAM (Simultaneous Localization and Mapping) features
- Advanced interactions and animations
- Analytics and project insights
- Collaborative editing features

## 🏃‍♂️ Getting Started

*This section will be updated as development progresses*

## 📝 License

*License information to be added*

## 🤝 Contributing

*Contribution guidelines to be added*

---

**Status**: 🚧 In Development - MVP Phase
