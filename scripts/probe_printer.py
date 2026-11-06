# -*- coding: utf-8 -*-
"""probe_printer.py —— 探测一台内网打印机能用哪种协议下发、支持哪些参数。

为什么要有这个脚本：
    打印机的型号、固件、买来的年代各不相同，同一台机器往往同时开着好几个口子
    （IPP 631 / RAW 9100 / LPR 515 / SMB 445），但「开着」不等于「能用」——
    有的 9100 只认驱动渲染过的数据流，直塞 PDF 出来是几十页乱码；
    有的 IPP 队列路径不叫 /ipp/print。配错一次的代价是打印出一整张纸的乱码。
    打印机在网页端「打印选项」页配置，表单里的「探测」按钮走的就是这里
    同一份逻辑（printer.probe_host）；这个 CLI 是它的无登录版 ——
    部署机接线前先跑它，把结论照抄进网页表单。

用法：
    .venv/Scripts/python.exe scripts/probe_printer.py 192.168.x.x

结论怎么读：
    * IPP 通 —— 探测会给出 mode/port/ipp_path 三个可直接填表的值与型号。
    * 只 9100 通 —— raw9100 档：没有任务回报、参数只有单双面和份数
      （见 printer.py 模块注释）。
    * 都不通 —— 先核对打印机面板上标的 IP 与网段隔离。
"""
import argparse
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# 项目根：往上找到含 app.py 的那一层（脚本按用途分了目录，写死层数会静默失效）
PROJECT = Path(__file__).resolve().parent
while not (PROJECT / 'app.py').exists() and PROJECT.parent != PROJECT:
    PROJECT = PROJECT.parent
sys.path.insert(0, str(PROJECT))


def main():
    parser = argparse.ArgumentParser(description='探测内网打印机的下发协议与参数能力')
    parser.add_argument('host', help='打印机 IP 或主机名（打印机面板的网络设置里能查到）')
    args = parser.parse_args()

    from printer import probe_host
    result = probe_host(args.host)
    if result['error']:
        print('探测失败：%s' % result['error'])
        print('检查：① IP 对不对；② 是否和服务器同网段；③ 有没有被隔离。')
        return 1

    if result['mode'] == 'ipp':
        state = result['state'] or {}
        model = state.get('printer-make-and-model')
        if isinstance(model, list):
            model = model[0] if model else None
        print('—— IPP 能力 ——')
        print('  名称：%s' % (state.get('printer-name') or '（未报）'))
        if model:
            print('  型号：%s' % model)
        print('  可用路径：%s' % result['ipp_path'])
        sides = state.get('sides-supported')
        if sides:
            print('  双面：%s' % ('支持' if isinstance(sides, list) and sides else sides))
        formats = state.get('document-format-supported')
        if formats:
            print('  直打格式：%s' % (', '.join(formats) if isinstance(formats, list) else formats))
        print()
        print('—— 填进「打印选项 → 打印机」表单 ——')
        print('  协议(模式)：ipp')
        print('  主机地址：%s' % args.host)
        print('  端口：631（或留空取默认）')
        print('  IPP 路径：%s' % result['ipp_path'])
        return 0

    print('—— 结论 ——')
    print('  IPP 没应答，9100 通：走 raw9100 档。')
    print('  注意：无任务回报、参数只有单双面/份数；建议先发一页测试样张确认它吃 PDF。')
    print('  填进「打印选项 → 打印机」表单：协议(模式)=raw9100，主机=%s，端口留空' % args.host)
    return 0


if __name__ == '__main__':
    sys.exit(main())
