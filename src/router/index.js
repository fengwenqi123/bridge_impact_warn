import Vue from 'vue'
import Router from 'vue-router'
import base from './modules/base'
import system from './modules/system'

Vue.use(Router)

// 解决router回调报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  ...base
]

export const asyncRouterMap = [
  system,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
