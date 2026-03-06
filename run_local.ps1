# WhisperSpace Local Runner
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Starting WhisperSpace Local Dev Environment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$CurrentDir = Get-Location
Write-Host "Current Directory: $CurrentDir"

# Start Backend
Write-Host "[1/2] Starting Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\backend'; if (-not (Test-Path venv)) { python -m venv venv }; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn main:app --reload --port 8000"

# Start Frontend
Write-Host "[2/2] Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\frontend'; npm install; npm run dev"

Write-Host ""
Write-Host "Both windows are opening. Visit http://localhost:3000 when ready." -ForegroundColor Green
Read-Host "Press Enter to exit this window..."
