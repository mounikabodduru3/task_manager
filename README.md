# 📋 Task Manager App

A full-stack Task Management application built with a scalable backend and a simple frontend UI. This project demonstrates authentication, role-based access control, and CRUD operations.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication

### 🛡️ Authorization
- Role-based access (User / Admin)
- Protected routes using middleware

### 📦 Task Management
- Create, Read, Update, Delete (CRUD) tasks
- Users can manage their own tasks
- Admin can view all tasks

### 🎨 Frontend
- Login & Register UI
- Dashboard with task management
- Dark Mode 🌙
- Toast Notifications 🔔
- Responsive & clean UI

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

### Frontend
- React (Vite)
- Axios
- CSS (custom styling)

---

## 📁 Project Structure

task-manager-app/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── app.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── pages/
│ └── App.jsx
└── package.json


---


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-link>
cd task-manager-app

2️⃣ Backend Setup
cd backend
npm install
npm run dev

👉 Runs on: http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

👉 Runs on: http://localhost:5173

🔑 API Endpoints
Auth
POST /api/v1/auth/register → Register user
POST /api/v1/auth/login → Login user
Tasks (Protected)
GET /api/v1/tasks → Get tasks
POST /api/v1/tasks → Create task
PUT /api/v1/tasks/:id → Update task
DELETE /api/v1/tasks/:id → Delete task
🔐 Authentication Flow
User logs in → receives JWT token
Token stored in frontend (localStorage)
Token sent in headers for protected routes:
Authorization: Bearer <token>
