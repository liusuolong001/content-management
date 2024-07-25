/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 17:35:42
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 18:03:53
 */
import { createI18n } from 'vue-i18n'
import { zhCn } from './zh-CN'
import { enUs } from './en-US'

const i18n = createI18n({
  legacy: false,
  locale: 'zhCn', // 设定语言为
  messages: {
    zhCn,
    enUs
  }, // 加载语言文件
  globalInjection: true
})

export default i18n
