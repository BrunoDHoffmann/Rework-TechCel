@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo   Instalacao do Rework Tec Cel (primeira vez)
echo   Isso pode levar alguns minutos.
echo ============================================================
echo.
docker info >nul 2>&1
if errorlevel 1 (
  echo [ERRO] O Docker Desktop nao esta em execucao.
  echo Abra o Docker Desktop, aguarde aparecer "Engine running"
  echo no canto inferior e rode este arquivo novamente.
  echo.
  pause
  exit /b 1
)
echo Construindo e iniciando o sistema...
docker compose up -d --build
if errorlevel 1 (
  echo.
  echo [ERRO] Falha ao iniciar. Verifique a conexao com a internet
  echo e tente novamente.
  pause
  exit /b 1
)
echo.
echo Pronto! Abrindo o sistema no navegador...
timeout /t 6 /nobreak >nul
start http://127.0.0.1:5173
echo.
echo Se a pagina nao carregar de primeira, aguarde 1 minuto e aperte F5.
pause
