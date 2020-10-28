import { login, logout, getInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/cache'

const user = {
  state: {
    roles: [],
    userInfo: null
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, user) => {
      state.userInfo = user
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.loginType, userInfo.loginSource).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(getToken()).then(response => {
          const data = response.data
          commit('SET_USERINFO', data)
          commit('SET_ROLES', data.authorizeSet)
          resolve(data.authorizeSet)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(getToken()).then(() => {
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
