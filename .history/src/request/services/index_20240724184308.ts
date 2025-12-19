/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2023-12-13 09:37:33
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 18:42:11
 */
import axios from 'axios'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { InterceptorsConfig } from './interceptors' /* 需要添加type */
import i18n from '@/lang'

export class HyRequest {
  instance: AxiosInstance

  /**
   * @description: 创建axios实列
   * 为每个请求添加token
   * @return {*}
   */
  /*   */
  constructor(config: InterceptorsConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        const token = localCache.getCache('token')
        if (config.headers && token) {
          config.headers.Authorization = 'Bearer ' + token
        }
        return config
      },
      (error) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 对于request成功response失败处理
        let returnMessage = ''
        let buExceptionFlag = false //处理异常

        switch (res.data.code) {
          case -1002:
            buExceptionFlag = true
            returnMessage = res.data.data || i18n.global.t('returnMessage')
            break
          default:
            break
        }

        if (buExceptionFlag) {
          ElMessage({
            message: returnMessage,
            type: 'error',
            duration: 3 * 1000
          })
        }
        return res.data
      },
      (error) => {
        switch (error.response.status) {
          case 400:
            ElMessage.error(error.response.data)
            break
          default:
            break
        }
        return error
      }
    )
  }

  /*   封装网络请求 axios实列方法 */
  request<T = any>(config: InterceptorsConfig<T>) {
    // 单独拦截器不能加入实例里面this.instance 因为此实例是共同一个的
    if (config.interceptors?.interceptorsRequest) {
      config = config.interceptors.interceptorsRequest(config)
    }
    /**
     * 单次响应的成功拦截
     * request<any, T> 第一个参数any 第二参数是将T传入AxiosResponse中
     */
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.interceptorsResponse) {
            res = config.interceptors.interceptorsResponse(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T = any>(config: InterceptorsConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: InterceptorsConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: InterceptorsConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
