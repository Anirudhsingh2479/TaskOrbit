# TaskOrbit - Quick Start Guide

## 🚀 What is TaskOrbit?

TaskOrbit is a modern, full-stack **team collaboration and task management platform** that helps teams organize work into workspaces, projects, and tasks with role-based access control.

### 🏗️ Tech Stack
- **Backend**: Node.js + Express + MongoDB + Passport.js
- **Frontend**: React + Vite + TailwindCSS + TanStack Query
- **Authentication**: Local auth + Google OAuth
- **Database**: MongoDB with Mongoose ODM

---

## ⚡ Quick Setup (5 minutes)

### Prerequisites
- Node.js 16+
- MongoDB (local or cloud)
- Git

### 1. Clone & Install
```bash
# Clone repository
git clone https://github.com/Anirudhsingh2479/TaskOrbit.git
cd TaskOrbit

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../client
npm install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
PORT=8000
NODE_ENV=development
MONGO_URI="mongodb://localhost:27017/taskorbit"
SESSION_SECRET="your_secret_key_here"
FRONTEND_ORIGIN="http://localhost:5173"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:8000/api/auth/google/callback"
```

**Frontend** (`client/.env`):
```env
VITE_API_BASE_URL="http://localhost:8000/api"
```

### 3. Run the Application

**Terminal 1** (Backend):
```bash
cd backend
npm run seed    # Seed database with roles
npm run dev     # Start backend server
```

**Terminal 2** (Frontend):
```bash
cd client
npm run dev     # Start frontend server
```

### 4. Access the App
- 🌐 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:8000/api

---

## 🧭 Understanding the App Flow

### 1. **User Journey**
```
Register/Login → Create Workspace → Invite Members → Create Projects → Manage Tasks
```

### 2. **Core Concepts**

#### **Workspaces** 🏢
- Container for teams and projects
- Has members with different roles
- Unique invite codes for joining

#### **Projects** 📁  
- Organize work within workspaces
- Can have custom emoji and description
- Contains multiple tasks

#### **Tasks** ✅
- Individual work items
- Status: BACKLOG → TODO → IN_PROGRESS → IN_REVIEW → DONE
- Priority: LOW, MEDIUM, HIGH
- Can be assigned to team members

#### **Roles & Permissions** 👥
- **OWNER**: Full control (workspace creator)
- **ADMIN**: Can manage projects, tasks, and members
- **MEMBER**: Can view and create/edit tasks

---

## 🗄️ Database Structure

```
User ←→ Workspace (Many-to-Many via Member)
     ↓
Workspace → Projects → Tasks
     ↓
   Members (with Roles)
```

### Key Models:
- **User**: Authentication and profile
- **Workspace**: Team container
- **Project**: Work organization
- **Task**: Individual work items
- **Member**: User-Workspace relationship with roles

---

## 🔗 API Overview

### Authentication
```bash
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/google      # Google OAuth
```

### Workspaces
```bash
GET  /api/workspace/              # Get user workspaces
POST /api/workspace/              # Create workspace
GET  /api/workspace/:id           # Get workspace details
```

### Projects
```bash
GET  /api/project/workspace/:id   # Get workspace projects
POST /api/project/workspace/:id   # Create project
PUT  /api/project/workspace/:workspaceId/:id  # Update project
```

### Tasks
```bash
GET  /api/task/project/:id        # Get project tasks
POST /api/task/project/:id        # Create task
PUT  /api/task/:id               # Update task
```

---

## 🎯 Core Features Deep Dive

### 1. **Creating a Workspace**
1. Register/Login to the app
2. Click "Create Workspace"
3. Enter workspace name and description
4. Invite members using the generated invite code

### 2. **Managing Projects**
1. Navigate to workspace dashboard
2. Click "Create Project"
3. Add project name, emoji, and description
4. Start creating tasks within the project

### 3. **Task Management**
1. Open a project
2. Create tasks with title, description, priority
3. Assign tasks to team members
4. Track progress through status updates
5. Set due dates and monitor completion

### 4. **Role-Based Access**
- Workspace owners can manage all aspects
- Admins can manage projects and tasks
- Members have limited editing permissions
- Permissions are checked on both frontend and backend

---

## 🛠️ Common Development Tasks

### Adding a New Feature

#### Backend:
1. **Model** (`src/models/`) - Define data structure
2. **Validation** (`src/validation/`) - Zod schemas
3. **Service** (`src/services/`) - Business logic
4. **Controller** (`src/controllers/`) - Request handling
5. **Routes** (`src/routes/`) - API endpoints

#### Frontend:
1. **API Functions** (`src/lib/api/`) - HTTP calls
2. **Components** (`src/components/`) - UI components
3. **Pages** (`src/pages/`) - Page components
4. **Routes** (`src/routes/`) - Navigation

### Example: Adding Comments to Tasks

**Backend Changes:**
```javascript
// 1. models/comment.model.js
const commentSchema = new Schema({
  content: String,
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

// 2. Add API routes
POST /api/task/:id/comments
GET  /api/task/:id/comments
```

**Frontend Changes:**
```javascript
// 1. API function
export const createComment = (taskId, content) => 
  api.post(`/task/${taskId}/comments`, { content });

// 2. Component
const CommentSection = ({ taskId }) => {
  const { data: comments } = useQuery(['comments', taskId], () => getComments(taskId));
  // ... render comments
};
```

---

## 🔧 Customization Examples

### 1. **Adding New Task Status**
```javascript
// backend/src/enums/task.enum.js
export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS", 
  IN_REVIEW: "IN_REVIEW",
  BLOCKED: "BLOCKED",        // NEW STATUS
  DONE: "DONE"
};
```

### 2. **Custom Task Fields**
```javascript
// Add to task model
const taskSchema = new Schema({
  // ... existing fields
  estimatedHours: Number,
  actualHours: Number,
  tags: [String]
});
```

### 3. **Email Notifications**
```javascript
// Add notification service
export const sendTaskAssignmentEmail = async (task, assignee) => {
  // Email logic here
};
```

---

## 📚 Key Files to Understand

### Backend Key Files:
- `src/index.js` - Application entry point
- `src/config/passport.config.js` - Authentication strategies
- `src/middlewares/isAuthenticated.middleware.js` - Auth middleware
- `src/utils/roleGuard.js` - Permission checking
- `src/models/` - All data models

### Frontend Key Files:
- `src/App.jsx` - Main application component
- `src/routes/index.jsx` - Route configuration
- `src/lib/api.js` - API client functions
- `src/components/workspace/` - Workspace-related components
- `src/hooks/` - Custom React hooks

---

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file

2. **Authentication Issues**
   - Clear browser cookies
   - Check session configuration

3. **CORS Errors**
   - Verify FRONTEND_ORIGIN in backend .env
   - Check API base URL in frontend .env

4. **Permission Denied**
   - Verify user role in workspace
   - Check permission matrix

---

## 🚀 Next Steps

1. **For Learning**: Try creating workspaces, projects, and tasks to understand the flow
2. **For Development**: Start by adding small features like task comments or file attachments
3. **For Production**: Add proper error logging, monitoring, and deployment configuration

### Useful Resources:
- 📖 Full Guide: `PROJECT_GUIDE.md`
- 🏗️ Architecture: `ARCHITECTURE_DIAGRAM.md`
- 🔧 Backend: Explore `backend/src/` structure
- 🎨 Frontend: Explore `client/src/` components

---

**Happy Coding! 🎉**

TaskOrbit provides a solid foundation for understanding modern full-stack development with React, Node.js, and MongoDB. The modular architecture makes it easy to understand and extend.