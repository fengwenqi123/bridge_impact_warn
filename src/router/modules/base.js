const base = [{
  path: '/',
  redirect: '/map'
}, {
  path: '/home',
  component: () => import('@/views/home'),
  hidden: true
}, {
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}]
export default base
