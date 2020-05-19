// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import store from './store';

Vue.use(VeeValidate)
Vue.use(VueResource)

// Vue.config.productionTip = false
// Vue.http.headers.common['Access-Control-Allow-Origin'] = true
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.options.credentials = true
// Vue.http.options.emulateHTTP = true

new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
