import { setToken, getToken } from '@/utils/storage'
import { login } from '@/api/login'

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
      console.log('success')
    }
  },
  actions: {
    async loginAction (context, form) {
      // 得到 login 后返回数据
      const { data } = await login(form)
      // 将 token 转给 mutations
      context.commit('setUserToken', data.token)
    }
  }
}
