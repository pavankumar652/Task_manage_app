Mern secure Task Management Application
Project Overview

This is a Task Management Application built with the MERN stack (MongoDB, Express, React, Node.js).
It allows users to register, login, and manage tasks (create, update, view).

Current Status:

Frontend and backend are working properly.
All main features like task creation, updating, and viewing are functional.
Remaining issues: User registration/login may occasionally show errors like:
"next is not a function"
"Invalid email or password"
These are backend async/authentication issues being resolved.

Technologies Used :

Frontend: React.js, React Router DOM, Axios, Bootstrap.
Backend: Node.js, Express.js, MongoDB, Mongoose.
Authentication: JWT (JSON Web Tokens), bcrypt.js.
Middleware: Error handling (ErrorHandler), async wrapper (catchAsyncErrors).
Development Tools: VS Code, Postman, npm.

Project Structure:

TaskManagementApp/
│
├─ client/           # React frontend
│  ├─ src/
│  ├─ package.json
│  └─ ...
│
├─ server/           # Node.js backend
│  ├─ controllers/
│  │   └─ authController.js
│  ├─ models/
│  │   └─ userSchema.js
│  ├─ routes/
│  │   └─ authRoutes.js
│  ├─ middleware/
│  │   └─ error.js, catchAsyncErrors.js
│  ├─ database/
│  │   └─ dbConnection.js
│  ├─ server.js
│  └─ package.json

Setup Instructions:
1. Backend Setup
Navigate to the backend folder:
cd server
Install dependencies:
npm install

Create a .env file in server/ with the following variables:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server: npm start

The backend will run on http://localhost:4000.

2. Frontend Setup

Navigate to the frontend folder:
cd client
Install dependencies:
npm install
Start the React development server: npm start

The frontend will run on http://localhost:5173.

How to Use the Application

Open the frontend (http://localhost:5173).
Register a new user with a valid email and password.
Login with the registered credentials.
Create, view, and update tasks using the dashboard.
Known Issues / Notes:

Registration may occasionally show “Something went wrong” due to backend async handling.
Login may occasionally show “Invalid email or password” even after successful registration.
File upload functionality and modals have been removed to simplify the project.

Contact:

For any issues or questions, you can reach me at:
ppk152000@gmail.com