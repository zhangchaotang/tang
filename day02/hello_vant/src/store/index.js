import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cat_id: ''
  },
  mutations: {
    catChange (state, data) {
      state.cat_id = data
    }
  },
  actions: {
  },
  modules: {
  }
})
