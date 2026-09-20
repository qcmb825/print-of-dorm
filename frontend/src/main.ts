// 字体必须先于样式导入：tokens.css 的 --stack-heading / --stack-body / --stack-mono
// 里只写了字体名，装没装由这几行决定。少一个 import 不报任何错，字只是静默回落到系统字体。
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'
// 中文字体（思源黑体）的分片 @font-face。由 `npm run fonts:build` 生成后入库，
// 部署端不装 Node 也能用。**必须排在 --fontsource 之后**（没有功能依赖，只是让
// 「拉丁在前、中文在后」的顺序在源码里也一眼可见，与 tokens.css 的字体栈一致）。
import '@/assets/fonts/index.css'
import '@/styles/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
