const ship = {
  state: {
    shipInfo: null,
    type: null,
    phone: null,
    pop: null
  },

  mutations: {
    SET_shipInfo: (state, obj) => {
      state.shipInfo = obj
      state.type = obj.cblxdm
      state.phone = obj.jyrlxdh
      state.pop = obj.jyr
    },
    remove_shipInfo: (state) => {
      state.shipInfo = null
      state.type = null
      state.phone = null
      state.pop = null
    }
  }
}

export default ship
