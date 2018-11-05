
import VueDataLoading from '@/components/vue-data-loading'
import Vue from 'vue'
import VeeValidate from 'vee-validate'


const Plugins = {
  addComponents : vue => {
    vue.component('VueDataLoading' , VueDataLoading)
  },
  chatreInit : (d, w, c) =>  {
    w.ChatraID = 'Ty9iqgBujvxhx94bB';
    var s = d.createElement('script');
    w[c] = w[c] || function() {
        (w[c].q = w[c].q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (d.head) d.head.appendChild(s);
  },
  install (vue) {
    this.addComponents(vue)
    this.chatreInit(document, window, 'Chatra')
    this.chatraSettings()
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
  },
  chatraSettings : ()=> {
    Chatra('setButtonSize', 40)
    Chatra('setColors', {
      buttonText: '#ffe600',
      buttonBg: '#ffffff'
    })
    Chatra('hide')
  }
}


// vee validate settings
VeeValidate.Validator.extend('password' , Plugins.validators.password)
VeeValidate.Validator.extend('password2' , Plugins.validators.password2 , {paramNames : ['password']})

Vue.use(Plugins)
Vue.use(VeeValidate , {events : 'keyup'})
