# TaskOrbit - Complete Project Understanding Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Data Models and Relationships](#data-models-and-relationships)
6. [Authentication System](#authentication-system)
7. [Core Features Deep Dive](#core-features-deep-dive)
8. [API Architecture](#api-architecture)
9. [Frontend Architecture](#frontend-architecture)
10. [Role-Based Access Control](#role-based-access-control)
11. [Development Workflow](#development-workflow)
12. [Extending the Project](#extending-the-project)

---

## Project Overview

**TaskOrbit** is a modern, full-stack task management and team collaboration platform. It enables teams to:
- Create and manage workspaces
- Organize work into projects
- Create, assign, and track tasks
- Collaborate with team members
- Control access through role-based permissions

### Key Characteristics
- **Multi-tenant**: Multiple workspaces per user
- **Role-based**: Different permission levels (Owner, Admin, Member)
- **Real-time collaboration**: Team-based task management
- **Scalable architecture**: Separation of concerns with service layers

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local + Google OAuth)
- **Validation**: Zod schema validation
- **Session Management**: Express-session
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Environment**: Development/Production configs

---

## Project Structure

```
TaskOrbit/
├── backend/                    # Node.js/Express API server
│   ├── src/
│   │   ├── config/            # App configuration (database, passport, etc.)
│   │   ├── controllers/       # Route handlers/business logic
│   │   ├── middlewares/       # Custom middleware (auth, error handling)
│   │   ├── models/           # MongoDB/Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # Helper functions and utilities
│   │   ├── validation/       # Zod validation schemas
│   │   ├── enums/            # Application constants
│   │   ├── seeders/          # Database seeders
│   │   └── index.js          # Application entry point
│   ├── package.json
│   └── .env.sample
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── routes/          # Routing configuration
│   │   ├── layout/          # Layout components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API client
│   │   ├── context/         # React context providers
│   │   └── assets/          # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials (optional, for Google sign-in)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.sample .env
   ```
   
   Edit `.env` with your configurations:
   ```env
   PORT=8000
   NODE_ENV=development
   MONGO_URI="mongodb://localhost:27017/taskorbit"
   SESSION_SECRET="your_session_secret_key"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   GOOGLE_CALLBACK_URL="http://localhost:8000/api/auth/google/callback"
   FRONTEND_ORIGIN="http://localhost:5173"
   ```

4. **Seed the database with roles**:
   ```bash
   npm run seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.sample .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_BASE_URL="http://localhost:8000/api"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

---

## Data Models and Relationships

### Core Entities

#### 1. User Model (`user.model.js`)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  currentWorkspace: ObjectId (ref: Workspace),
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

#### 2. Workspace Model (`workspace.model.js`)
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (ref: User),
  inviteCode: String (unique),
  timestamps: true
}
```

#### 3. Project Model (`project.model.js`)
```javascript
{
  name: String,
  emoji: String (default: "📊"),
  description: String,
  workspace: ObjectId (ref: Workspace),
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

#### 4. Task Model (`task.model.js`)
```javascript
{
  taskCode: String (unique, auto-generated),
  title: String,
  description: String,
  project: ObjectId (ref: Project),
  workspace: ObjectId (ref: Workspace),
  status: Enum (BACKLOG, TODO, IN_PROGRESS, IN_REVIEW, DONE),
  priority: Enum (LOW, MEDIUM, HIGH),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  dueDate: Date,
  timestamps: true
}
```

#### 5. Member Model (`member.model.js`)
```javascript
{
  userId: ObjectId (ref: User),
  workspaceId: ObjectId (ref: Workspace),
  role: ObjectId (ref: Role),
  joinedAt: Date,
  timestamps: true
}
```

### Relationships
- **User → Workspace**: Many-to-Many (through Member)
- **Workspace → Projects**: One-to-Many
- **Project → Tasks**: One-to-Many
- **User → Tasks**: One-to-Many (created/assigned)

---

## Authentication System

### Authentication Flow

#### 1. Local Authentication
```javascript
// Registration
POST /api/auth/register
{
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword"
}

// Login
POST /api/auth/login
{
  email: "john@example.com",
  password: "securepassword"
}
```

#### 2. Google OAuth
```javascript
// Initiate Google OAuth
GET /api/auth/google

// Google callback
GET /api/auth/google/callback
```

### Session Management
- **Express-session** for server-side session storage
- **Passport.js** for authentication strategies
- **Cookie-based** sessions with HTTP-only cookies

### Frontend Authentication State
```javascript
// Custom hook for authentication
const useAuth = () => {
  // Returns user data, loading state, login/logout functions
};

// Protected routes
<ProtectedRoute>
  <WorkspaceDashboard />
</ProtectedRoute>
```

---

## Core Features Deep Dive

### 1. Workspace Management

#### Creating a Workspace
```javascript
// Backend Service
export const createWorkspaceService = async (name, description, user) => {
  // Create workspace
  const workspace = new WorkspaceModel({
    name,
    description,
    owner: user._id,
    inviteCode: generateInviteCode()
  });
  
  // Create owner membership
  const member = new MemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id
  });
  
  // Update user's current workspace
  user.currentWorkspace = workspace._id;
};
```

#### Frontend Integration
```javascript
// React component
const CreateWorkspaceForm = () => {
  const { mutate: createWorkspace } = useMutation({
    mutationFn: createWorkspaceMutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['workspaces']);
      navigate(`/workspace/${data.workspace._id}`);
    }
  });
};
```

### 2. Project Management

#### Project Structure
- Projects belong to workspaces
- Include emoji, name, description
- Track creation metadata

#### Creating Projects
```javascript
// Validation
const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  emoji: z.string().optional()
});

