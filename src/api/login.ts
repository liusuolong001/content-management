/*
 * @Description
 * @Author: liusuolong001
 * @Date: 2024-07-22 02:26:47
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 02:32:49
 */
import { request } from '@/request'
import type { ILogin, IResponse, IResponseData } from '@/views/login/type'

export function login(data: ILogin) {
  return request.post<IResponse<IResponseData>>({
    url: '/login',
    data
  })
}
