import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/profile/Profile'
import LoginPage from '@/components/login/LoginPage'
import Forgot from '@/components/ForgotPassword/Forgot'
import Signup from '@/components/Signup/Signup'
import Information from '@/components/Information/Information'

import UserHome from "@/components/UserHome/UserHome"
import More from '@/components/More/More'
import Settings from '@/components/Settings/Settings'
import NewPost from '@/components/NewPost/NewPost'

import Post from '@/components/Post/Post'
import VerificationStep2 from '@/components/VerificationStep2/VerificationStep2'


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
    },
    {
      path : '/home',
      component : UserHome
    },
    {
<<<<<<< HEAD

||||||| merged common ancestors
<<<<<<< HEAD
=======
>>>>>>> f92c00a68f51a0fddf49b3a7d5b9793b3721adb0
      path : '/more',
      component : More
    },
    {
      path : '/settings',
      component : Settings
    },
    {
      path : '/newpost',
<<<<<<< HEAD
      component : NewPost
    },
    {
      path : '/VerificationStep2',
||||||| merged common ancestors
      component : NewPost
=======
      path : '/VerificationStep2',
=======
      component : NewPost,
    },
    {
      path : '/post',
      component : Post
    },
    {
      path : '/verificationstep2',
>>>>>>> f92c00a68f51a0fddf49b3a7d5b9793b3721adb0
      component : VerificationStep2
<<<<<<< HEAD

||||||| merged common ancestors
>>>>>>> f7b9bbadab3e2ed3f430256156c4a7b41b3a986c
=======
>>>>>>> f92c00a68f51a0fddf49b3a7d5b9793b3721adb0
    }
  ]
})
