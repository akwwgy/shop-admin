import { createApp } from 'vue'
import { router } from './router/index'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store/index'

import App from './App.vue'

const app = createApp(App);

app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)

app.use(ElementPlus);

import 'virtual:windi.css'

import "./permission.js"

import "nprogress/nprogress.css"

import permission from '@/directives/permission'

app.use(permission)

app.mount('#app')
