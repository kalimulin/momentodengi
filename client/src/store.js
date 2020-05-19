import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  // Initial state
  state: {
    city: 'Астрахань',
    region_name: 'Астраханская область',
    currentOffice: {
      id: 1,
      let: '46.351060',
      lng: '48.036915'
    },
    officesOfCity: [],
    user_select_region: false,
    phoneNumber: '8 (800) 3333-608',
    regions: [],
    offices: []
  },
  // Mutations
  mutations: {
    CHANGE_CITY: (state, payload) => {
      state.city = payload.city
      if (payload.city && state.offices.length > 0) {
        state.officesOfCity = state.offices.filter((office) => {
          return office.city === payload.city
        })
        state.currentOffice = state.officesOfCity[0]
      }
    },
    CHANGE_REGION: (state, payload) => {
      state.region_name = payload.region_name
    },
    CHANGE_OFFICE: (state, payload) => {
      state.currentOffice = payload.office
    },
    GET_REGIONS: (state, payload) => {
      state.regions = payload.regions
    },
    GET_OFFICES: (state, payload) => {
      state.offices = payload.offices
    },
    USER_SELECT_REGION: (state, payload) => {
      state.user_select_region = payload.user_select_region
    }
  }
})
