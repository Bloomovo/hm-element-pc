// 封装 axios 用于发送请求
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index.js'
import router from '@/router'
// 创建一个 axios 实例
const request = axios.create({
  // 基地址
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response) {
    return response.data
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    if (error.response.status === 401) {
      // 给提示，清除无效 token(vuex + 本地)，拦到登录
      Message.error('尊敬的用户，当前登录状态过期！')

      // 提交清除token的mutations
      store.commit('user/logout')

      // 退出
      router.push('/login')
    } else {
      Message.error(error.response.data.message)
    }
  }
  return Promise.reject(error)
})

export default request
