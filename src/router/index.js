import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Posts from '@/components/Posts'
import Post from '@/components/Post'
import Profile from '@/components/Profile'
import ListPosts from '@/components/ListPosts'

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
      name: 'Profile',
      component: Profile
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
