<#
  打印服务 —— 一键关停（逻辑层）

  平时不用直接跑它：双击同目录的 停止服务.bat 就行（那个负责收尾、关自己的窗口）。
  想先看看会关掉什么、又不动手：停止服务.bat dry

  关停顺序是启动的逆序：printbot → LLBot → 网页服务，最后收掉启动脚本那个窗口。
  认进程用的是「可观测的事实」，不靠记 PID，也不按名字乱杀：
    · 网页服务 = 正在监听 8080 的进程（连同 .venv 里的启动器父进程一起收）
    · LLBot    = 监听 8085 / 3080 的进程，或跑在 LLBot 目录里的 llbot.exe
    · printbot = 命令行里带 printbot.bot 的 python.exe
  这三条判据和 启动服务.bat 的探测方式一致，所以「它说在跑」与「这里关得掉」永远对得上。
  端口、LLBot 目录、QQ 路径都从那边的配置区读（换机器时只改那一处，见下面的
  Get-LauncherSetting）—— 抄一份到这边，两边迟早对不上，而且对不上时不报错。
#>
[CmdletBinding()]
param(
    [switch]$DryRun
)

# ------------------------- 先看 启动服务.bat 的配置区 -------------------------
# 端口、LLBot 目录、QQ 路径都在那份脚本里，它自己写着「换机器只改这一段」。
# 这里再抄一份的话，换机器时改了那边、这边不改 —— 症状是「启动脚本说在跑、
# 关停脚本说没在跑」，或者照着旧路径找一圈、什么都没找到就报告「没在跑」，
# 两个都不报错。（原样抄的那版把 QQ 路径写死成 C:\Program Files\Tencent\QQNT\QQ.exe，
# 而本机 QQ 装在 D:\APP\QQ —— $StopQQ 一开就是上面的静默失配。）
#
# ⚠️ **值里的 %VAR% 必须展开**：那份脚本写的是
#    set "LLBOT_DIR=%ROOT%LLBot-CLI-win-x64-v8"
# 原样拿来就永远是字面的「%ROOT%LLBot-CLI-win-x64-v8」—— 按目录认 llbot.exe 那条
# 判据于是静默失效（实测：LLBot 正在跑，[2/5] 只认得出端口上那个 WebUI 子进程，
# 复查还回「已关停」，主进程被留在后台）。%ROOT% 用本脚本自己算的 $Root：
# 两者的定义是同一个（启动服务.bat 的 %~dp0.. 与本脚本的 $PSScriptRoot\..）。
function Get-LauncherConfig {
    param([string]$Name)
    $bat = Join-Path $PSScriptRoot '启动服务.bat'
    if (-not (Test-Path -LiteralPath $bat)) { return '' }
    # 文件是 GBK（项目约定：这两个 .bat 是 GBK + CRLF）。按 936 读才对得上中文，
    # 但这里要的几行都是 ASCII，所以就算它被存成 UTF-8 也读得出来。
    $text = [System.IO.File]::ReadAllText($bat, [System.Text.Encoding]::GetEncoding(936))
    $table = @{ 'ROOT' = $Root }
    foreach ($line in ($text -split "`r?`n")) {
        $m = [regex]::Match($line, '^\s*set\s+"?([A-Za-z_][A-Za-z0-9_]*)=([^"\r\n]*)"?\s*$')
        if ($m.Success) { $table[$m.Groups[1].Value.ToUpper()] = $m.Groups[2].Value }
    }
    $key = $Name.ToUpper()
    if (-not $table.ContainsKey($key)) { return '' }
    # 逐轮展开：LLBOT_DIR 引用 %ROOT%、LLBOT_DATA 又引用 %LLBOT_DIR%，一轮顶多往下剥一层
    $value = [string]$table[$key]
    for ($i = 0; $i -lt 5 -and $value.Contains('%'); $i++) {
        $value = [regex]::Replace($value, '%([A-Za-z_][A-Za-z0-9_]*)%', {
            param($m)
            $ref = $m.Groups[1].Value.ToUpper()
            if ($table.ContainsKey($ref)) { return [string]$table[$ref] }
            return $m.Value
        })
    }
    # 还剩 % 说明引用了本脚本不认识的变量：宁可当「没配」（退回默认值 / 报错），
    # 也别拿一个必然匹配不上的路径去认进程 —— 那条路只会静默漏杀。
    if ($value.Contains('%')) { return '' }
    return $value.Trim()
}

