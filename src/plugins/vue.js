
import VueDataLoading from '@/components/vue-data-loading'
import Vue from 'vue'
import VeeValidate from 'vee-validate'


const Plugins = {
  addComponents : vue => {
    vue.component('VueDataLoading' , VueDataLoading)
  },
  install (vue) {
    this.addComponents(vue)
  },
  validators : {
    password : {
      getMessage : field => 'this password is not valid',
      validate : value => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return reg.test(value)
      }
    },
    password2 : {
      getMessage : field => 'it must be like the first password',
      validate : (password2 , {password} = {} ) => password2 == password
    }
  }
}

VeeValidate.Validator.extend('password' , Plugins.validators.password)
VeeValidate.Validator.extend('password2' , Plugins.validators.password2 , {paramNames : ['password']})

Vue.use(Plugins)
Vue.use(VeeValidate)
