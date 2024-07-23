/*
 * @Description: 封装localStorage
 * @Author: liusuolong001
 * @Date: 2024-07-22 16:26:24
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 16:40:01
 */
class localCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    localStorage.removeItem(key)
  }
  clearCache() {
    localStorage.clear()
  }
}

export default new localCache()