// Service
export const createProjectService = async (userId, workspaceId, body) => {
  const project = new ProjectModel({
    ...body,
    workspace: workspaceId,
    createdBy: userId
  });
  return project.save();
};
```

### 3. Task Management

#### Task Lifecycle
1. **BACKLOG** → 2. **TODO** → 3. **IN_PROGRESS** → 4. **IN_REVIEW** → 5. **DONE**

#### Task Creation
```javascript
// Task with auto-generated code
const task = new TaskModel({
  taskCode: generateTaskCode(), // AUTO-GENERATED
  title: "Implement user authentication",
  description: "Add login/register functionality",
  project: projectId,
  workspace: workspaceId,
  status: TaskStatusEnum.TODO,
  priority: TaskPriorityEnum.HIGH,
  assignedTo: userId,
  createdBy: currentUserId,
  dueDate: new Date('2024-12-31')
});
```

### 4. Member Management

#### Inviting Members
```javascript
// Generate invite link
const inviteCode = workspace.inviteCode;
const inviteUrl = `${FRONTEND_ORIGIN}/invite/${inviteCode}`;

// Join workspace via invite
export const joinWorkspaceByInviteService = async (inviteCode, userId) => {
  const workspace = await WorkspaceModel.findOne({ inviteCode });
  // Add user as member with default role
};
```

---

## API Architecture

### RESTful Endpoints

#### Authentication Routes (`/api/auth`)
```javascript
POST   /register              // User registration
POST   /login                 // User login
POST   /logout                // User logout
GET    /google                // Google OAuth initiation
GET    /google/callback       // Google OAuth callback
```

#### User Routes (`/api/user`)
```javascript
GET    /profile               // Get current user profile
PUT    /profile               // Update user profile
```

#### Workspace Routes (`/api/workspace`)
```javascript
GET    /                      // Get user workspaces
POST   /                      // Create workspace
GET    /:id                   // Get workspace details
PUT    /:id                   // Update workspace
GET    /:id/analytics         // Get workspace analytics
GET    /:id/members           // Get workspace members
```

#### Project Routes (`/api/project`)
```javascript
GET    /workspace/:workspaceId          // Get workspace projects
POST   /workspace/:workspaceId          // Create project
GET    /workspace/:workspaceId/:id      // Get project details
PUT    /workspace/:workspaceId/:id      // Update project
DELETE /workspace/:workspaceId/:id      // Delete project
GET    /workspace/:workspaceId/:id/analytics // Project analytics
```

#### Task Routes (`/api/task`)
```javascript
GET    /project/:projectId              // Get project tasks
POST   /project/:projectId              // Create task
GET    /:id                            // Get task details
PUT    /:id                            // Update task
DELETE /:id                            // Delete task
```

### Middleware Chain
```javascript
app.use(express.json());              // Parse JSON bodies
app.use(session(sessionConfig));      // Session management
app.use(passport.initialize());       // Initialize Passport
app.use(passport.session());          // Passport session
app.use(cors(corsConfig));           // CORS configuration
app.use(isAuthenticated);            // Authentication middleware
app.use(errorHandler);               // Global error handler
```

### Error Handling
```javascript
// Custom error classes
class NotFoundException extends AppError {
  constructor(message) {
    super(message, HTTPSTATUS.NOT_FOUND, ErrorCodeEnum.RESOURCE_NOT_FOUND);
  }
}

