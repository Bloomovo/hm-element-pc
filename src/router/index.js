import Vue from 'vue'
import store from '@/store/index.js'
import { Message } from 'element-ui'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Article from '@/views/article/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'article', component: Article }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 白名单
const whiteList = ['/login']

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 是否存在 token
  const token = store.state.user.token
  if (token) {
    next()
    return
  }

  // 是否在白名单中
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 其它情况
  Message.warning('登录后方可进入')
  next('/login')
})

export default router
