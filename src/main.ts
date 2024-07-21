/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-21 18:17:10
 */

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
