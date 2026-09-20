@echo off
setlocal enabledelayedexpansion
title 宿舍打印服务 —— QQ 机器人一键启动

rem ========================= 配置区（换机器只改这一段） =========================
set "QQ=1708345662"
set "ROOT=%~dp0"
set "NAPCAT_DIR=%ROOT%NapCatShell"
set "ONEBOT_WS_PORT=8085"
set "PYTHON=%ROOT%.venv\Scripts\python.exe"
rem ==============================================================================

echo ============================================
echo   宿舍打印服务 · QQ 机器人启动
echo   QQ=%QQ%   OneBot 端口=%ONEBOT_WS_PORT%
echo ============================================
echo.

echo [1/4] 检查 NapCat 的 OneBot 服务是否已在运行...
rem 用真实 TCP 连接探测：不解析 netstat 的文本格式，也不受端口号前缀干扰
call :probe_ws
if not errorlevel 1 (
    echo       已在运行，跳过启动 NapCat。
    goto :start_printbot
)

echo [2/4] 启动 NapCat（带 QQ 号=快速登录；没登过会弹二维码）...
if not exist "%NAPCAT_DIR%\launcher.bat" (
    echo       !! 找不到 "%NAPCAT_DIR%\launcher.bat"
    echo          请把脚本顶部的 NAPCAT_DIR 改成 NapCatShell 的实际路径。
    pause
    exit /b 1
)
start "NapCat" cmd /c ""%NAPCAT_DIR%\launcher.bat" %QQ%

echo [3/4] 等 OneBot 服务起来（最多 90 秒；需要先在 QQ 窗口登录）...
set /a tries=0
:wait_ws
rem 用 ping 当 sleep：Git Bash 等环境里 timeout 会被同名 GNU 程序抢走
ping -n 4 127.0.0.1 >nul
call :probe_ws
if not errorlevel 1 goto :ws_ready
set /a tries+=1
if !tries! lss 30 goto :wait_ws
echo       !! 90 秒还没等到端口 %ONEBOT_WS_PORT%。
echo          QQ 登录完成后重新运行本脚本即可（printbot 会自己重连）。
pause
exit /b 1

:ws_ready
echo       OneBot 服务已就绪。

:start_printbot
echo.
echo [4/4] 启动 printbot...
powershell -NoProfile -Command "exit @(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*printbot.bot*' }).Count" >nul 2>&1
if errorlevel 1 (
    echo       已经在跑了，不重复启动。
    goto :done
)
if not exist "%PYTHON%" (
    echo       !! 找不到 "%PYTHON%" —— 请改脚本顶部的 PYTHON，或先建好 .venv
    pause
    exit /b 1
)
start "printbot" /D "%ROOT%" "%PYTHON%" -m printbot.bot
echo       已在新窗口启动（关掉那个窗口就是停止 printbot）。

:done
echo.
echo 完成。要点：
echo   · NapCat 控制台和 QQ 窗口别关；QQ 掉线后它会等重连。
echo   · 停止：关掉 printbot 窗口 与 NapCat 窗口。
echo   · NapCat 管理页： http://127.0.0.1:6099
echo   · printbot 日志： printbot\logs\printbot.log
echo.
pause
exit /b 0

rem ---- 子过程：TCP 连接探测端口（通了 errorlevel=0，不通=1）----
:probe_ws
powershell -NoProfile -Command "$c = New-Object Net.Sockets.TcpClient; try { $c.Connect('127.0.0.1', %ONEBOT_WS_PORT%); exit 0 } catch { exit 1 } finally { $c.Dispose() }" >nul 2>&1
exit /b %errorlevel%
