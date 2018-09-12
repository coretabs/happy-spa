import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/profile/Profile'
import LoginPage from '@/components/login/LoginPage'
import Forgot from '@/components/ForgotPassword/Forgot'
import Signup from '@/components/Signup/Signup'
import Information from '@/components/Information/Information'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path : '/',
      component : Home
    },
    {
      path: '/profile',
      name: 'profile-login',
      component: LoginPage
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path : '/forgot',
      name : 'Forgot',
      component : Forgot
    },
    {
      path:'/signup',
      name : 'signup',
      component : Signup
    },
    {
      path : '/information',
      name : 'Information',
      component : Information
    }
  ]
})
