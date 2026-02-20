# NTTproject-Smartservicerequestportal
.# Smart Service Request Portal

A modern, full-stack service request management system built with FastAPI and Remix.

## 🚀 Project Overview

The Smart Service Request Portal is designed to streamline the process of creating, managing, and tracking service requests. It features a clean, responsive UI and a robust, scalable backend.

## 🛠️ Tech Stack

### Backend (`smartapi`)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: MySQL (via PyMySQL)
- **Validation**: [Pydantic](https://docs.pydantic.dev/)

### Frontend (`smartui`)
- **Framework**: [Remix](https://remix.run/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Runtime**: Node.js v20+

## 📁 Project Structure

```text
ruthrasmart/
├── smartapi/           # FastAPI Backend
│   ├── main.py         # Entry point & API routes
│   ├── models.py       # SQL Alchemy models
│   ├── schemas.py      # Pydantic schemas
│   ├── service.py      # Business logic
│   └── requirements.txt # Python dependencies
├── smartui/            # Remix Frontend
│   ├── app/            # Application logic & routes
│   ├── package.json    # Node dependencies & scripts
│   └── vite.config.ts  # Vite configuration
└── README.md           # Project documentation
```

## ⚙️ Getting Started

### Backend Setup (`smartapi`)

1. **Navigate to the directory**:
   ```bash
   cd smartapi
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Configuration**:
   - Ensure MySQL is running.
   - Update `config.py` with your database credentials.

5. **Run the server**:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000` and documentation at `http://localhost:8000/docs`.

### Frontend Setup (`smartui`)

1. **Navigate to the directory**:
   ```bash
   cd smartui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## ✨ Features

- **User Authentication**: Secure login system.
- **Request Management**: Create, view, and list service requests.
- **Filtering**: Filter requests by category, status, and priority.
- **Responsive Design**: Modern UI that works across all devices.
- **Automated DB Setup**: Backend automatically initializes the database and tables on startup.

