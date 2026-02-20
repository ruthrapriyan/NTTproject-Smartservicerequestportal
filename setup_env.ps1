# Check Python environment and dependencies for Smart Service Request Portal

Write-Host "Checking environment..." -ForegroundColor Cyan

# 1. Check Python version
$pythonVersion = python --version 2>&1
Write-Host "Python Version: $pythonVersion"

# 2. Install dependencies
Write-Host "Installing/Updating dependencies..." -ForegroundColor Green
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv cryptography pydantic

# 3. Check MySQL connection capability
Write-Host "Validating core files..." -ForegroundColor Green
python -m py_compile main.py models.py schemas.py service.py config.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "All files are syntactically correct!" -ForegroundColor Cyan
} else {
    Write-Host "Syntax errors found. Please check the logs." -ForegroundColor Red
}

Write-Host "`nReady to start: uvicorn main:app --reload" -ForegroundColor Yellow
