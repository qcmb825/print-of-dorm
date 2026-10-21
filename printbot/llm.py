# -*- coding: utf-8 -*-
"""大模型兜底：规则认不出的那句中文，交给大模型抽参数。

## 定位（用户 2026-09-28 的明确要求）

**锦上添花，不是主力。** 日常说法（「黑白 2份」「第 1 份彩色」「都双面」）
全部由 nlu.py 的规则解析处理，一次外网请求都不用发 —— 那才是绝大多数消息。
只有规则**一个字都没认出来**、而这句又明显是在说要求（不是闲聊、不是命令）时，
才把这句话和价目表一起发给大模型，让它按固定 JSON 形状抽一遍。

## 三条不许破的纪律

① **大模型只负责「把中文变成字段」，不负责挑档位**。它返回的是
   {color, duplex, copies, paper} 这样的中间结果，最终落到哪一档价目项
   仍然由 nlu.resolve_spec 对着**服务端给的价目表**决定。模型编出来的
   纸张名（「厚一点的纸」→ "厚纸"）在这里就会被丢掉，不会变成一档不存在的纸。
② **失败即放弃**：超时、连不上、返回不是 JSON、字段越界 —— 一律返回 None，
   由调用方走「没听懂，请再说一次」那条路。**绝不重试、绝不阻塞对话**：
   这条链路跨公网，而我们只是想把一句话说清楚，让学生多等 10 秒比多打一遍字更糟。
③ **只发那句话本身**。不发文件名、不发订单、不发 QQ 号 —— 这条请求要去
   第三方服务器，除了这句话本身，没有任何一条信息是它需要的。

## 配置（printbot/.env）

    LLM_API_KEY=sk-…            # 不配就是关掉这一层（规则照常工作）
    LLM_BASE_URL=https://api.deepseek.com   # OpenAI 兼容的 /chat/completions
    LLM_MODEL=deepseek-chat
    LLM_TIMEOUT=8

key 是凭据：只落在 printbot/.env（那一整个文件被 .gitignore 忽略），
不进仓库、不进日志、不进卡片。
"""

import json
import urllib.error
import urllib.request

from . import config, nlu

#    发给模型的原话长度上限。真正的要求都很短（「黑白 2份」），而一个人
#    把几百字的小作文发过来时，我们要的仍然只是里面那几个词 —— 截断比超时好。
_MAX_TEXT = 500

_SYSTEM_PROMPT = (
    '你是打印下单的参数抽取器。把学生这句话里的打印要求抽成 JSON。\n'
    '只输出 JSON，不要解释，不要 Markdown 代码块。\n'
    '字段：\n'
    '  color: "black"（黑白）/ "color"（彩色）/ null\n'
    '  duplex: "single"（单面）/ "double"（双面）/ null\n'
    '  copies: 份数整数（1-50）/ null\n'
    '  paper: 纸张，只能从下面给出的清单里挑一个**原样**抄过来，否则 null\n'
    '    %s\n'
    '  remark: 学生写了「备注 xxx」时填 xxx，否则 null\n'
    '  submit: 只有整句就是在说「好 / 下单 / 就这样」时才是 true，其余 false\n'
    '  scoped: 学生点名了具体的文件（如「第 2 份彩色」）时填\n'
    '    [{"index": 2, "color": "color", "duplex": null, "copies": null, "paper": null}]\n'
    '    没有点名就是 []\n'
    '\n'
    '**只写他明确说过的。**这是一个约束，不是建议：没提到的字段一律 null。\n'
    '猜错（把「黑白」写成彩色、把没说的份数填成 2）比留空代价大得多 —— '
    '留空我们会去问学生，猜错就是打错一份纸。\n'
)


def enabled():
    """配了 key 才算打开这一层。没配就是纯规则模式，功能不残缺。"""
    return bool(config.LLM_API_KEY)


def describe_state():
    """启动日志里那一行：这一层到底开没开、用的哪个模型。"""
    if not enabled():
        return '大模型兜底：未配置（只用规则解析）'
    return '大模型兜底：%s @ %s' % (config.LLM_MODEL, config.LLM_BASE_URL)


def _papers(items):
    """给模型看的纸张清单：**只给服务端真实存在的那些**。

    这就是纪律①的前半截：模型只能从这份清单里挑，挑不到就 null。
    """
    names = []
    for item in items or []:
        paper = str((item or {}).get('paper') or '').strip()
        if paper and paper not in names:
            names.append(paper)
    return names


