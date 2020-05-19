// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import VueLocalStorage from 'vue-localstorage'
import tinymce from 'vue-tinymce-editor'

let wsUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : 'http://momentodengi.ru:4200'

Vue.config.productionTip = false
Vue.use(VueSocketio, wsUrl)
Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)
Vue.component('tinymce', tinymce)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
