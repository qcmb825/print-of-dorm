/** 复制一段文本到剪贴板。
 *
 *  优先 clipboard API；http 访问（非安全上下文）或老浏览器没有它时，退回
 *  execCommand —— 那条老路必须在用户手势的调用栈里同步跑才生效，所以整个
 *  函数不做任何 await 之外的耗时动作，兜底分支里一个 await 都没有。
 *
 *  不用 `mqqwpa://` 之类的协议唤起 QQ：那个在桌面浏览器里会静默失败（点了没反应），
 *  而「点了没反应」正是调用方要解决的提示问题 —— 同一个坑不能踩两遍。
 *  复制是两边（手机 / 桌面）都成立的动作，用户自己粘到 QQ 里。
 *
 *  返回是否复制成功，调用方据此决定按钮文案；返回 false 时界面上被复制的
 *  内容必须仍然可见（兜底是让用户自己选中复制）。 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { /* 连 execCommand 都没有就当失败 */ }
    document.body.removeChild(ta)
    return ok
  }
}
