// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'

let wsUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : 'http://momentodengi.ru:4200'

Vue.config.productionTip = false
Vue.use(VueSocketio, wsUrl)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
