import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      userInfo : '',
      postToEdit : '',
      cache : {
        posts : '',
        profile : {},
        comments : {},
        replies : {},
        post : {}
      },
      Rlogin : {}
      
    },
    mutations : {
      setUserInfo (state, info) {
        state.userInfo = info
      },
      set_SignUp (state, info) {
        state.Rlogin = info
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