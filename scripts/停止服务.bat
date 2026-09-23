@echo off
setlocal
title 打印服务 —— 一键关停

rem 本脚本住在 scripts\ 子目录里。真正的关停逻辑在同目录的 stop_services.ps1：
rem 用 PowerShell 写那一层，是为了按「谁在监听 8080 / 谁跑着 printbot.bot / 谁在
rem LLBot 目录里」来认自己那几个进程，而不是按进程名乱杀。端口、LLBot 目录这些配置它从 启动服务.bat 的配置区读，不另抄一份。
set "PS1=%~dp0stop_services.ps1"

if not exist "%PS1%" (
    echo !! 找不到 "%PS1%"
    echo    它和本脚本是配套的一对，得放在同一个目录里。
    pause
    exit /b 1
)

rem 加一个 dry 参数只预览不动手：停止服务.bat dry
set "PSARGS="
if /i "%~1"=="dry"  set "PSARGS=-DryRun"
if /i "%~1"=="/dry" set "PSARGS=-DryRun"

rem -ExecutionPolicy Bypass：默认策略常常禁止跑 .ps1（服务器上尤其），这里显式放行。
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%" %PSARGS%
if errorlevel 1 (
    echo.
    echo 有东西没关掉，看上面的提示（多半是权限不够，用管理员身份重跑一次本脚本）。
    pause
    exit /b 1
)

echo.
if defined PSARGS (
    rem 空跑的结果要留给人看
    pause
    exit /b 0
)
rem 关干净了：停 5 秒让人扫一眼结果，然后连本窗口一起收掉，不留尾巴。
ping -n 6 127.0.0.1 >nul
exit /b 0
