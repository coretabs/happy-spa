// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import '@/../css/style.css'
import '@/../css/bulma.min.css'
import '@/plugins/vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
