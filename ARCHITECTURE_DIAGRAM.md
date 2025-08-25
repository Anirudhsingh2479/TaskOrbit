# TaskOrbit System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TaskOrbit Application                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐           ┌─────────────────────┐                  │
│  │   React Frontend    │    HTTP    │   Express Backend   │                  │
│  │   (Port 5173)      │◄──────────►│    (Port 8000)     │                  │
│  │                    │   REST API │                    │                  │
│  │  • Components      │            │  • Controllers     │                  │
│  │  • Pages           │            │  • Services        │                  │
│  │  • State Mgmt      │            │  • Middleware      │                  │
│  │  • Routing         │            │  • Authentication  │                  │
│  └─────────────────────┘            └─────────────────────┘                  │
│                                              │                              │
│                                              │ Mongoose                     │
│                                              ▼                              │
│                                     ┌─────────────────────┐                  │
│                                     │   MongoDB Database  │                  │
│                                     │                    │                  │
│                                     │  • Users           │                  │
│                                     │  • Workspaces      │                  │
│                                     │  • Projects        │                  │
│                                     │  • Tasks           │                  │
│                                     │  • Members         │                  │
│                                     │  • Roles           │                  │
│                                     └─────────────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            User Request Flow                                  │
└──────────────────────────────────────────────────────────────────────────────┘

User Action (Frontend) 
       │
       ▼
┌─────────────────┐
│ React Component │ ──────► Form Validation (Zod)
└─────────────────┘              │
       │                         ▼
       ▼                   ┌─────────────────┐
┌─────────────────┐        │ API Call (Axios)│
│ TanStack Query  │◄───────┴─────────────────┘
└─────────────────┘              │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Express Route   │
       │                  └─────────────────┘
       │                         │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Auth Middleware │ ──► Session Check
       │                  └─────────────────┘
       │                         │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Controller      │ ──► Request Validation
       │                  └─────────────────┘
       │                         │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Service Layer   │ ──► Business Logic
       │                  └─────────────────┘
       │                         │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Database (ORM)  │ ──► MongoDB Operations
       │                  └─────────────────┘
       │                         │
       │                         ▼
       │                  ┌─────────────────┐
       │                  │ Response        │
       └──────────────────┴─────────────────┘
```

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Database Entity Relationships                       │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │    User     │
                    │ ─────────── │
                    │ _id         │
                    │ name        │
                    │ email       │
                    │ password    │
                    │ currentWork │
                    └─────────────┘
                           │
                           │ 1:M (created workspaces)
                           ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Member    │     │ Workspace   │     │   Project   │
│ ─────────── │     │ ─────────── │     │ ─────────── │
│ userId      │────►│ _id         │────►│ _id         │
│ workspaceId │     │ name        │     │ name        │
│ role        │     │ description │     │ emoji       │
│ joinedAt    │     │ owner       │     │ description │
└─────────────┘     │ inviteCode  │     │ workspace   │
                    └─────────────┘     │ createdBy   │
                           │            └─────────────┘
                           │ M:M (members)      │
                           │                   │ 1:M
                           ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐
                    │    Role     │     │    Task     │
                    │ ─────────── │     │ ─────────── │
                    │ _id         │     │ _id         │
                    │ name        │     │ taskCode    │
                    │ permissions │     │ title       │
                    └─────────────┘     │ description │
                                       │ project     │
                                       │ workspace   │
                                       │ status      │
                                       │ priority    │
                                       │ assignedTo  │
                                       │ createdBy   │
                                       │ dueDate     │
                                       └─────────────┘

Relationships:
• User ←→ Workspace: Many-to-Many (through Member)
• User → Workspace: One-to-Many (owner)
• Workspace → Project: One-to-Many
• Project → Task: One-to-Many
• User → Task: One-to-Many (assignedTo, createdBy)
• Member → Role: Many-to-One
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Authentication Flow                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐                 ┌─────────────────┐
│ Local Auth Flow │                 │ Google OAuth    │
└─────────────────┘                 └─────────────────┘
        │                                   │
        ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│ 1. User submits │                 │ 1. User clicks  │
│    credentials  │                 │    "Google Sign"│
└─────────────────┘                 └─────────────────┘
        │                                   │
        ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│ 2. Validate     │                 │ 2. Redirect to  │
│    with bcrypt  │                 │    Google OAuth │
└─────────────────┘                 └─────────────────┘
        │                                   │
        ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│ 3. Create       │                 │ 3. Google       │
│    session      │                 │    callback     │
└─────────────────┘                 └─────────────────┘
        │                                   │
        │                                   ▼
        │                           ┌─────────────────┐
        │                           │ 4. Create/find  │
        │                           │    user account │
        │                           └─────────────────┘
        │                                   │
        └─────────────┬─────────────────────┘
                      ▼
              ┌─────────────────┐
              │ 5. Set session  │
              │    cookie       │
              └─────────────────┘
                      │
                      ▼
              ┌─────────────────┐
              │ 6. Redirect to  │
              │    dashboard    │
              └─────────────────┘

Session Management:
• Express-session with MongoDB store
• HTTP-only cookies
• CSRF protection
• Session expiration
```