def extract_requirement(text, items, timeout=None):
    """让大模型抽一遍参数。返回与 nlu.parse_requirement 同形状的 dict；失败返回 None。

    形状对齐是有意的：调用方拿到之后走的是**同一个** resolve_spec / 提交路径，
    不需要为「这句话是谁解析的」分叉 —— 分叉就会出现「规则解析的会校验档位、
    模型解析的直接放行」这种一半严一半松的口子。
    """
    if not enabled():
        return None
    text = (text or '').strip()
    if not text:
        return None
    if len(text) > _MAX_TEXT:
        text = text[:_MAX_TEXT]

    payload = {
        'model': config.LLM_MODEL,
        'messages': [
            {'role': 'system', 'content': _SYSTEM_PROMPT % json.dumps(
                _papers(items), ensure_ascii=False)},
            {'role': 'user', 'content': text},
        ],
        'temperature': 0,
        'max_tokens': 300,
        'stream': False,
        # DeepSeek / 通义 / 智谱的 OpenAI 兼容接口都认这个字段；不认的实现
        # 会忽略它（那时我们在下面照样按 JSON 解析，多一层 code fence 也认）。
        'response_format': {'type': 'json_object'},
    }
    request = urllib.request.Request(
        config.LLM_BASE_URL.rstrip('/') + '/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': 'Bearer ' + config.LLM_API_KEY,
            'Content-Type': 'application/json',
        },
        method='POST')
    try:
        with urllib.request.urlopen(request, timeout=timeout or config.LLM_TIMEOUT) as resp:
            body = json.loads(resp.read().decode('utf-8'))
        content = body['choices'][0]['message']['content']
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        # 连不上/超时：这条链路本来就是可选的，不值得把对话卡在这里。
        config.log.warning('大模型兜底调用失败（网络）：%s', exc)
        return None
    except (KeyError, ValueError, IndexError) as exc:
        config.log.warning('大模型兜底返回了看不懂的东西：%s', exc)
        return None
    return _clean(content, items)


def _clean(content, items):
    """把模型那段 JSON 清洗成 parse_requirement 的形状；不像就返回 None。

    这里做四件事，每一件都对应一种「模型很擅长犯的错」：
      · 剥掉 ```json 围栏（有些实现不认 response_format，会自己加壳）；
      · 字段类型/取值越界就丢成 None（copies 给 "两份"、color 给 "黑色"）；
      · **纸张必须在真实价目表里**（编出来的纸名一律丢掉，见纪律①）；
      · scoped 里超出 1..BATCH_ORDER_MAX_FILES 的序号丢掉（那个文件不存在）。
    """
    if not isinstance(content, str) or not content.strip():
        return None
    raw = content.strip()
    if raw.startswith('```'):
        raw = raw.strip('`')
        if raw.lower().startswith('json'):
            raw = raw[4:]
    try:
        data = json.loads(raw)
    except ValueError:
        config.log.warning('大模型兜底返回的不是 JSON：%s', content[:120])
        return None
    if not isinstance(data, dict):
        return None

    empty = nlu.empty_spec()

    def clean_spec(source):
        """一个 spec（可能来自 global 或 scoped 的某一项）。"""
        if not isinstance(source, dict):
            return dict(empty)
        spec = dict(empty)
        color = source.get('color')
        if color in ('black', 'color'):
            spec['color'] = color
        duplex = source.get('duplex')
        if duplex in ('single', 'double'):
            spec['duplex'] = duplex
        copies = source.get('copies')
        if isinstance(copies, bool):
            copies = None
        if isinstance(copies, int) and 1 <= copies <= config.COPY_MAX:
            spec['copies'] = copies
        paper = source.get('paper')
        if isinstance(paper, str) and paper.strip():
            # 纪律①：编出来的纸名在这里就被丢掉（_find_paper 只认真实档位上的词）。
            spec['paper'] = paper.strip() if nlu._find_paper(paper, items) else None
        elif isinstance(paper, str):
            spec['paper'] = None
        return spec

    out = {'global': clean_spec(data.get('global') or data),
           'scoped': [], 'remark': None, 'submit': False, 'cancel': False,
           'empty': True, 'raw': '', 'source': 'llm'}
    remark = data.get('remark')
    if isinstance(remark, str) and remark.strip():
        out['remark'] = remark.strip()[:200]
    out['submit'] = data.get('submit') is True

    scoped = data.get('scoped')
    if isinstance(scoped, list):
        for entry in scoped[:config.BATCH_MAX_FILES]:
            if not isinstance(entry, dict):
                continue
            try:
                index = int(entry.get('index'))
            except (TypeError, ValueError):
                continue
            if not 1 <= index <= config.BATCH_MAX_FILES:
                continue
            spec = clean_spec(entry)
            if not nlu.spec_is_empty(spec):
                out['scoped'].append((index, spec))
    out['empty'] = nlu.spec_is_empty(out['global']) and not out['scoped']
    if out['empty'] and not out['submit'] and not out['remark']:
        # 模型也没抽出东西：当作「没听懂」，不要拿一个空结果去覆盖调用方的判断。
        return None
    return out
