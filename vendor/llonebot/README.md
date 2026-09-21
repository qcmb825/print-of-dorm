# LLOneBot（QQ 侧框架）—— printbot 跑起来需要它

这个目录里只有一样东西：`llbot-v8.2.1-win-x64.zip`，**上游发行包原样**。

| | |
| :--- | :--- |
| 版本 | LLBot CLI 2.1.0 / LLBot 8.2.1（win-x64） |
| 大小 | 89.9 MB（解出来约 164 MB，503 个条目） |
| sha256 | `128e54a4c1f3c02c30929d69cb954493b6d73a5e50a33b2dded001f836e35099` |

## 为什么它会在仓库里

`printbot/` 靠 **OneBot v11 正向 WS** 跟 QQ 侧通信，而 LLOneBot 就是那个实现。
把它随仓库带走，是为了让跑机器人的那台机器（跟服务器只有 HTTPS 的距离、不一定连得上下载源）
克隆一份就能开工 —— 不用再去别处找同一个版本的包。

## 里面**没有**什么

发行包是干净的：没有 `bin/llbot/data/` 目录，因此**不含任何凭据和机器状态** ——
授权 token、WebUI 口令、每个 QQ 的 `config_<QQ>.json`、登录态数据库、运行日志，一个都没有。
那些都是**跑起来之后由它自己生成**的，只落在本机，绝不进仓库。

> 本机正在跑的那份装在哪：项目根的 `LLBot-CLI-win-x64-v8/`（已被 `.gitignore` 忽略）。
> 那份**带着 `auth_token.txt`**，是凭据，只在你自己的机器上 —— 别提交，也别拷进本目录。

## 怎么用

```powershell
# 1) 解到一个你放软件的目录（不要在仓库里解，解出来的东西不该被 git 看见）
Expand-Archive vendor\llonebot\llbot-v8.2.1-win-x64.zip -DestinationPath D:\LLBot

# 2) 领授权 token 并粘进这个文件（https://auth.luckylillia.com）
#       D:\LLBot\bin\llbot\data\auth_token.txt
#    token 与 QQ 号绑定：新 QQ 第一次扫码登录一次就会自动登记
#    （没登记时签名服务回 403「uin ... not in your allowed list」，它打印完就退出）

# 3) 起起来（二维码在它自己的窗口里）
D:\LLBot\llbot.exe --qq=<机器人QQ>
```

起来之后：OneBot 正向 WS 在 `127.0.0.1:8085`，访问令牌要与 `printbot/.env` 的
`ONEBOT_ACCESS_TOKEN` 一致；WebUI 在 `http://127.0.0.1:3080`。

有头模式（`--pmhq`，掉线率更低）要额外给出官方 QQ 客户端 `QQ.exe` 的路径，
并且**先把客户端登录成机器人号** —— 细节见根 `README.md` 的 QQ 机器人一节，
一键启动脚本在 `scripts/启动服务.bat`。

## 换版本的时候

直接替换这个 zip、同步更新上面的 sha256 与版本号即可。
**别把解出来的目录提交进来** —— 那样每次升级都是几百个二进制文件的增删，
而 zip 只是一个 blob。
