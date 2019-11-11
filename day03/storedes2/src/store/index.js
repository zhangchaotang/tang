import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartNum: ''
  },
  mutations: {
    cartNumChange (state, data) {
      state.cartNum = data
    }
  },
  actions: {
  },
  modules: {
  }
})
