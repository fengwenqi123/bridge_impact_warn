/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index'

const video = {
  path: '/video',
  component: Layout,
  redirect: '/video/video-list',
  name: 'video',
  alwaysShow: true,
  meta: { title: '视频管理', icon: 'sys', roles: ['sys'] },
  children: [
    {
      path: 'video-list',
      name: 'video-list',
      component: () => import('@/views/video/list/index'),
      meta: { keepAlive: false, title: '视频列表', roles: [] }
    }
  ]
}

export default video
