
import VueDataLoading from '@/components/vue-data-loading'
import Vue from 'vue';


const Plugins = {
  addComponents : vue => {
    vue.component('VueDataLoading' , VueDataLoading)
  },
  install (vue) {
    this.addComponents(vue)
  }
}

Vue.use(Plugins)