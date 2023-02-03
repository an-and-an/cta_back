import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'
const service = axios.create({
  baseURL: 'http://yumingxi.xyz:3100/api',
  timeout: 10000,
})
// 拦截请求
service.interceptors.request.use(
  (config: any) => {
    const { state }: any = store;
    const { authorization } = state.app
    if (authorization) {
      config.headers.Authorization = `Bearer ${authorization}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  // 响应成功进入第1个函数，该函数的参数是响应对象
  response => {
    response.data.status = response.data.code
    return response.data
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async error => {
    console.log('err:', error)
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    const redirect = encodeURIComponent(window.location.href)
    router.push(`/login?redirect=${redirect}`)
    // 清除token
    store.dispatch('app/clearToken')
    setTimeout(() => {
      ElMessage.closeAll()
      try {
        ElMessage.error(error.response.data.message)
      } catch (err) {
        ElMessage.error(error.message)
      }
    })
  }
)

export default service
