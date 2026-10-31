# WebXR CMS

Portfolio project by [Oleh Saveniuk](https://github.com/saveniukoleh).

**Live demo:** [https://saveniukoleh.github.io/webxrflow/](https://saveniukoleh.github.io/webxrflow/)

> A web app for creating, editing, and publishing immersive WebXR experiences in the browser.

---

## ✨ Features

### 🔐 **Authentication & User Management**
- **Secure Access**: Email/password authentication with optional Google OAuth
- **User Profiles**: Complete user profile management system
- **Access Control**: Secure project ownership and editing permissions

### 🎨 **WebXR Scene Editor**
- **3D Scene Creation**: Load and edit WebXR scenes using Three.js or A-Frame
- **Object Library**: Add basic 3D objects (cubes, spheres, planes)
- **Transform Tools**: Move, rotate, and scale objects with precision
- **Material Editor**: Customize colors, materials, and transparency
- **Project Management**: Save scenes as JSON with title and description
- **Real-time Preview**: See changes instantly in the editor

### 📁 **Asset Management**
- **3D Model Upload**: Support for .glb/.gltf files
- **Texture Support**: Upload .jpg/.png textures
- **Smart Linking**: Connect assets to specific projects
- **Performance Optimization**: Automatic file size optimization

### 🌐 **Publishing & Gallery**
- **One-Click Publishing**: Generate unique shareable links
- **Public Gallery**: Browse and discover published projects
- **Rich Metadata**: View title, author, and publication dates
- **Direct WebXR Access**: Open projects instantly in AR/VR mode

### 🥽 **WebXR Support**
- **AR Experiences**: Surface tracking and object placement
- **VR Viewing**: Immersive virtual reality interactions
- **Cross-Platform**: Works on mobile and desktop devices

## 🛠 **Tech Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Vue.js + TailwindCSS | Modern, responsive UI framework |
| **Backend** | Firebase | Complete backend-as-a-service |
| **Database** | Firestore | Real-time NoSQL database |
| **Storage** | Firebase Storage | File and asset management |
| **Authentication** | Firebase Auth | User management & security |
| **WebXR** | Three.js / A-Frame | 3D graphics and WebXR support |
| **Hosting** | Firebase Hosting | Global CDN deployment |

---

## 📅 **Development Timeline**

### 🎯 **Phase 1: Foundation** (Weeks 1-2)
- [x] ✅ Define MVP features and requirements
- [x] ✅ Create comprehensive development plan
- [ ] 🎨 Design wireframes and UI prototypes
- [ ] ⚙️ Set up development environment
- [ ] 📦 Initialize Git repository and project structure

### 🔥 **Phase 2: Backend** (Weeks 3-4)
- [ ] 🔧 Set up Firebase project and configuration
- [ ] 🔐 Implement Firebase Authentication (email/password + Google OAuth)
- [ ] 🗄️ Design Firestore database structure (Users, Projects, Assets)
- [ ] 📝 Implement Firestore CRUD operations for projects
- [ ] 📁 Set up Firebase Storage for asset uploads

### 🎨 **Phase 3: Scene Editor** (Weeks 5-6)
- [ ] 🌐 Set up basic WebXR scene environment
- [ ] 📦 Add basic 3D objects library
- [ ] 🔧 Implement object transformation tools
- [ ] 💾 Enable project saving and loading
- [ ] ⚙️ Create properties editing panel

### 🌐 **Phase 4: Publishing** (Weeks 7-8)
- [ ] 🚀 Implement project publishing system
- [ ] 🖼️ Build project gallery interface
- [ ] 📤 Add asset upload functionality
- [ ] 📱 Optimize assets for mobile devices

### 🥽 **Phase 5: WebXR** (Weeks 9-10)
- [ ] 📱 Implement AR surface tracking
- [ ] 🎮 Add VR viewing capabilities
- [ ] 🔍 Cross-device compatibility testing

### 🚀 **Phase 6: Launch** (Weeks 11-12)
- [ ] 🌐 Cross-browser testing and optimization
- [ ] ⚡ Performance optimization
- [ ] 🚀 Deploy to Firebase Hosting
- [ ] 🎉 Beta launch and user feedback collection

## 🎯 **MVP Goals**

The minimum viable product enables users to:

> 1. 🔐 **Register and log into the system** with secure authentication
> 2. 🎨 **Create simple WebXR projects** with basic 3D objects and materials
> 3. 💾 **Save and publish projects** with unique shareable links
> 4. 🖼️ **View projects in a gallery** (personal and public projects)
> 5. 🥽 **Experience scenes in WebXR** (AR/VR modes on supported devices)

---

## 🚀 **Future Enhancements**

### **Advanced Features**
- 🎯 **Drag-and-drop** object placement system
- 🎨 **Advanced material library** with PBR materials
- 🗺️ **SLAM features** for advanced AR tracking
- 🎬 **Animation system** for interactive experiences
- 📊 **Analytics dashboard** for project insights
- 👥 **Collaborative editing** with real-time updates

### **Platform Expansion**
- 📱 **Mobile app** for iOS and Android
- 🎮 **VR headset** native applications
- 🌐 **WebXR extensions** for advanced features

---

## 🏃‍♂️ **Getting Started**

### **Prerequisites**
- Node.js 18+
- A modern browser. WebXR features need a browser and device that support them.
- A Firebase project if you want authentication, saved projects, and asset uploads

### **Installation**
```bash
git clone https://github.com/saveniukoleh/webxrflow.git
cd webxrflow/frontend
npm install
npm run dev
```

The dev server runs at [http://localhost:5173/](http://localhost:5173/).

### **GitHub Pages**
A push to `main` builds `frontend/` and publishes the site to GitHub Pages at [https://saveniukoleh.github.io/webxrflow/](https://saveniukoleh.github.io/webxrflow/). The production build uses the `/webxrflow/` base path. A copy of `index.html` is published as `404.html` so client-side routes such as `/gallery` still load.

---

## 📄 **License**

> *License information to be added*

---

## 🤝 **Contributing**

> *Contribution guidelines to be added*

---

<div align="center">

### 🚧 **Development Status**

**Live demo**: [saveniukoleh.github.io/webxrflow](https://saveniukoleh.github.io/webxrflow/)

[![Status](https://img.shields.io/badge/Status-Portfolio%20demo-orange)](https://github.com/saveniukoleh/webxrflow)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-green)](https://firebase.google.com/)
[![WebXR](https://img.shields.io/badge/WebXR-Ready-blue)](https://immersiveweb.dev/)

</div>
