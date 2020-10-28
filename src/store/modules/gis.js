const gisApp = {
  state: {
    app: {},
    coordinate: null,
    coverId: null,
    lonAndLat: null
  },
  mutations: {
    addMap: (state, views) => {
      state.app.map = views
      console.log(state.app)
    },
    saveCoordinate: (state, views) => {
      state.coordinate = views
      console.log(state.coordinate)
    },
    setCoverId: (state, views) => {
      state.coverId = views
      console.log(state.coverId)
    },
    setLonAndLat: (state, views) => {
      state.lonAndLat = views
      console.log(state.lonAndLat)
    }
  }
}

export default gisApp
