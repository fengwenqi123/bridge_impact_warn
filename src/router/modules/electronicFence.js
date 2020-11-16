/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index'

const electronicFence = {
  path: '/electronicFence',
  component: Layout,
  redirect: '/electronicFence/electronicFence-list',
  name: 'electronicFence',
  alwaysShow: true,
  meta: { title: '电子围栏管理', icon: 'sys', roles: [] },
  children: [
    {
      path: 'electronicFence-list',
      name: 'electronicFence-list',
      component: () => import('@/views/electronicFence/index'),
      meta: { keepAlive: false, title: '电子围栏管理', roles: [] }
    }
  ]
}

export default electronicFence
