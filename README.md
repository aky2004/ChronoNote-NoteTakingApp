📒 ChronoNotesApp

ChronoNotesApp is a full-stack note-taking application that enables users to register, log in, and manage their notes with ease. Built with a Node.js/Express backend and a modern React frontend powered by Vite, it offers a clean, responsive user experience.

🚀 Features

  🔐 User Authentication — Register, login, and manage sessions securely.
  📝 CRUD Operations — Create, read, update, and delete personal notes.
  🎨 Responsive UI — Mobile-friendly and easy to navigate.
  ⚛️ State Management — Powered by Redux Toolkit.
  🔒 Protected Routes — Secure access to user-specific content.
  
🛠️ Technologies Used

🔧 Backend
    Node.js + Express
    MongoDB + Mongoose
    JWT for authentication
    bcryptjs for password hashing
    dotenv for environment configuration
    cookie-parser & cors middleware
💻 Frontend
    React 18 + Vite
    React Router DOM for routing
    Redux Toolkit for state management
    Bootstrap for UI styling
📦 Prerequisites
    Node.js (v16 or later)
    npm (comes with Node.js)
    MongoDB instance (local or cloud)
    
⚙️ Installation
    🔙 Backend Setup
        Navigate to the backend folder:
        cd Backend
        Install dependencies:
        npm install
        Create a .env file:
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
    🔜 Frontend Setup
        Navigate to the frontend folder:
        cd Frontend
        Install dependencies:
        npm install
        ▶️ Running the Application
        
  🖥️ Start Backend
    From the Backend/ directory:
    npm run dev
    Runs the backend server at http://localhost:5000 (or the port defined in your .env).
  
  🌐 Start Frontend
    From the Frontend/ directory:
    npm run dev
    Opens the app in your browser at http://localhost:5173
