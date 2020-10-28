import router from '@/router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/cache' // 验权

const whiteList = [] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
        // 获取用户信息[]
          const roles = await store.dispatch('GetInfo')
          // 根据用户信息返回的权限列表与路由表进行匹配
          const accessRoutes = await store.dispatch('GenerateRoutes', roles)
          // 动态添加路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('FedLogOut')
          Message.error(error || '验证失败，请再次登录')
          next({ path: '/' })
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 如果跳转登录页，则导航继续，否则跳转到登录页
      to.path === '/login' ? next() : next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
