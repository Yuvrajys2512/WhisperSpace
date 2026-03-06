@echo off
echo ==========================================
echo Starting WhisperSpace Diagnostic Run
echo ==========================================

echo Current directory is: %CD%
pause

echo checking python...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python not found.
    pause
    exit /b
)
pause

echo checking node...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node not found.
    pause
    exit /b
)
pause

echo starting backend...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload --port 8000"
pause

echo starting frontend...
start cmd /k "cd frontend && npm install && npm run dev"
pause

echo All commands sent. 
pause
