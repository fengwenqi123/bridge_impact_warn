const gisApp = {
  state: {
    app: {},
    coordinate: null,
    coverId: null,
    lonAndLat: null,
    type: null,
    factor: null
  },
  mutations: {
    addMap: (state, views) => {
      state.app.map = views
    },
    saveCoordinate: (state, views) => {
      state.coordinate = views
    },
    setCoverId: (state, views) => {
      state.coverId = views
    },
    setLonAndLat: (state, views) => {
      state.lonAndLat = views
    },
    setFactor: (state, type, factor) => {
      state.factor = factor
      state.type = type
    }
  }
}

export default gisApp
