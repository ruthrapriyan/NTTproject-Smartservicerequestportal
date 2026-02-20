from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from typing import List, Optional
import sys
import os

# Ensure current directory is in sys.path for local imports
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

import models
import schemas
import service
import config

# Database setup
try:
    # First, try to create the database if it doesn't exist
    from sqlalchemy import text
    temp_engine = create_engine(config.BASE_URL)
    with temp_engine.connect() as conn:
        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {config.DB_NAME}"))
    temp_engine.dispose()
    
    # Now connect to the specific database
    engine = create_engine(config.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    print("Database and tables initialized successfully!")
except Exception as e:
    print(f"\n[!] DATABASE ERROR: {e}")
    print("[!] Ensure MySQL is running and your password in config.py is correct.\n")

app = FastAPI(title="Smart Service Request Portal")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Smart Service Request Portal API", "docs": "/docs"}

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login", response_model=schemas.LoginResponse)
def login(login_data: schemas.LoginRequest):
    # Dummy login implementation
    return {"access_token": "testtoken", "token_type": "bearer"}

@app.post("/requests", response_model=schemas.RequestResponse)
def create_request(request: schemas.RequestCreate, db: Session = Depends(get_db)):
    return service.create_request(db=db, request=request)

@app.get("/requests", response_model=List[schemas.RequestResponse])
def list_requests(
    category: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return service.get_requests(db=db, category=category, status=status, priority=priority)

@app.put("/requests/{request_id}/status", response_model=schemas.RequestResponse)
def update_status(request_id: int, status_update: schemas.RequestUpdate, db: Session = Depends(get_db)):
    try:
        db_request = service.update_request_status(db=db, request_id=request_id, status=status_update.status)
        if not db_request:
            raise HTTPException(status_code=404, detail="Request not found")
        return db_request
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    try:
        import uvicorn
        import fastapi
        import sqlalchemy
        import pymysql
    except ImportError as e:
        print(f"\n[!] ERROR: Missing dependency: {e.name}")
        print(f"[!] Current Python Interpreter: {sys.executable}")
        print("[!] Please run: .\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt")
        print("[!] Or run the setup script: .\\setup_env.ps1\n")
        sys.exit(1)
        
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
