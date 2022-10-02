import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入element-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import './assets/style/element-variables.scss'

// 引入中文语言包
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 引入路由
import router from './router'

// 引入store
import store from './store'

// 权限控制
import './permission'

// 引入svg图标注册脚本
// import 'vite-plugin-svg-icons/'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

// 注册自定义指令
import * as Directives from '@/directive'
Object.values(Directives).forEach(fn => fn(app))

// 错误日志
import useErrorHandler from './error-log'

useErrorHandler(app)
// 
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
app
  .use(ElementPlus, {
    locale,
  })
  .use(store)
  .use(router)
  .component('QuillEditor', QuillEditor)
  .mount('#app')