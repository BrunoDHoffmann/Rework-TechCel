@echo off
chcp 65001 >nul
cd /d "%~dp0"
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HHmm"') do set DATA=%%i
echo Gerando backup do banco de dados...
docker exec rework_db pg_dump -U postgres -f /tmp/backup.sql rework
if errorlevel 1 (
  echo [ERRO] Nao foi possivel gerar o backup. O sistema esta rodando?
  pause
  exit /b 1
)
docker cp rework_db:/tmp/backup.sql "backup_rework_%DATA%.sql"
echo.
echo Backup salvo em: backup_rework_%DATA%.sql
echo Guarde esse arquivo em local seguro (nuvem, pen drive, etc).
pause