// Global error handler
export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode
    });
  }
  // Handle other errors...
};
```

---

## Frontend Architecture

### Component Structure
```
components/
├── ui/                    # Base UI components (Button, Input, etc.)
├── workspace/            # Workspace-specific components
│   ├── project/         # Project management components
│   ├── task/           # Task management components
│   └── member/         # Member management components
└── common/              # Shared components
```

### State Management Patterns

#### 1. Server State (TanStack Query)
```javascript
// Fetch workspace data
const { data: workspaces, isLoading } = useQuery({
  queryKey: ['workspaces'],
  queryFn: fetchWorkspaces
});

// Create workspace mutation
const { mutate: createWorkspace } = useMutation({
  mutationFn: createWorkspaceMutationFn,
  onSuccess: () => {
    queryClient.invalidateQueries(['workspaces']);
  }
});
```

#### 2. Client State (Zustand)
```javascript
// Example store
const useWorkspaceStore = create((set) => ({
  currentWorkspace: null,
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  clearCurrentWorkspace: () => set({ currentWorkspace: null })
}));
```

### Form Handling
```javascript
// React Hook Form + Zod validation
const form = useForm({
  resolver: zodResolver(createProjectSchema),
  defaultValues: {
    name: "",
    description: "",
    emoji: "📊"
  }
});

const onSubmit = (data) => {
  createProject({ ...data, workspaceId });
};
```

### Routing Structure
```javascript
// Protected routes
const protectedRoutePaths = [
  { path: "/workspace", element: <WorkspaceRedirect /> },
  { path: "/workspace/:workspaceId", element: <WorkspaceDashboard /> },
  { path: "/workspace/:workspaceId/tasks", element: <Tasks /> },
  { path: "/workspace/:workspaceId/projects/:projectId", element: <ProjectDetails /> }
];
```

---

## Role-Based Access Control

### Permission System

#### Roles and Permissions
```javascript
// Role hierarchy
const Roles = {
  OWNER: "OWNER",     // Full access
  ADMIN: "ADMIN",     // Management access
  MEMBER: "MEMBER"    // Limited access
};

// Permission matrix
const RolePermissions = {
  OWNER: [
    // Workspace permissions
    "CREATE_WORKSPACE", "EDIT_WORKSPACE", "DELETE_WORKSPACE",
    // Member permissions
    "ADD_MEMBER", "CHANGE_MEMBER_ROLE", "REMOVE_MEMBER",
    // Project permissions
    "CREATE_PROJECT", "EDIT_PROJECT", "DELETE_PROJECT",
    // Task permissions
    "CREATE_TASK", "EDIT_TASK", "DELETE_TASK",
    "VIEW_ONLY"
  ],
  ADMIN: [
    "ADD_MEMBER", "CREATE_PROJECT", "EDIT_PROJECT", "DELETE_PROJECT",
    "CREATE_TASK", "EDIT_TASK", "DELETE_TASK", "VIEW_ONLY"
  ],
  MEMBER: [
    "VIEW_ONLY", "CREATE_TASK", "EDIT_TASK"
  ]
};
```

#### Permission Guards
```javascript
// Backend middleware
export const roleGuard = (role, requiredPermissions) => {
  const permissions = RolePermissions[role];
  const hasPermission = requiredPermissions.every(permission =>
    permissions.includes(permission)
  );
  
  if (!hasPermission) {
    throw new UnauthorizedException("Insufficient permissions");
  }
};

// Usage in controllers
export const createProjectController = asyncHandler(async (req, res) => {
  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.CREATE_PROJECT]);
  // ... proceed with project creation
});
```

#### Frontend Permission Checks
```javascript
// Custom hook for permission checking
const usePermissions = () => {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();
  
  const hasPermission = (permission) => {
    const userRole = getUserRoleInWorkspace(user, currentWorkspace);
    return RolePermissions[userRole]?.includes(permission);
  };
  
  return { hasPermission };
};

// Conditional rendering
const ProjectActions = () => {
  const { hasPermission } = usePermissions();
  
  return (
    <div>
      {hasPermission('CREATE_PROJECT') && (
        <CreateProjectButton />
      )}
      {hasPermission('EDIT_PROJECT') && (
        <EditProjectButton />
      )}
    </div>
  );
};
```

---

## Development Workflow

### Adding a New Feature

#### 1. Backend Development
```bash
# 1. Create model (if needed)
# backend/src/models/feature.model.js

