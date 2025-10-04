# 🎮 WebXR CMS - MVP Features

> **Essential features for the minimum viable product**

---

## 🔐 **1. Authentication and Users**

### **Core Authentication**
- ✅ **Registration/Login/Logout** (email + password, optionally OAuth with Google)
- 👤 **User Data Storage**: name, email, unique ID
- 🔒 **Access Control**: Only authenticated users can edit their own projects

---

## 🎨 **2. Scene Editor (WebXR)**

### **Basic Functionality**
- 🌐 **Load WebXR Scene** (Three.js or A-Frame)
- 📦 **Add Objects**: cube, sphere, plane
- 🔧 **Transform Objects**: move, rotate, and scale
- 🎨 **Edit Properties**: color, material, transparency
- 💾 **Scene Saving**: JSON format on server for later editing
- 📝 **Project Management**: title and description panel

### **Optional for MVP** *(if time allows)*
- 🖱️ **Drag-and-drop** objects from asset panel into the scene
- 🎨 **Material Library** with simple colors and materials

---

## 📁 **3. Asset Upload and Management**

- 📤 **Upload 3D Models**: .glb/.gltf files
- 🖼️ **Upload Textures**: .jpg/.png files
- 🔗 **Asset Linking**: Connect assets to specific projects
- ⚡ **Performance**: File size limits for optimization

---

## 🌐 **4. Publishing and Gallery**

- 🚀 **Publish Projects**: Generate unique shareable links
- 🖼️ **Gallery View**: Browse published projects (grid or list)
- 📊 **Project Info**: title, author, publication date
- 🥽 **WebXR Access**: Open projects directly in WebXR mode

---

## 🥽 **5. WebXR Basics**

- 📱 **AR Support**: Simple object placement on surfaces
- 🎮 **VR Support**: Panoramas or basic interactions

---

## ⚙️ **6. Admin Functions (Minimal MVP)**

- ✏️ **Project Management**: Delete or edit own projects
- ✅ **File Validation**: Validate uploaded files

---

## 🎯 **MVP Summary**

> **Minimal functionality allowing users to:**

1. 🔐 **Register and log into the system**
2. 🎨 **Create simple WebXR projects** with basic objects
3. 💾 **Save and publish projects** for sharing
4. 🖼️ **View projects in gallery** (own and others')
5. 🥽 **Experience scenes in WebXR** (AR/VR modes)

---

<div align="center">

### 📊 **Feature Priority**

| Priority | Feature | Status |
|----------|---------|--------|
| **P0** | Authentication & User Management | 🔴 Critical |
| **P0** | Basic Scene Editor | 🔴 Critical |
| **P0** | Project Publishing | 🔴 Critical |
| **P1** | Asset Upload | 🟡 Important |
| **P1** | WebXR Viewing | 🟡 Important |
| **P2** | Advanced Editor Features | 🟢 Nice to Have |

</div>
