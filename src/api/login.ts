/*
 * @Description
 * @Author: liusuolong001
 * @Date: 2024-07-22 02:26:47
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 14:02:26
 */
import { request } from '@/request'
import type { ILogin } from '@/views/login/type'
import type { IResponse, IResponseData } from '@/types/login'

/**
 * @description: 登陆接口
 * @param {ILogin} 账号/密码
 * @return {*}
 */
export function login(data: ILogin) {
  return request.post<IResponse<IResponseData>>({
    url: '/login',
    data
  })
}

/**
 * @description: 查询某个用户
 * @param {id} 用户ID
 * @return {*}
 */
export function getUsersId(id: number) {
  return request.get<IResponse<any>>({
    url: `/users/${id}`
  })
}

/**
 * @description: 查询角色所有菜单
 * @param {id} 角色ID
 * @return {*}
 */
export function getMenuUsers(id: number) {
  return request.get<IResponse<any>>({
    url: `/role/${id}/menu`
  })
}
