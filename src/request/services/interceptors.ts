/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2023-12-13 11:21:50
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-16 10:49:48
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// T 设置默认值
interface HyInterceptors<T = AxiosResponse> {
  interceptorsRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
  interceptorsRequestFail?: (error: any) => any
  interceptorsResponse?: (res: T) => T
  interceptorsResponseFail?: (error: any) => any
}

/*  扩展请求响应拦截器 */
export interface InterceptorsConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HyInterceptors<T>
}
