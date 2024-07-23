/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 11:14:03
 */

import { createApp } from 'vue'

import './assets/css/main.less'
import 'normalize.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
