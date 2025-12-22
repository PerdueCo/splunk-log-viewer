# 📊 Splunk Log Viewer (Node.js + React)

A tutorial-style, end-to-end **Splunk-inspired log viewer** built with a Node.js backend and a React frontend.

This project demonstrates **log ingestion, filtering, search, and visualization**, while intentionally documenting **real-world development issues, debugging steps, and resolutions** encountered during implementation.

> 🎯 Built as both a **working demo** and a **teaching reference** for interviews, meetups, and mentoring.

---

## 🚀 Features (v1.0 — Stable)

- Node.js + Express backend API  
- React frontend (Create React App)  
- Reads structured JSON logs from local filesystem  
- Search across **all columns** (timestamp, level, message)  
- Filter by log level (INFO / WARN / ERROR)  
- Color-coded severity levels  
- Safe CORS configuration (local dev only)  
- Clear separation of frontend and backend concerns  
- Windows-friendly setup with documented pitfalls & fixes  

---

## 🧠 Why This Project Exists

This project was built to:

- Demonstrate **full-stack fundamentals** (API + UI)
- Simulate **Splunk-style log exploration** in a lightweight way
- Practice **real debugging**, not just happy-path tutorials
- Provide a **step-by-step teaching artifact** showing:
  - Git & GitHub workflows
  - Windows permissions issues
  - React ↔ Node integration
  - Common setup and tooling problems with practical fixes

This is intentionally **not a black-box demo** — it’s meant to be explained.

---

## 🗂 Project Structure
```text
splunk-log-viewer/
│
├── backend/
│ ├── server.js # Express API
│ ├── logs.json # Sample log data
│ ├── package.json
│ └── package-lock.json
│
├── frontend/
│ ├── src/
│ │ └── App.js # React UI logic
│ ├── public/
│ ├── package.json
│ └── package-lock.json
│
├── .gitignore
└── README.md

```
---
## 🛠 Tech Stack

### Backend
- Node.js
- Express
- CORS (restricted to localhost)

### Frontend
- React
- Fetch API
- Basic CSS styling

### Tooling
- Git & GitHub
- npm
- Windows PowerShell

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express
- CORS (restricted to localhost)

### Frontend
- React
- Fetch API
- Basic CSS styling

### Tooling
- Git & GitHub
- npm
- Windows PowerShell

---

## ▶️ How to Run the Project Locally

### 1️⃣ Start the Backend (Always First)

```bash
cd backend
npm install
npm start
```
#### Backend runs at:
```bash
http://localhost:3001
```

#### Test the API directly:
```bash
curl http://127.0.0.1:3001/logs
```

###  2️⃣ Start the Frontend

#### Open a new terminal window:
