<script setup lang="ts">
/** 预设附带文档的**在线预览**：只在网页里看，不给下载入口。
 *
 *  为什么用 pdf.js 把 PDF 画到 canvas，而不是 `<iframe src="...pdf">`：
 *  浏览器内置的 PDF 阅读器自带「下载」按钮，一嵌进来「不提供下载选项」
 *  这句话就是假的。canvas 上只有像素，界面上没有任何地方能把原文件另存出去。
 *
 *  ⚠️ 它**不是 DRM**：能看到的字节本来就已经在用户的浏览器里了，
 *  真正的边界是服务端的「只给登录用户」那一条（见 routes/order_options.py
 *  的 api_preset_doc）。这里做的只是「界面上没有下载入口」。
 *
 *  为什么把 pdfjs 做成**动态 import**：它有一兆多，而这一屏是「想看才点」的，
 *  绝大多数下单根本不会打开文档。静态 import 会让每个学生都为它付一次流量。
 *
 *  为什么一次只画一页、带翻页按钮，而不是把整份铺成一长条：
 *  预设文档的页数没有上限（只有 20MB 的大小上限），一页一块 canvas
 *  在长文档上会直接把手机内存吃满 —— 而这一屏的用途只是「看一眼长什么样」。
 */
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { ChevronLeft, ChevronRight, FileWarning, Loader2 } from '@lucide/vue'
import { NButton, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { presetDocApi } from '@/api/endpoints'

const props = defineProps<{
  presetId: number
  /** 原始文件名 —— 这里只用它判断类型（pdf 还是图片），显示名由父级给。 */
  docName: string | null
  /** 父级已经拿到的容器宽度（不传就按 640 算）。 */
  width?: number
}>()

const isPdf = computed(() => (props.docName ?? '').toLowerCase().endsWith('.pdf'))

const loading = ref(true)
const error = ref('')
const page = ref(1)
const pageCount = ref(1)
const canvasRef = ref<HTMLCanvasElement | null>(null)
//    shallowRef：PDFDocumentProxy 是个带内部状态的类实例，被 Vue 变成响应式代理后
//    pdf.js 内部的私有字段访问会出问题（而且它很大、很贵）。这里只当引用用。
const doc = shallowRef<import('pdfjs-dist').PDFDocumentProxy | null>(null)
//    销毁要走**加载任务**而不是文档对象：pdf.js v6 的 PDFDocumentProxy 只有
//    cleanup()（清页缓存），销毁 worker 与传输的那一下在 PDFDocumentLoadingTask 上。
//    只清缓存不销毁的话，翻过几份文档就会攒住好几个 worker。
const task = shallowRef<import('pdfjs-dist').PDFDocumentLoadingTask | null>(null)

/** 渲染第 n 页到 canvas。容器宽度变了就重画（scale 跟着变）。 */
async function renderPage(n: number): Promise<void> {
  const pdf = doc.value
  const canvas = canvasRef.value
  if (!pdf) return
  //    canvas 拿不到就**抛**，别静默返回：那意味着「加载完了但什么都没画」——
  //    屏幕上是空白，控制台里一行字都没有。这个 bug 真发生过一次
  //    （渲染发生在 loading 落下之前，canvas 还不在 DOM 上），所以这里宁可吵。
  if (!canvas) throw new Error('预览画布还没准备好')
  const target = Math.min(Math.max(1, n), pageCount.value)
  const pdfPage = await pdf.getPage(target)
  // 设备像素比：不乘它，高清屏上渲出来的是糊的（canvas 的默认 1 像素 = 1 CSS 像素）。
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const base = pdfPage.getViewport({ scale: 1 })
  const available = Math.max(280, props.width ?? 640)
  // 不许放大超过 2 倍：一份小页面的 PDF 拉成整屏宽会糊成一片。
  const scale = Math.min(available / base.width, 2)
  const viewport = pdfPage.getViewport({ scale })
  canvas.width = Math.floor(viewport.width * dpr)
  canvas.height = Math.floor(viewport.height * dpr)
  canvas.style.width = `${Math.floor(viewport.width)}px`
  canvas.style.height = `${Math.floor(viewport.height)}px`
  //    v6 起 render() 要的是 `canvas` 本身（`canvasContext` 是兼容用法，
  //    而且和 canvas 同时给会报错）。上下文由 pdf.js 自己取。
  await pdfPage.render({
    canvas,
    viewport,
    transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0],
  }).promise
  page.value = target
}

