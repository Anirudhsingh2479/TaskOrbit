# TaskOrbit 🚀

**A Modern Team Collaboration & Task Management Platform**

TaskOrbit is a full-stack web application that helps teams organize work through workspaces, projects, and tasks with powerful role-based access control.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ Features

- 🏢 **Multi-tenant Workspaces** - Organize teams in separate workspaces
- 📁 **Project Management** - Group tasks into projects with custom emojis
- ✅ **Advanced Task Management** - Full task lifecycle with status tracking
- 👥 **Role-Based Access Control** - Owner, Admin, and Member roles
- 🔐 **Secure Authentication** - Local auth + Google OAuth integration
- 📊 **Analytics Dashboard** - Track project and workspace progress
- 🎨 **Modern UI** - Beautiful, responsive interface with dark/light themes

## 🚀 Quick Start

Get started in 5 minutes! See our [**Quick Start Guide**](QUICK_START.md) for the fastest way to run TaskOrbit locally.

## 📚 Complete Documentation

### For Beginners
- 📖 [**Complete Project Guide**](PROJECT_GUIDE.md) - Comprehensive step-by-step understanding
- ⚡ [**Quick Start Guide**](QUICK_START.md) - Get running in 5 minutes
- 🏗️ [**Architecture Overview**](ARCHITECTURE_DIAGRAM.md) - Visual system architecture

### For Developers
- 🔧 **Backend**: Node.js + Express + MongoDB + Passport.js
- 🎨 **Frontend**: React + Vite + TailwindCSS + TanStack Query
- 🛡️ **Security**: Role-based permissions, session management
- 📡 **API**: RESTful API with Zod validation

## 🏃‍♂️ Quick Setup

```bash
# Clone and install
git clone https://github.com/Anirudhsingh2479/TaskOrbit.git
cd TaskOrbit

# Backend setup
cd backend && npm install && cp .env.sample .env
# Edit .env with your MongoDB URI
npm run seed && npm run dev

# Frontend setup (new terminal)
cd client && npm install && cp .env.sample .env
npm run dev
```

Visit: http://localhost:5173

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + Vite | Modern React development |
| **Styling** | TailwindCSS + Radix UI | Beautiful, accessible components |
| **State** | TanStack Query + Zustand | Server & client state management |
| **Backend** | Node.js + Express | RESTful API server |
| **Database** | MongoDB + Mongoose | Document database with ODM |
| **Auth** | Passport.js | Local + Google OAuth |
| **Validation** | Zod | Type-safe validation |

## 📊 System Overview

```
User → Workspace → Projects → Tasks
  ↓
Members (Owner/Admin/Member roles)
```

- **Workspaces**: Team containers with invite codes
- **Projects**: Work organization within workspaces  
- **Tasks**: Individual work items with status tracking
- **Members**: Role-based team collaboration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and Node.js best practices
- UI components from Radix UI and Lucide React
- Authentication powered by Passport.js
- State management with TanStack Query

---

**Ready to get started?** Jump to our [Quick Start Guide](QUICK_START.md) or dive deep with the [Complete Project Guide](PROJECT_GUIDE.md)!
