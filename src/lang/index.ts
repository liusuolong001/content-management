/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 17:35:42
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 19:09:46
 */
import { createI18n } from 'vue-i18n'
import zh from './zh-CN'
import en from './en-US'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // 设定语言为中文
  messages: {
    zh,
    en
  }, // 加载语言文件
  globalInjection: true
})

export default i18n