async function load(): Promise<void> {
  loading.value = true
  error.value = ''
  pageCount.value = 1
  page.value = 1
  doc.value = null
  try {
    const pdfjs = await import('pdfjs-dist')
    // worker 走 Vite 的 `?url`：它会把这个文件打进产物并按 base 重写路径 ——
    // 写死 '/pdf.worker.mjs' 在子路径部署下会 404，而 pdf.js 这时**不会报错**，
    // 只是静默退化成主线程渲染（页面卡住，谁都看不出为什么）。
    pdfjs.GlobalWorkerOptions.workerSrc =
      (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default
    const data = await presetDocApi.binary(props.presetId)
    const pending = pdfjs.getDocument({ data })
    task.value = pending
    doc.value = await pending.promise
    pageCount.value = doc.value.numPages || 1
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '文档读取失败'
  } finally {
    loading.value = false
  }
  //    ⚠️ **第一页必须在 loading 落下之后画**：canvas 住在模板的 `v-else` 分支里，
  //    loading 为真时它压根不在 DOM 上，那时 renderPage 拿到的 canvasRef 是 null。
  //    放在 try 里画的话，症状是「弹窗开着、页数也对（1 / 3）、画布一片空白」——
  //    不抛异常、控制台一行字都没有。踩过一次。
  if (!error.value && doc.value) {
    await nextTick()
    try {
      await renderPage(1)
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : '这一页渲染失败'
    }
  }
}

/** 翻页/重画时只动 canvas，不再走一遍加载态 —— 否则每翻一页整块闪一下。 */
async function go(delta: number): Promise<void> {
  if (loading.value || !doc.value) return
  const next = page.value + delta
  if (next < 1 || next > pageCount.value) return
  try {
    await renderPage(next)
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '这一页渲染失败'
  }
}

watch(() => [props.presetId, props.width], () => {
  if (isPdf.value) void load()
}, { immediate: true })

// 关掉预览时把文档和它的 worker 一起释放掉：不释放的话，翻过几份文档就会攒住
// 几十兆的解析结果（worker 那边也留着），而用户已经走了。
onBeforeUnmount(() => {
  void task.value?.destroy()
  task.value = null
  doc.value = null
})
</script>

<template>
  <div class="flex min-h-0 flex-col gap-2">
    <!-- 图片：直接给 <img>。它是浏览器原生就能渲染的东西，
         没必要为它绕一圈 canvas（而且原生 <img> 自带缩放与平滑）。 -->
    <img
      v-if="!isPdf"
      :src="presetDocApi.url(presetId)"
      :alt="docName || '预设文档'"
      class="max-h-[70vh] w-full border object-contain"
      style="border-color: var(--border); background-color: var(--paper-2)"
    />

    <template v-else>
      <div v-if="loading" class="flex flex-col gap-2">
        <NSkeleton height="320px" :sharp="true" />
      </div>

      <div v-else-if="error" class="flex flex-col items-start gap-3 py-6">
        <p class="flex items-center gap-2 text-sm" style="color: var(--warn)">
          <FileWarning :size="15" />
          {{ error }}
        </p>
        <NButton size="small" quaternary :loading="loading" @click="load">重新加载</NButton>
      </div>

      <template v-else>
        <div
          class="flex max-h-[70vh] justify-center overflow-auto border p-2"
          style="border-color: var(--border); background-color: var(--paper-2)"
        >
          <!-- canvas 上的右键菜单没有「另存为 PDF」这一项 —— 这正是选它
               而不是 <iframe> 的原因（浏览器内置阅读器自带下载按钮）。 -->
          <canvas ref="canvasRef" class="max-w-full" />
        </div>
        <div v-if="pageCount > 1" class="flex items-center justify-center gap-3">
          <NButton size="small" quaternary :disabled="page <= 1" @click="go(-1)">
            <template #icon><ChevronLeft :size="15" /></template>
            上一页
          </NButton>
          <span class="tnum text-xs text-ink-3">{{ page }} / {{ pageCount }}</span>
          <NButton size="small" quaternary :disabled="page >= pageCount" @click="go(1)">
            下一页
            <template #icon><ChevronRight :size="15" /></template>
          </NButton>
        </div>
      </template>
    </template>

    <p class="flex items-center gap-1.5 text-xs text-ink-3">
      <Loader2 v-if="loading && isPdf" :size="12" class="animate-spin" />
      仅用于在线预览 · 不提供下载 · 实际打印以管理员核定为准
    </p>
  </div>
</template>
