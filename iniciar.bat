@echo off
chcp 65001 >nul
cd /d "%~dp0"
docker info >nul 2>&1
if errorlevel 1 (
  echo O Docker Desktop nao esta rodando. Abrindo...
  start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
  echo Aguarde ele iniciar (icone da baleia) e rode este arquivo de novo.
  pause
  exit /b 1
)
docker compose up -d
timeout /t 4 /nobreak >nul
start http://127.0.0.1:5173
