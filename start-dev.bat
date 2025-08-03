@echo off
echo 🏥 Starting Hospital Management System...
echo.

echo 🚀 Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend (Port 5174)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo 📊 Starting Dashboard (Port 5175)...
start "Dashboard" cmd /k "cd dashboard && npm run dev"

echo.
echo ✅ All services are starting...
echo 📱 Frontend: http://localhost:5174
echo 📊 Dashboard: http://localhost:5175
echo 🔧 Backend: http://localhost:4000 (API)
echo.
echo 💡 Close the terminal windows to stop services
pause