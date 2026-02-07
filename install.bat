@echo off
REM UX Debt Detector V4 - Windows Installation Script
REM Run this in Command Prompt or PowerShell

echo ============================================
echo UX Debt Detector V4 - Automated Installer
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org
    pause
    exit /b 1
)

echo Node.js found: 
node -v
echo.

REM Create project directory
set PROJECT_NAME=ux-debt-detector-v4

echo Creating project directory: %PROJECT_NAME%
if exist %PROJECT_NAME% (
    echo WARNING: Directory already exists!
    echo Delete it and continue? (Y/N)
    set /p choice=
    if /i "%choice%"=="Y" (
        rmdir /s /q %PROJECT_NAME%
        echo Removed existing directory
    ) else (
        echo Installation cancelled
        pause
        exit /b 1
    )
)

mkdir %PROJECT_NAME%
cd %PROJECT_NAME%

echo Created directory
echo.

REM Create directory structure
echo Creating directory structure...
mkdir app\api\analyze
mkdir app\api\generate-pdf
mkdir app\api\generate-csv
mkdir components\ui
mkdir components\sections
mkdir lib
mkdir public

echo Directory structure created
echo.

REM You'll need to copy the package.json and other files manually
REM or download them from the provided links

echo ============================================
echo Installation script complete!
echo.
echo NEXT STEPS:
echo 1. Download all files from the chat
echo 2. Place them in the correct directories
echo 3. Run: npm install
echo 4. Run: npm run dev
echo 5. Visit: http://localhost:3000
echo ============================================
echo.

pause
