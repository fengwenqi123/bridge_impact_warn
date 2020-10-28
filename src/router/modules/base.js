const base = [{
  path: '/',
  redirect: '/home'
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
}, {
  path: '/map',
  component: () => import('@/views/map'),
  hidden: true
}]
export default base
