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
<<<<<<< HEAD
import Post from '@/components/Post/Post'
//import VerificationStep2 from '@/components/VerificationStep2/VerificationStep2'
=======
import VerificationStep2 from '@/components/VerificationStep2/VerificationStep2'
import UserHome from "@/components/UserHome/UserHome";
>>>>>>> a17d3a5204851cd0d756670e2abf6b0c5b1c9e0a

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
      component : NewPost,
    },
    {
      path : '/post',
      component : Post
    }/*,
    {
      path : '/verificationStep2',
      component : VerificationStep2
    }*/
=======
      component : NewPost
    },
    {
      path : '/VerificationStep2',
      component : VerificationStep2
    }
>>>>>>> a17d3a5204851cd0d756670e2abf6b0c5b1c9e0a
  ]
})
