# Content Marketing Agency CRM Portal 📊

This project is a comprehensive CRM portal for content marketing agencies built with React Admin. It provides tools for managing clients, projects, content pieces, and team members with role-based access control.

## Features

### 🔐 Authentication & Role Management
- Secure login/logout functionality
- Four distinct user roles:
  - **Admin**: Full access to all features
  - **Content Strategist**: Manages content projects
  - **Editor**: Reviews and approves content
  - **Writer**: Creates and submits content

### 👥 Client & Project Management
- Create, edit, and delete clients with details:
  - Name, industry, business goals
  - Assigned strategist
- Project lifecycle management:
  - Status tracking (Pending, In Progress, Completed, Published)
  - Client-project relationships

### ✍️ Content Management System (CMS)
- Content creation workflow:
  - Writers draft and submit content pieces
  - Editors review, provide feedback, and approve
  - Version history tracking
- Content types: Articles, blogs, social media posts

### 📊 Dashboard & Analytics
- Overview of active clients and projects
- Project completion rate tracking
- Chart-based insights using Recharts

## Technologies Used

- **Frontend**:
  - React.js
  - React Admin
  - Material-UI
  - Recharts

- **Backend**:
  - JSON Server
  - Express
  - JWT
  - Local storage

## Project Structure

```
ra-client/               # React Admin frontend
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   ├── clients/     # Client management components
│   │   ├── contentPieces/ # Content management components
│   │   ├── projects/    # Project management components
│   │   └── users/       # User management components
│   ├── Dashboard.jsx    # Main dashboard component
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── public/              # Public assets
└── package.json         # Frontend dependencies

ra-server/               # JSON Server backend
├── db.json              # Database file
├── auth.js              # Authentication middleware
└── json-server.js       # Server configuration
```

## Installation & Setup

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd ra-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file inside ra-server:
    ```bash
    SECRET_KEY=
    AUTH_PORT=
    JSON_SERVER_PORT=
    JSON_SERVER_URL=
    ```
4. Start JSON server:
   ```bash
   node json-server.js
   ```
   Server will run at http://localhost:(JSON_SERVER_PORT)
5. Start Auth server:
   ```bash
   node auth.js
   ```
   Server will run at http://localhost:(AUTH_PORT)

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ra-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file inside ra-client:
    ```bash
    VITE_JSON_SERVER_URL=
    VITE_AUTH_SERVER_URL=
    ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Access the application at http://localhost:5173

## Usage

1. **Login**:
   - Use the following demo credentials:
     - Admin: admin_user / password123
     - Content sarah_strategist / password123
     - Editor: mike_editor / password123
     - Writer: peter_writer / password123

2. **Dashboard**:
   - View project statistics
   - Monitor content pipeline
   - Track team activity

3. **Manage Clients**:
   - Add new clients with industry details
   - Assign strategists to clients
   - Track client-specific projects

4. **Content Workflow**:
   - Writers create and submit content
   - Editors review and approve content
   - Strategists manage content scheduling
   - View version history of content pieces

---