# 取一个配置值，空值或读不到就用调用方给的默认值。
# 空值当路径前缀时 StartsWith('') 对谁都成立，那就成了「按名字乱杀」。
function Get-LauncherSetting {
    param([string]$Name, [string]$Default = '')
    $value = Get-LauncherConfig $Name
    if ($value) { return $value }
    return $Default
}

function Get-LauncherPort {
    param([string]$Name, [int]$Default)
    $n = 0
    if ([int]::TryParse((Get-LauncherSetting $Name ''), [ref]$n) -and $n -gt 0 -and $n -le 65535) {
        return $n
    }
    return $Default
}

# ==================== 配置区（默认值；实际以 启动服务.bat 为准） ====================
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if (-not $Root.EndsWith('\')) { $Root = "$Root\" }

$WebPort        = Get-LauncherPort 'WEB_PORT' 8080
$OneBotPort     = Get-LauncherPort 'ONEBOT_WS_PORT' 8085
# LLBot 自己的管理页端口，不在 启动服务.bat 的配置区里（用框架默认值）
$LlbotWebUiPort = 3080
$LlbotDir       = Get-LauncherSetting 'LLBOT_DIR' (Join-Path $Root 'LLBot-CLI-win-x64-v8')
# 读不到就留空：$StopQQ 打开时下面会明说「这一项没关掉」，而不是假装成功
$QqPath         = Get-LauncherSetting 'QQ_PATH' ''

$StopPrintbot = $true
$StopLlbot    = $true
# pmhq 模式下 QQ 客户端是 LLBot 拉起来的。默认不关它：关掉等于把机器人号退掉登录，
# 下次启动还得在 QQ 里重新确认一遍。想连 QQ 一起收干净就把这里改成 $true。
$StopQQ       = $false
# 启动脚本那个窗口在服务起完之后就没用了（它还停在最后的 pause 上），默认顺手收掉。
# 只认 启动服务.bat 里 title 设的那串确切标题，而且只认 cmd.exe，不会误伤别的窗口。
$CloseLauncher = $true
$LauncherTitle = '打印服务 —— 一键启动（网页服务 + QQ 机器人）'
# ==================================================================================

$ErrorActionPreference = 'Continue'
$script:Failed = $false

# ------------------------------- 工具 -------------------------------

# 真实 TCP 连接探测。和 启动服务.bat 用同一套判据：不解析 netstat 的文本格式。
function Test-Port {
    param([int]$Port)
    $c = New-Object Net.Sockets.TcpClient
    try { $c.Connect('127.0.0.1', $Port); return $true }
    catch { return $false }
    finally { $c.Dispose() }
}

# 谁在监听这些端口。**两条来源取并集**：
#   · Get-NetTCPConnection —— 快、字段是结构化的；
#   · netstat -ano        —— 同一端点上有多个 socket 时只有它报得全。
# 双实例现场（Flask 开发服务器设了 SO_REUSEADDR，第二个进程也能 LISTEN 成功）实测过：
# netstat 报两条 LISTENING、Get-NetTCPConnection 只报一个 OwningProcess。只按后者取人
# 就会漏杀一半，剩下的那个继续接客 —— 而 Windows 把连接给先绑定的那个，正是
# 「重启了、日志也正常、接口还是旧代码」的经典现场。取全部 owner 必须回到 netstat。
function Get-NetstatOwnerIds {
    param([int[]]$Port)
    $found = @()
    foreach ($line in @(& netstat.exe -ano)) {
        # 形如：  TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    101296
        # 按空白切列，不看固定列宽（列宽会随 IPv6 行和系统语言变）。
        # 状态那一列只匹配 LISTEN 前缀：UDP 行没有状态列，会被这一条挡掉。
        $f = @($line -split '\s+' | Where-Object { $_ })
        if ($f.Count -lt 5 -or $f[0] -ne 'TCP' -or $f[3] -notmatch '^LISTEN') { continue }
        $colon = $f[1].LastIndexOf(':')
        if ($colon -lt 0) { continue }
        # ⚠️ 这个变量不能叫 $port：PowerShell 不区分大小写，它会和参数 $Port 是同一个变量，
        # 于是 [ref] 指向的是一个 int[]，TryParse 直接「找不到重载：参数计数为 2」（踩过）
        $listening = 0
        if (-not [int]::TryParse($f[1].Substring($colon + 1), [ref]$listening)) { continue }
        if ($Port -notcontains $listening) { continue }
        $found += [int]$f[4]
    }
    return @($found)
}

function Get-PortOwnerIds {
    param([int[]]$Port)
    $ids = @()
    foreach ($p in $Port) {
        $ids += @(Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue |
                  Select-Object -ExpandProperty OwningProcess)
    }
    $ids += @(Get-NetstatOwnerIds $Port)
    return @($ids | Where-Object { $_ -gt 0 } | Sort-Object -Unique)
}

# venv 里的 python.exe 只是个启动器，真正干活的是它拉起的基础解释器。
# 顺着监听端口的那个进程往上找，把这条链上的启动器一起收掉，别留孤儿进程。
function Get-VenvLauncherIds {
    param([int[]]$Ids)
    $found = @()
    foreach ($procId in $Ids) {
        $cur = Get-CimInstance Win32_Process -Filter "ProcessId=$procId" -ErrorAction SilentlyContinue
        if (-not $cur) { continue }
        $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$($cur.ParentProcessId)" -ErrorAction SilentlyContinue
        while ($parent -and $parent.ExecutablePath -and
               $parent.ExecutablePath.StartsWith("$Root.venv\", 'OrdinalIgnoreCase')) {
            $found += [int]$parent.ProcessId
            $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$($parent.ParentProcessId)" -ErrorAction SilentlyContinue
        }
    }
    return @($found | Sort-Object -Unique)
}

# 网页服务：① 监听 8080 的那个；② .venv 里跑 app.py 的启动器（正常是 ① 的父进程，
# ① 崩了但启动器还挂着时靠它兜住）；③ 顺着 ① 往上找的启动器。
# 三条都要求「就是本项目的东西」，别的程序占了 8080 不会被误认成自己的。
function Get-WebIds {
    $ids = @(Get-PortOwnerIds @($WebPort))
    $ids += @(Get-CimInstance Win32_Process -Filter "Name='python.exe'" -ErrorAction SilentlyContinue |
              Where-Object { $_.ExecutablePath -and
                             $_.ExecutablePath.StartsWith("$Root.venv\", 'OrdinalIgnoreCase') -and
                             $_.CommandLine -like '*app.py*' } |
              Select-Object -ExpandProperty ProcessId)
    $ids += @(Get-VenvLauncherIds $ids)
    return @($ids | Where-Object { $_ -gt 0 } | Sort-Object -Unique)
}

# printbot：命令行里带 printbot.bot 的 python.exe。
# 必须先按 Name 过滤：不然这条 powershell 自己的命令行里就带着那个模式串，会匹配到自己
# —— 启动脚本里就踩过这个坑（见 启动服务.bat 第 130 行的注释）。
function Get-PrintbotIds {
    return @(Get-CimInstance Win32_Process -Filter "Name='python.exe'" -ErrorAction SilentlyContinue |
             Where-Object { $_.CommandLine -and $_.CommandLine -like '*printbot.bot*' } |
             Select-Object -ExpandProperty ProcessId)
}

# LLBot：监听 8085 / 3080 的进程，或跑在自己那套目录里的 llbot.exe
function Get-LlbotIds {
    $ids = @(Get-PortOwnerIds @($OneBotPort, $LlbotWebUiPort))
    $ids += @(Get-CimInstance Win32_Process -Filter "Name='llbot.exe'" -ErrorAction SilentlyContinue |
              Where-Object { -not $_.ExecutablePath -or
                             $_.ExecutablePath.StartsWith($LlbotDir, 'OrdinalIgnoreCase') } |
              Select-Object -ExpandProperty ProcessId)
    return @($ids | Where-Object { $_ -gt 0 } | Sort-Object -Unique)
}

# QQ 客户端：QQNT 目录下的一堆进程都算（QQ.exe 是主进程，附属进程跟着一起走）。
# 路径从 启动服务.bat 的 QQ_PATH 取，取不到就返回空 —— 调用方负责说清「这一项没做」。
function Get-QqIds {
    if (-not $QqPath) { return @() }
    $dir = (Split-Path -Parent $QqPath).TrimEnd('\') + '\'
    return @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
             Where-Object { $_.ExecutablePath -and $_.ExecutablePath.StartsWith($dir, 'OrdinalIgnoreCase') } |
             Select-Object -ExpandProperty ProcessId)
}

# 跑着 启动服务.bat 的那个窗口（它停在最后的 pause 上，服务起完就没用了）。
# **判据落在 cmd.exe 的 CommandLine 上，不看窗口标题** —— 本机实测（Win11，
# 默认终端是 Windows Terminal）：`Get-Process -Name cmd` 的 MainWindowTitle 恒为空，
# 控制台窗口归 WindowsTerminal.exe，连「管理员: 」前缀都读不到，按标题精确比较
# 必然失配，脚本会安静地打印「没找到」然后以 0 退出。命令行这条判据在两种控制台下都成立。
# 标题只留作旧式控制台的兜底（那时 MainWindowTitle 才有值）。
# ⚠️ 绝不 Stop-Process -Name WindowsTerminal：那个进程承载用户所有的终端标签页。
function Get-LauncherWindowIds {
    $ids = @(Get-CimInstance Win32_Process -Filter "Name='cmd.exe'" -ErrorAction SilentlyContinue |
             Where-Object { $_.CommandLine -and $_.CommandLine -like '*启动服务.bat*' } |
             Select-Object -ExpandProperty ProcessId)
    $ids += @(Get-Process -Name cmd -ErrorAction SilentlyContinue |
              Where-Object { $_.MainWindowTitle -eq $LauncherTitle } |
              Select-Object -ExpandProperty Id)
    return @($ids | Where-Object { $_ -gt 0 } | Sort-Object -Unique)
}

# 打印一行「PID + 命令行」，让人一眼看出关的是哪个进程，而不是盲杀
function Format-ProcLine {
    param([int]$Id)
    $p = Get-CimInstance Win32_Process -Filter "ProcessId=$Id" -ErrorAction SilentlyContinue
    if (-not $p) { return "PID $Id（已经退出了）" }
    $cmd = $p.CommandLine
    if (-not $cmd) { $cmd = $p.ExecutablePath }
    if ($cmd -and $cmd.Length -gt 120) { $cmd = $cmd.Substring(0, 117) + '...' }
    return "PID $Id  $cmd"
}

# 8080 上的进程命令行里没有 app.py —— 提醒一句，但不拦着不动手（端口是本脚本配的）
function Test-LooksLikeApp {
    param([int]$Id)
    $p = Get-CimInstance Win32_Process -Filter "ProcessId=$Id" -ErrorAction SilentlyContinue
    return [bool]($p -and $p.CommandLine -and $p.CommandLine -like '*app.py*')
}

# --------------------------- 关一个组件 ---------------------------

# 先列出要关的进程，再连树 /T 强杀 /F，最后复查一遍是不是真没了。
# $Recheck 是「怎么重新查这个组件」的脚本块 —— 复查用实测结果说话，不信 taskkill 的返回。
function Stop-Component {
    param([string]$Label, [int[]]$Ids, [scriptblock]$Recheck)

    Write-Host $Label
    if (-not $Ids -or $Ids.Count -eq 0) {
        Write-Host '      没在跑，跳过。' -ForegroundColor DarkGray
        return
    }
    foreach ($procId in $Ids) {
        Write-Host ('      ' + (Format-ProcLine $procId)) -ForegroundColor DarkGray
    }
    if ($DryRun) {
        Write-Host '      [空跑] 上面这些会被关掉，这次没动手。' -ForegroundColor Yellow
        return
    }
    foreach ($procId in $Ids) {
        & taskkill.exe /PID $procId /T /F 2>&1 | Out-Null
    }
    Start-Sleep -Milliseconds 400
    $left = @(& $Recheck)
    if ($left.Count -eq 0) {
        Write-Host '      已关停。' -ForegroundColor Green
    } else {
        Write-Host ("      !! 还剩 " + ($left -join '、') + " 没关掉；如果是因为「拒绝访问」，用管理员身份重跑一次。") -ForegroundColor Red
        $script:Failed = $true
    }
}

# ------------------------------- 主流程 -------------------------------

Write-Host '============================================'
Write-Host '  打印服务 · 一键关停'
if ($DryRun) { Write-Host '  空跑：只看会关掉什么，不动手' -ForegroundColor Yellow }
Write-Host '============================================'
Write-Host ''

if ($StopPrintbot) {
    Stop-Component '[1/5] printbot（QQ 与网页服务之间的桥）...' (Get-PrintbotIds) { Get-PrintbotIds }
} else {
    Write-Host '[1/5] printbot：配置里关掉了（$StopPrintbot），跳过。' -ForegroundColor DarkGray
}

if ($StopLlbot) {
    Stop-Component '[2/5] LLBot（QQ 侧）...' (Get-LlbotIds) { Get-LlbotIds }
} else {
    Write-Host '[2/5] LLBot：配置里关掉了（$StopLlbot），跳过。' -ForegroundColor DarkGray
}

$webIds = @(Get-WebIds)
if ($webIds.Count -gt 0 -and -not (Test-LooksLikeApp $webIds[0])) {
    Write-Host '      注意：8080 上这个进程的命令行里没有 app.py，确认一下是不是本项目的东西。' -ForegroundColor Yellow
}
Stop-Component '[3/5] 网页服务（Flask）...' $webIds { Get-WebIds }

if ($StopQQ) {
    if (-not $QqPath) {
        Write-Host '      !! 读不到 QQ 客户端的路径（启动服务.bat 的配置区里没有 QQ_PATH）；这一项没关。' -ForegroundColor Red
        $script:Failed = $true
    } else {
        Stop-Component '[4/5] QQ 客户端（pmhq 模式拉起的）...' (Get-QqIds) { Get-QqIds }
    }
} else {
    Write-Host '[4/5] QQ 客户端：按配置保留（要连它一起关就改脚本顶部的 $StopQQ）' -ForegroundColor DarkGray
}

if ($CloseLauncher) {
    Write-Host '[5/5] 启动脚本那个窗口...'
    $wins = @(Get-LauncherWindowIds)
    if ($wins.Count -eq 0) {
        Write-Host '      没找到（你已经关掉了，或者它压根没开在窗口里）。' -ForegroundColor DarkGray
    } elseif ($DryRun) {
        Write-Host ('      [空跑] 会关掉窗口（PID ' + ($wins -join '、') + '）' + $LauncherTitle) -ForegroundColor Yellow
    } else {
        # 和 Stop-Component 同一条纪律：打完就复查，不信调用的返回值。
        # 这里原来写成 `$wins | Stop-Process -Force -ErrorAction SilentlyContinue` 加一句
        # 「已关掉」—— 失败被吞掉，实测有一次窗口明明还活着、脚本照样报成功。
        foreach ($winId in $wins) {
            try { Stop-Process -Id $winId -Force -ErrorAction Stop }
            catch { Write-Host ('      关不掉 PID ' + $winId + '：' + $_.Exception.Message) -ForegroundColor Red }
        }
        Start-Sleep -Milliseconds 400
        $left = @(Get-LauncherWindowIds)
        if ($left.Count -eq 0) {
            Write-Host '      已关掉。' -ForegroundColor Green
        } else {
            Write-Host ('      !! 还剩 ' + ($left -join '、') + ' 没关掉。') -ForegroundColor Red
            $script:Failed = $true
        }
    }
} else {
    Write-Host '[5/5] 启动脚本那个窗口：按配置保留' -ForegroundColor DarkGray
}

Write-Host ''
if ($DryRun) {
    Write-Host '空跑结束：上面列出的进程如果真跑一遍就会被关掉。真关：不带参数再跑一次。' -ForegroundColor Yellow
    exit 0
}
if ($script:Failed) {
    Write-Host '有进程没关掉，看上面的 !! 行。' -ForegroundColor Red
    exit 1
}

# 最终判据：端口没人应答才算真关干净（不信进程列表，直接连一次）
$ports = @($WebPort)
if ($StopLlbot) { $ports += @($OneBotPort, $LlbotWebUiPort) }
$busy = @()
foreach ($p in $ports) { if (Test-Port $p) { $busy += $p } }
if ($busy.Count -gt 0) {
    Write-Host ('!! 端口 ' + ($busy -join '、') + ' 还有人应答，没关干净。') -ForegroundColor Red
    exit 1
}
Write-Host ('全部关停：' + ($ports -join ' / ') + ' 都已释放。') -ForegroundColor Green
Write-Host '再启动：双击 scripts\启动服务.bat' -ForegroundColor DarkGray
exit 0
