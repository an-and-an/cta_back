/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-09-18 15:44:39
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: 'http://yumingxi.xyz:3100/api',
  timeout: 10000,
  // withCredentials: true,
})
// 拦截请求
service.interceptors.request.use(
  config => {
    const { authorization } = store.state.app
    /**
     * const authorization = store.state.app.authorization
     * cosnt { authorization } = store.state.app
     */
    // console.log(authorization)
    if (authorization) {
      config.headers.Authorization = `Bearer ${authorization}`
    }
    return config
  },
  error => {
    // console.log(error);
    return Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  // 响应成功进入第1个函数，该函数的参数是响应对象
  response => {
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
