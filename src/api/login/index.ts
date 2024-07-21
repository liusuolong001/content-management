import { request } from '@/request'
import type { ILogin } from '@/views/login/type'
import type { ILoginResponse, ILoginResponseData } from './type'

export function login(data: ILogin) {
  return request.post<ILoginResponse<ILoginResponseData>>({
    url: '/login',
    data
  })
}
