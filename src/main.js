import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible.js'
import './assets/css/style.css'
import router from './router.js'
import store from './vuex/store.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
