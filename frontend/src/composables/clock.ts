/** 秒级时钟：`HH:MM:SS`。页面上唯一"每秒都在变"的读数。
 *
 *  它出现在两处（页面头部的 SYNC 字段、登录面板底行的 SYNC），所以收在这里一份。
 *  两条纪律跟着它走，用到的地方都要守：
 *    ① 值是**本机真实时间**，不是编出来的读数 —— 装饰件可以无意义，但不该是假的；
 *    ② 挂它的容器一律 aria-hidden：屏幕阅读器不该被一段每秒变化的文本反复打断。
 *      真要知道时间的人看系统时钟；这里的作用是"这块屏在跑"。
 *
 *  用 onMounted/onBeforeUnmount 而不是 onUnmounted：时钟在 SSR 下没有 window，
 *  而且卸载时必须清掉定时器 —— 漏掉它就是一个永不停止的 interval。
 */
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

function stamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function useClock(): Ref<string> {
  const clock = ref('')
  let timer: number | undefined

  onMounted(() => {
    // 先立刻写一次：不写的话，挂载后的第一秒里读数是空的
    clock.value = stamp()
    timer = window.setInterval(() => {
      clock.value = stamp()
    }, 1000)
  })

  onBeforeUnmount(() => {
    if (timer !== undefined) window.clearInterval(timer)
  })

  return clock
}
