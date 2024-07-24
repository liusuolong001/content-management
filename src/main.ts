/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 19:10:10
 */

import { createApp } from 'vue'

import './assets/css/main.less'
import 'normalize.css'
import 'element-plus/dist/index.css'
import useLogin from '@/stores/login'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './lang'
import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
// 解决页面刷新router都会变成默认的几项 此方法解决动态配置路由不见问题
const storeLogin = useLogin()
storeLogin.loadLocalCacheAction()
app.use(router)

app.use(ElementPlus)
app.use(i18n)

app.mount('#app')
