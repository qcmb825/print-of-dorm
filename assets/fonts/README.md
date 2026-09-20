# -*- coding: utf-8 -*-
"""assets/fonts —— 卡片用的字体（都可自由分发，随仓库走，保证可移植）

| 文件 | 用途 | 来源 | 许可 |
| :--- | :--- | :--- | :--- |
| `SourceHanSans-SC-Regular.ttf` | 正文 / 标题（中文 + 拉丁） | 由站内 `frontend/src/assets/fonts/regular/*.woff2` 的**同一批分片合并**而来（Noto Sans SC / 思源黑体，`npm run fonts:build` 的产物） | SIL OFL 1.1 |
| `SourceHanSans-SC-Bold.ttf` | 标题（粗） | 同上，来自 `bold/` | SIL OFL 1.1 |
| `SpaceGrotesk-Variable.ttf` | 英文小标签（全大写宽字距） | `@fontsource-variable/space-grotesk`（网页端标题字体） | SIL OFL 1.1 |
| `JetBrainsMono-Variable.ttf` | 数字 / 取件码 / 时间（等宽） | `@fontsource-variable/jetbrains-mono`（网页端数字字体） | SIL OFL 1.1 |

**为什么要转成 TTF 存进来**：Pillow 读不了 woff2，而卡片要在没有 Node、没有网络的服务器上
渲染 —— 字体必须随仓库走。转法（一次性，换字体时照做）：

```python
from fontTools.ttLib import TTFont          # pip install fonttools brotli
f = TTFont('xxx.woff2'); f.flavor = None; f.save('xxx.ttf')          # 单个文件
from fontTools.merge import Merger            # 分片要合并成一份
Merger().merge([...]).save('SourceHanSans-SC-Regular.ttf')
```

**许可**：以上字体均为 SIL Open Font License 1.1，允许随软件分发（保留本说明即可）。
字体只用于渲染卡片图片，运行时由 `botcard.py` 按文件名加载；可用 `.env` 的
`CARD_FONT_PATH` / `CARD_DISPLAY_FONT_PATH` / `CARD_MONO_FONT_PATH` 换成别的。

**没有选外部下载的字体**（例如网上那些「终末地同款」）：一是许可证不明、随仓库分发有风险，
二是站内本来就带着思源黑体与 @fontsource 的字体 —— 用它们反而**与网页端真正同源**。
"""
