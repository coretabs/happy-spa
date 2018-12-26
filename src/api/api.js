import user from './user'
import auth from './auth'
import comments from './comments'
import posts from './posts'
import replies from './replies'
import axios from 'axios'
import Vue from 'vue'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://grinn.herokuapp.com'
Cookies.getJSON('logedinUser') ? axios.defaults.headers.common['authorization'] = `Bearer ${Cookies.getJSON('logedinUser').token}` : ''
window.axios = axios

const api = {
  user,
  auth,
  comments,
  posts,
  replies
}

Vue.prototype.$api = api
