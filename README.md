# Task Management Kanban App

A task management application with Kanban board and realtime collaboration, built as a personal project for Software Engineering portfolio.

## 🚀 Features
- User authentication (Register / Login)
- Create and manage Kanban boards
- Columns: Todo / In Progress / Done (customizable)
- Create, update, delete tasks
- Drag & drop tasks between columns
- Realtime collaboration with Socket.io
- Role-based access (Owner / Member)

## 🛠️ Tech Stack
### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

### Frontend (planned)
- React
- Tailwind CSS
- Drag & Drop (dnd-kit / react-beautiful-dnd)

## 📂 Project Structure
task-management-kanban-realtime/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── index.js
│ └── package.json
├── frontend/ (coming soon)
└── README.md


## 🧠 Database Design (MongoDB)
- User
- Board
- Column
- Task

Each board can have multiple columns, and each column contains multiple tasks.

## 📅 Development Roadmap
- Week 1–2: Project setup & Git workflow
- Week 3: Backend base (Express + MongoDB)
- Week 4: Authentication & Authorization
- Week 5: Board & Task API
- Week 6: Realtime with Socket.io
- Week 7–8: Frontend UI (Kanban board)
- Week 9: Testing & optimization
- Week 10: Deployment & documentation

## 🎯 Purpose
This project is built to:
- Practice full-stack web development
- Apply Software Engineering concepts
- Serve as a portfolio project for internship/junior positions

## 📌 Author
- Name: **Bùi Ngọc Thiệu**
- Major: Software Engineering