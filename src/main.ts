/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 16:46:57
 */

import { createApp } from 'vue'

import useLogin from '@/stores/login'
import './assets/css/main.less'
import 'normalize.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import VueI18n from 'vue-i18n'

import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const i18n = new VueI18n({
  locales: ['en', 'de'],
  messages: {
    // 你的语言信息
    // 'zh-CN': require('./lang/zh-CN'),
    // en: require('./lang/en')
  }
})

app.use(pinia)
// 解决页面刷新router都会变成默认的几项 此方法解决动态配置路由不见问题
const storeLogin = useLogin()
storeLogin.loadLocalCacheAction()
app.use(router)

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
