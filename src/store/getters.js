const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  app: state => state.gis.app,
  coordinate: state => state.gis.coordinate,
  coverId: state => state.gis.coverId,
  lonAndLat: state => state.gis.lonAndLat,
  video: state => state.gis.video,
  type: state => state.gis.type,
  shipInfo: state => state.ship.shipInfo,
  phone: state => state.ship.phone,
  shipType: state => state.ship.type,
  pop: state => state.ship.pop
}
export default getters
