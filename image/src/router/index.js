import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Posts from '@/components/Posts'
import Post from '@/components/Post'
import Profile from '@/components/profile/Profile'
import ListPosts from '@/components/ListPosts'
import LoginPage from '@/components/login/LoginPage'
import Forgot from '@/components/ForgotPassword/Forgot'
import Signup from '@/components/Signup/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/listposts',
      name: 'ListPosts',
      component: ListPosts
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
      path: '*',
      name: 'NotFound',
      component: NotFound
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
    }
  ]
})
