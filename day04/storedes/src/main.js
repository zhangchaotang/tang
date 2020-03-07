import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入axios
import axios from 'axios'
// 引入mockjs
// import './Mock'
axios.defaults.baseURL = 'http://127.0.0.1:9999/api/v1'
Vue.prototype.$http = axios
// 注册vant
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
