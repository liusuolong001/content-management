/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 14:02:21
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 16:06:20
 */
import { request } from '@/request'
import type { IResponse } from '@/types/login'
import type { IResponseData } from '@/types/system'

/**
 * @description: 查询用户列表
 * @return {*}
 */
export function getUserList(data: any) {
  return request.post<IResponse<IResponseData>>({
    url: '/users/list',
    data
  })
}

/**
 * @description: 删除某个用户
 * @param {number} 用户id
 * @return {*}
 */
export function getDeleteUser(id: number) {
  return request.delete<IResponse<any>>({
    url: `/users/${id}`
  })
}
