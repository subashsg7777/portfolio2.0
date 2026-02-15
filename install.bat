@echo off
echo Installing Subash Portfolio...
echo.

echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing root dependencies
    pause
    exit /b 1
)

echo.
echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies
    pause
    exit /b 1
)

cd ..
echo.
echo Installation complete!
echo.
echo To start the development server, run: npm run dev
echo.
pause

