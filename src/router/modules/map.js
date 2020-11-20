/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index'

const map = {
  path: '/map',
  component: Layout,
  redirect: '/map/mapView',
  name: 'map',
  hidden: true,
  children: [
    {
      path: 'mapView',
      name: 'mapView',
      component: () => import('@/views/map/index')
    }
  ]
}

export default map
