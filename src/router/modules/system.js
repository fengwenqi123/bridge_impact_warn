/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index'

const system = {
  path: '/system',
  component: Layout,
  redirect: '/system/AuthorizeManagement',
  name: 'system',
  alwaysShow: true,
  meta: { title: '系统管理', icon: 'sys', roles: ['sys'] },
  children: [
    {
      path: 'AuthorizeManagement',
      name: 'AuthorizeManagement',
      component: () => import('@/views/system/AuthorizeManagement/index'),
      meta: { keepAlive: false, title: '权限管理', roles: ['sys:authorize'] }
    },
    {
      path: 'RoleManagement',
      name: 'RoleManagement',
      component: () => import('@/views/system/RoleManagement/index'),
      meta: { keepAlive: false, title: '角色管理', roles: ['sys:role'] }
    },
    {
      path: 'DepManagement',
      name: 'DepManagement',
      component: () => import('@/views/system/DepManagement/index'),
      meta: { keepAlive: false, title: '部门管理', roles: ['sys:department'] }
    },
    {
      path: 'DicManagement',
      name: 'DicManagement',
      component: () => import('@/views/system/DicManagement/index'),
      meta: { keepAlive: false, title: '系统字典管理', roles: ['sys:dictionary'] }
    },
    {
      path: 'UserManagement',
      name: 'UserManagement',
      component: () => import('@/views/system/UserManagement/index'),
      meta: { keepAlive: false, title: '用户管理', roles: ['sys:personnel'] }
    }
  ]
}

export default system