# 2. Create validation schema
# backend/src/validation/feature.validation.js

# 3. Create service layer
# backend/src/services/feature.service.js

# 4. Create controller
# backend/src/controllers/feature.controller.js

# 5. Create routes
# backend/src/routes/feature.route.js

# 6. Register routes in index.js
```

#### 2. Frontend Development
```bash
# 1. Create API functions
# client/src/lib/api/feature.js

# 2. Create components
# client/src/components/feature/

# 3. Create pages
# client/src/pages/feature/

# 4. Add routes
# client/src/routes/common/routes.jsx

# 5. Add navigation
```

### Testing Strategy
```javascript
// Backend testing (recommended)
describe('Feature Service', () => {
  test('should create feature successfully', async () => {
    const result = await createFeatureService(data);
    expect(result).toBeDefined();
  });
});

// Frontend testing (recommended)
describe('FeatureComponent', () => {
  test('renders correctly', () => {
    render(<FeatureComponent />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
  });
});
```

---

## Extending the Project

### Common Extension Points

#### 1. Adding New Task Status
```javascript
// 1. Update enum
export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO", 
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  BLOCKED: "BLOCKED",        // NEW STATUS
  DONE: "DONE"
};

// 2. Update frontend UI
const statusConfig = {
  BLOCKED: { color: 'red', label: 'Blocked' }
};
```

#### 2. Adding File Attachments
```javascript
// 1. Update task model
const taskSchema = new Schema({
  // ... existing fields
  attachments: [{
    filename: String,
    url: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
  }]
});

// 2. Add file upload API
POST /api/task/:id/attachments

// 3. Add frontend file upload component
<FileUpload onUpload={handleFileUpload} />
```

#### 3. Adding Real-time Updates
```javascript
// 1. Install Socket.io
npm install socket.io socket.io-client

// 2. Setup backend socket server
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('join-workspace', (workspaceId) => {
    socket.join(workspaceId);
  });
});

// 3. Frontend socket integration
const socket = io(API_BASE_URL);
useEffect(() => {
  socket.on('task-updated', (task) => {
    queryClient.setQueryData(['tasks'], (old) => ({
      ...old,
      tasks: old.tasks.map(t => t._id === task._id ? task : t)
    }));
  });
}, []);
```

#### 4. Adding Team Comments
```javascript
// 1. Create comment model
const commentSchema = new Schema({
  content: String,
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamps: true
});

// 2. Add comment APIs
GET    /api/task/:id/comments
POST   /api/task/:id/comments
PUT    /api/comment/:id
DELETE /api/comment/:id

// 3. Frontend comment component
<CommentSection taskId={taskId} />
```

### Performance Optimizations

#### 1. Database Indexing
```javascript
// Add indexes for frequently queried fields
taskSchema.index({ workspace: 1, status: 1 });
taskSchema.index({ assignedTo: 1, dueDate: 1 });
projectSchema.index({ workspace: 1 });
```

#### 2. Frontend Code Splitting
```javascript
// Lazy load components
const ProjectDetails = lazy(() => import('../pages/ProjectDetails'));

// Route-based code splitting
<Route 
  path="/workspace/:id/projects/:projectId" 
  element={
    <Suspense fallback={<Loading />}>
      <ProjectDetails />
    </Suspense>
  } 
/>
```

#### 3. API Optimization
```javascript
// Implement pagination
const getTasks = async (projectId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return TaskModel.find({ project: projectId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

// Add data aggregation
const getWorkspaceAnalytics = async (workspaceId) => {
  return TaskModel.aggregate([
    { $match: { workspace: workspaceId } },
    { $group: {
      _id: '$status',
      count: { $sum: 1 }
    }}
  ]);
};
```

---

## Conclusion

TaskOrbit is a well-structured, scalable task management platform that demonstrates modern full-stack development practices. The modular architecture, role-based permissions, and clean separation of concerns make it an excellent foundation for building team collaboration tools.

### Key Takeaways:
1. **Modular Architecture**: Clear separation between models, services, controllers, and routes
2. **Security**: Proper authentication, authorization, and input validation
3. **Scalability**: Service layer pattern and database relationships support growth
4. **User Experience**: Modern React patterns with proper state management
5. **Maintainability**: TypeScript-like validation with Zod, consistent error handling

This guide provides a comprehensive foundation for understanding, running, and extending the TaskOrbit project. Each section builds upon the previous ones to give you a complete picture of how this collaborative task management platform works.