/** 大文件分片上传的编排（纯逻辑，不含任何界面代码）。
 *
 *  为什么要有它：生产服务器在美国，宿舍网上传 50MB 可能要几分钟。
 *  单次 POST 在这条链路上就是个「全有或全无」的赌注 —— 断一次网、手一抖刷新页面，
 *  已经花掉的几分钟全部白交，而且重来还得从头传。
 *  切成分片之后，每一片都是独立可重来的单元，重传成本从「整个文件」降到「一片」。
 *
 *  与小文件的关系：≤8MB 继续走原来那条单请求直传（`orderApi.upload`）。
 *  它们不是两套系统，服务端两条路的落库逻辑是同一段代码。
 */
import { ApiError } from '@/api/client'
import { chunkApi, orderApi } from '@/api/endpoints'
import type { ChunkSession, UploadOptions, UploadResponse } from '@/api/types'

/** 单文件的硬上限，与后端 config.MAX_UPLOAD_MB 对齐（服务端才是最终把关者）。 */
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024

/** 超过这个尺寸才切分片。小文件直传更省事，也少两三个来回的延迟。 */
const CHUNK_THRESHOLD = 8 * 1024 * 1024

/** 进度条的百分比只走到 99，最后 1% 留给「合并 + 落库」那一次请求。
 *  否则进度条会在 100% 上干等着不动，看着像卡死了。 */
const MAX_PROGRESS = 99

export interface UploadProgress {
  /** 0-100 */
  percent: number
  /** 已经传上去的字节数，用来显示「12.4 / 46.0 MB」 */
  uploaded: number
  total: number
}

export type ProgressHandler = (progress: UploadProgress) => void

/** 这一片应该有多大。最后一片通常是零头，所以不能一律按 chunk_size 算。 */
function partSize(index: number, totalSize: number, chunkSize: number): number {
  const start = index * chunkSize
  return Math.min(chunkSize, totalSize - start)
}

/**
 * 上传一个文件，必要时自动切分片。返回下单结果。
 *
 * 传同一个文件（同名同大小）时，服务端会复用上次没传完的会话，
 * 于是这里会自动跳过已经收到过的分片 —— 这就是断点续传。
 */
export async function uploadFile(
  file: File,
  options: UploadOptions,
  onProgress: ProgressHandler,
  onSessionCreated?: (uploadId: string) => void,
): Promise<UploadResponse> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new ApiError(
      `单个文件不得超过 ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB`,
      413,
      413,
    )
  }

  if (file.size <= CHUNK_THRESHOLD) {
    const data = await orderApi.upload(file, options, (percent) => {
      onProgress({ percent: percent * (MAX_PROGRESS / 100), uploaded: file.size, total: file.size })
    })
    onProgress({ percent: 100, uploaded: file.size, total: file.size })
    return data
  }

  return uploadChunked(file, options, onProgress, onSessionCreated)
}

async function uploadChunked(
  file: File,
  options: UploadOptions,
  onProgress: ProgressHandler,
  onSessionCreated?: (uploadId: string) => void,
): Promise<UploadResponse> {
  // 1. 开会话。同名同大小会拿回上次那份（resumed），它的 received 就是续传的起点。
  const session: ChunkSession = await chunkApi.init(file.name, file.size)
  // 通知组件会话已建立，组件以此追踪 active upload_id，卸载时若仍未完成就清理
  onSessionCreated?.(session.upload_id)
  const { upload_id: uploadId, chunk_size: chunkSize, total_chunks: totalChunks } = session
  const received = new Set(session.received ?? [])

  // 已经传过的分片要算进进度里。不然续传时进度条从 0% 起步，
  // 用户会以为白传了，然后关掉页面 —— 恰好把想保住的成果扔掉。
  let uploaded = 0
  for (const index of received) uploaded += partSize(index, file.size, chunkSize)

  const report = (): void => {
    if (!file.size) return
    const percent = Math.min(MAX_PROGRESS, Math.round((uploaded / file.size) * MAX_PROGRESS))
    onProgress({ percent, uploaded, total: file.size })
  }
  report()

  // 2. 补传缺的分片。
  //
  // 串行，不并发。直觉上并发更快，但这里的瓶颈是上行带宽而不是往返延迟：
  // 总量固定，几条 TCP 连接互相抢的还是同一条出口，传完的总时长几乎不变，
  // 却要多占一个服务端线程（waitress 一共只有 8 个）、多一条跨洋连接。
  // 串行还让进度条单调递增 —— 并发时几个分片的进度会互相回退，看着像卡住了。
  for (let index = 0; index < totalChunks; index += 1) {
    if (received.has(index)) continue
    const start = index * chunkSize
    const blob = file.slice(start, Math.min(start + chunkSize, file.size))
    const base = uploaded

    await chunkApi.putChunk(uploadId, index, blob, (percent) => {
      uploaded = base + (blob.size * percent) / 100
      report()
    })

    uploaded = base + blob.size
    report()
  }

  // 3. 分片齐了，合并落盘并建单。
  const data = await chunkApi.complete(uploadId, options)
  onProgress({ percent: 100, uploaded: file.size, total: file.size })
  return data
}

/**
 * 页面上那条「上次还有一份没传完」的提醒要用它。
 *
 * 为什么不自己用 localStorage 记：服务端早就按「文件名 + 大小」认得出同一份文件，
 * 再在浏览器里存一份指纹纯属重复记账，还得处理隐私模式下 localStorage 直接抛异常。
 * 而且这条服务端记录**刷新页面也还在**，比浏览器本地存储更靠谱。
 */
export async function pendingUploads(): Promise<ChunkSession[]> {
  try {
    const data = await chunkApi.pending()
    return data.sessions ?? []
  } catch {
    // 这只是个锦上添花的提示，拿不到就当没有，不要把上传页搞成报错现场
    return []
  }
}

/** 把字节数说成人话。 */
export function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
