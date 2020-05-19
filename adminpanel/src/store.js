import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  // Initial state
  state: {
    username: '',
    token: '',
    fetchStatus: 'ready',
    fetchResult: 'error'
  },
  // Mutations
  mutations: {
    CHANGE_USERNAME: (state, payload) => {
      state.username = payload
    },
    CHANGE_TOKEN: (state, payload) => {
      state.token = payload
    },
    CHANGE_FETCH_STATUS: (state, payload) => {
      state.fetchStatus = payload
    },
    CHANGE_FETCH_RESULT: (state, payload) => {
      state.fetchResult = payload
    }
  }
})
