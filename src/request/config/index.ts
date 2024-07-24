/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2023-12-13 10:07:39
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 14:18:07
 */

/**
 *【第二种】
 * 区分开发和生产环境vite
 * import.meta.env.DEV;是否是开发环境
 * import.meta.env.PROD;是否是生产环境
 * import.meta.env.SSR;是否是服务端渲染
 *【第三种 根目录创建三个文件】
 * env;生产环境/开发环境
 * env.production;生产环境
 * emv.development;开发环境
 */

let BASE_URL = ''
const TIME_OUT = 10000
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.PROD)
// console.log(import.meta.env.SSR)
if (import.meta.env.DEV) {
  BASE_URL = 'http://codercba.com:5000'
} else {
  BASE_URL = 'http://888.207.32.32:5000'
}

export { BASE_URL, TIME_OUT }
