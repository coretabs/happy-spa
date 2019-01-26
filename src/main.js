import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import  {i18n} from  './i18n/i18n.js'
import store from './store/store'
import '@/../css/bulma.min.css'
import '@/../css/style.css'
import '@/../css/fonts.css'
import '@/plugins/vue'


Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  ...App,
}).$mount('#app')
