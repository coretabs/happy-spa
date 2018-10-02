import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      emailRegExp : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      passwordRegExp : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      usernameRegExp : /^[a-zA-Z]*$/,
      userInfo : '',
      postToEdit : ''
    },
    mutations : {
      setUserInfo (state, info) {
        state.userInfo = info
      },
      postToEdit (state, post) {
        state.postToEdit = post
      }
    }
})