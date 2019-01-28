import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Profile from '@/pages/profile/Profile'
import LoginPage from '@/pages/login/LoginPage'
import Forgot from '@/pages/ForgotPassword/Forgot'
import Signup from '@/pages/Signup/Signup'
import Information from '@/pages/Information/Information'
import UserHome from "@/pages/UserHome/UserHome"
import More from '@/pages/More/More'
import Settings from '@/pages/Settings/Settings'
import NewPost from '@/pages/NewPost/NewPost'
import Post from '@/pages/Post/Post'
import Replies from '@/pages/Replies/Replies'
import VerificationStep2 from '@/pages/VerificationStep2/VerificationStep2'
import PostComments from '@/pages/PostComments/PostComments'
import ManageEmails from '@/pages/ManageEmails/ManageEmails'
import Social from '@/pages/Social/Social'
import Search from '@/pages/Search/Search'
import Results from '@/pages/Results/Results'
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import TermsOfService from '@/pages/TermsOfService/TermsOfService'
import ConnectUs from '@/pages/ConnectUs/ConnectUs'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    path : '/',
    name: 'Home',
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
    path : '/manageemails',
    name : 'ManageEmails',
    component : ManageEmails
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
    component : NewPost
    },
    {
    path : '/post',
    component : Post,
    },
    {
    path : '/verificationstep2',
    component : VerificationStep2
    },
    {
    path : '/replies',
    component : Replies
    },
    {
    path : '/comments',
    component: PostComments
    },
    {
    path : '/links',
    component : Social
    },
    {
    path : '/search',
    component : Search
    },
    {
    path : '/results',
    component : Results
    },
    {
    path : '/privacy-policy',
    component : PrivacyPolicy
    },
    {
    path : '/terms-of-service',
    component : TermsOfService
    },
    {
    path : '/connect-us',
    component : ConnectUs
    }
  ]
})
