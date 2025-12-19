import { BASE_URL, TIME_OUT } from './config'
import { HyRequest } from './services'

export const request = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 多个实列
/* export const HyRequestReact = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    interceptorsRequest: (config) => {
      // console.log('REACT请求', config)
      return config
    },
    interceptorsRequestFail: (error: any) => {
      return error
    },
    interceptorsResponse: (res) => {
      // console.log('REACT响应')
      return res
    },
    interceptorsResponseFail(error) {
      return error
    }
  }
}) */
