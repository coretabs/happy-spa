import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      emailValidate : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      userInfo : '',
      passwordValidate : /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9#-_!]+)$/
    },
    mutations : {
      setUserInfo (state, info) {
        state.userInfo = info
      }
    }
})