## Permission System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Role-Based Access Control                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────────────────────────────────────────────────┐
│   OWNER     │    │                  PERMISSIONS                            │
│ (Creator)   │───►│ • CREATE/DELETE WORKSPACE                              │
└─────────────┘    │ • MANAGE ALL MEMBERS                                   │
                   │ • ALL PROJECT OPERATIONS                               │
┌─────────────┐    │ • ALL TASK OPERATIONS                                  │
│   ADMIN     │    │ • WORKSPACE SETTINGS                                   │
│ (Manager)   │───►├─────────────────────────────────────────────────────────┤
└─────────────┘    │ • ADD MEMBERS                                          │
                   │ • MANAGE PROJECTS                                      │
┌─────────────┐    │ • MANAGE TASKS                                         │
│   MEMBER    │    │ • WORKSPACE SETTINGS                                   │
│ (Worker)    │───►├─────────────────────────────────────────────────────────┤
└─────────────┘    │ • VIEW ONLY                                            │
                   │ • CREATE/EDIT TASKS (limited)                         │
                   └─────────────────────────────────────────────────────────┘

Permission Check Flow:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ API Request     │───►│ Get User Role   │───►│ Check Required  │
│                 │    │ in Workspace    │    │ Permissions     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                      │
                                               ┌──────┴──────┐
                                               ▼             ▼
                                        ┌─────────────┐ ┌─────────────┐
                                        │  Allow      │ │  Deny       │
                                        │  Request    │ │  (401/403)  │
                                        └─────────────┘ └─────────────┘
```

## Component Architecture (Frontend)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           React Component Structure                          │
└─────────────────────────────────────────────────────────────────────────────┘

                            ┌─────────────────┐
                            │      App        │
                            │  (Main Router)  │
                            └─────────────────┘
                                     │
                     ┌───────────────┼───────────────┐
                     ▼               ▼               ▼
              ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
              │ AuthLayout  │ │ BaseLayout  │ │  AppLayout  │
              │ (Login/Reg) │ │ (Landing)   │ │ (Dashboard) │
              └─────────────┘ └─────────────┘ └─────────────┘
                                                     │
                          ┌──────────────────────────┼──────────────────────────┐
                          ▼                          ▼                          ▼
                  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
                  │ Workspace   │           │  Projects   │           │   Tasks     │
                  │ Dashboard   │           │    Page     │           │    Page     │
                  └─────────────┘           └─────────────┘           └─────────────┘
                                                   │
                                    ┌──────────────┼──────────────┐
                                    ▼              ▼              ▼
                            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                            │ ProjectCard │ │CreateProject│ │EditProject  │
                            │ Component   │ │    Form     │ │    Form     │
                            └─────────────┘ └─────────────┘ └─────────────┘

State Management:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ TanStack Query  │    │    Zustand      │    │ React Context   │
│ (Server State)  │    │ (Client State)  │    │ (Auth State)    │
│                 │    │                 │    │                 │
│ • API Caching   │    │ • UI State      │    │ • User Data     │
│ • Mutations     │    │ • Form State    │    │ • Session Info  │
│ • Background    │    │ • Preferences   │    │ • Auth Status   │
│   Refetch       │    └─────────────────┘    └─────────────────┘
└─────────────────┘
```

This architecture provides a clear separation of concerns, making the application maintainable and scalable.