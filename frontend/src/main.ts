// 字体必须先于样式导入：tokens.css 的 --stack-heading / --stack-body / --stack-mono
// 里只写了字体名，装没装由这几行决定。少一个 import 不报任何错，字只是静默回落到系统字体。
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
