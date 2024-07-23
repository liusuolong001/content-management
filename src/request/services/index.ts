/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2023-12-13 09:37:33
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 10:45:45
 */
import axios from 'axios'
import localCache from '@/utils/cache'
import type { AxiosInstance } from 'axios'
import type { InterceptorsConfig } from './interceptors' /* 需要添加type */

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
        return res.data
      },
      (error) => {
        return error
      }
    )

    /**
     * 针对特定的请求实列添加拦截器
     * 可以添加多拦截器 并且后面的拦截器不会覆盖掉前面的拦截器
     */
    if (config?.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.interceptorsRequest,
        config.interceptors?.interceptorsRequestFail
      )
      this.instance.interceptors.response.use(
        config.interceptors?.interceptorsResponse,
        config.interceptors?.interceptorsResponseFail
      )
    }
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
}
