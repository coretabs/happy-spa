import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      emailRegExp : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      passwordRegExp : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      usernameRegExp : /^[a-zA-Z]*$/,
      userInfo : '',
      postToEdit : '',
      cache : {
        posts : '',
        profile : {},
        comments : {},
        replies : {},
        post : {}
      }
    },
    mutations : {
      setUserInfo (state, info) {
        state.userInfo = info
      },
      postToEdit (state, post) {
        state.postToEdit = post
      },
      cachePosts(state , posts) {
        state.cache.posts = posts
        setTimeout(()=>{
          state.cache.posts = false
        }, 600000)
      },
      cacheProfile(state , profile) {
        state.cache.profile[profile.user.username] = profile
        setTimeout(()=>{
          state.cache.profile = {}
        }, 600000)
      },
      cachePost(state , post){
        state.cache.post[post.id] = post
        setTimeout(()=>{
          state.cache.post = {}
        }, 600000)
      },
      cacheComments(state , comments) {

        state.cache.comments[comments.id] = comments
        setTimeout(()=>{
          state.cache.comments = {}
        }, 600000)
      },
      cacheReplies(state , replies) {
        state.cache.replies[replies.id] = replies
        setTimeout(()=>{
          state.cache.replies = {}
        }, 600000)
      },
      claerCache(state) {
        state.cache.posts = ''
        state.cache.comments = {}
        state.cache.post = {}
        state.cache.replies = {}
      }
    }
  })