@echo off
setlocal enabledelayedexpansion
title 打印服务 —— 一键启动（网页服务 + QQ 机器人）

rem ========================= 配置区（换机器只改这一段） =========================
set "QQ=1708345662"
set "ROOT=%~dp0"
set "NAPCAT_DIR=%ROOT%NapCatShell"
set "WEB_PORT=8080"
set "ONEBOT_WS_PORT=8085"
set "PYTHON=%ROOT%.venv\Scripts\python.exe"
rem 本机跑不跑 printbot（QQ 与网页服务之间的桥）。机器人单独放别的机器时改成 0。
set "START_PRINTBOT=1"
rem ==============================================================================

echo ============================================
echo   打印服务 · 一键启动
echo   网页服务 :%WEB_PORT%    OneBot :%ONEBOT_WS_PORT%    QQ=%QQ%
echo ============================================
echo.

echo [1/4] 网页服务（Flask）...
rem 一律用真实 TCP 连接探测：不解析 netstat 的文本格式（列宽一变就错），
rem 也不受端口号前缀干扰（8080 与 80801 那种）。
call :probe %WEB_PORT%
if not errorlevel 1 (
    echo       已在运行，不重复启动。
    goto :napcat
)
if not exist "%PYTHON%" (
    echo       !! 找不到 "%PYTHON%" —— 请改脚本顶部的 PYTHON，或先建好 .venv
    pause
    exit /b 1
)
rem /D 指定工作目录：app.py 是扁平布局、按裸名导入，必须在项目根启动
start "打印服务 %WEB_PORT%" /D "%ROOT%" "%PYTHON%" app.py
echo       等它起来（最多 60 秒）...
set /a tries=0
:wait_web
ping -n 4 127.0.0.1 >nul
call :probe %WEB_PORT%
if not errorlevel 1 goto :web_ready
set /a tries+=1
if !tries! lss 20 goto :wait_web
echo       !! 60 秒还没起来。看一眼那个新窗口里的报错（最常见的是端口被占）。
pause
exit /b 1
:web_ready
echo       已就绪： http://127.0.0.1:%WEB_PORT%

:napcat
echo.
echo [2/4] NapCat（QQ 侧，OneBot 端口 %ONEBOT_WS_PORT%）...
call :probe %ONEBOT_WS_PORT%
if not errorlevel 1 (
    echo       已在运行，跳过启动 NapCat。
    goto :start_printbot
)
if not exist "%NAPCAT_DIR%\launcher.bat" (
    echo       !! 找不到 "%NAPCAT_DIR%\launcher.bat"
    echo          请把脚本顶部的 NAPCAT_DIR 改成 NapCatShell 的实际路径。
    pause
    exit /b 1
)
echo       启动中（带 QQ 号=快速登录；没登过会弹二维码）...
start "NapCat" cmd /c ""%NAPCAT_DIR%\launcher.bat" %QQ%
echo       等 OneBot 服务起来（最多 90 秒；需要先在 QQ 窗口完成登录）...
set /a tries=0
:wait_ws
ping -n 4 127.0.0.1 >nul
call :probe %ONEBOT_WS_PORT%
if not errorlevel 1 goto :ws_ready
set /a tries+=1
if !tries! lss 30 goto :wait_ws
echo       !! 90 秒还没等到端口 %ONEBOT_WS_PORT%。
rem 分两种现场给提示，处理办法完全不同（实测踩过）：
rem   ① 主程序在跑、插件没起 —— 多半是 QQ 掉线了，去管理页看登录状态；
rem   ② 主程序也没起 —— 那是还没登录过，扫码即可。
call :probe 6099
if not errorlevel 1 (
    echo          NapCat 主程序在跑（管理页 6099 通），但 OneBot 服务没起来 ——
    echo          多半是那个 QQ 掉线了：打开 http://127.0.0.1:6099 看登录状态，
    echo          或者关掉 NapCat 那个窗口、重新运行本脚本。
) else (
    echo          QQ 登录完成后重新运行本脚本即可（printbot 会自己重连）。
)
rem 这里**不退出**：printbot 断线会自己退避重连，先把它拉起来，
rem QQ 那侧什么时候登好，它就什么时候接上（比让人再跑一遍脚本省事）。
rem 但必须显式跳过下面那句「已就绪」—— 直落下去会在刚报完错之后
rem 又说一遍「服务已就绪」，自己打自己（改的时候真踩了）。
echo       先继续启动 printbot（它会自己重连）。
goto :start_printbot

:ws_ready
echo       OneBot 服务已就绪。

:start_printbot
echo.
echo [3/4] printbot（QQ 与网页服务之间的桥）...
if "%START_PRINTBOT%"=="0" (
    echo       配置里关掉了，跳过。
    goto :done
)
rem 必须先用 CIM 过滤出 python.exe：不过滤的话，这条 powershell 自己的命令行里
rem 就带着 '*printbot.bot*' 这个模式串，它会**匹配到自己** —— 计数恒 ≥1，
rem 于是脚本永远以为 printbot 已经在跑，从来不会真的启动它（旧脚本里就是这个毛病）。
powershell -NoProfile -Command "exit @(Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'python.exe' -and $_.CommandLine -like '*printbot.bot*' }).Count" >nul 2>&1
if errorlevel 1 (
    echo       已经在跑了，不重复启动。
    goto :done
)
if not exist "%PYTHON%" (
    echo       !! 找不到 "%PYTHON%" —— 请改脚本顶部的 PYTHON，或先建好 .venv
    pause
    exit /b 1
)
rem 在 printbot 的父目录跑 -m printbot.bot：它就是按这个方式找自己的包
start "printbot" /D "%ROOT%" "%PYTHON%" -m printbot.bot
echo       已在新窗口启动（关掉那个窗口就是停止 printbot）。

:done
echo.
echo [4/4] 完成。要点：
echo   · 网页端   http://127.0.0.1:%WEB_PORT%
echo   · QQ 机器人：在 QQ 里给机器人号 %QQ% 发消息
echo   · 三个窗口（打印服务 / NapCat / printbot）都别关；QQ 掉线后 NapCat 会等重连
echo   · 停止：关掉对应窗口即可
echo   · NapCat 管理页 http://127.0.0.1:6099 ／ printbot 日志 printbot\logs\printbot.log
echo.
pause
exit /b 0

rem ---- 子过程：TCP 连接探测端口（通了 errorlevel=0，不通=1）----
:probe
powershell -NoProfile -Command "$c = New-Object Net.Sockets.TcpClient; try { $c.Connect('127.0.0.1', %~1); exit 0 } catch { exit 1 } finally { $c.Dispose() }" >nul 2>&1
exit /b %errorlevel%
