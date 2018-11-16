import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import '@/../css/bulma.min.css'
import '@/../css/style.css'
import '@/../css/fonts.css'
import '@/plugins/vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
