import { setToken, getToken } from '@/utils/storage'
import { login } from '@/api/login'
import { Message } from 'element-ui'

// 本地化储存
export default {
  namespaced: true,
  state () {
    return {
      token: getToken()
    }
  },
  mutations: {
    setUserToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async loginAction (context, form) {
      // 得到 login 后返回数据
      const res = await login(form)
      if (!res) {
        return
      }
      Message.success(res.message)
      const { data } = res
      // 将 token 转给 mutations
      context.commit('setUserToken', data.token)
    }
  }
}
