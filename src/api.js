import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://corefun.herokuapp.com'

let isLogin = () => {
  if (Cookies.getJSON('logedinUser')) {
    axios.defaults.headers.common['authorization'] = `Bearer ${Cookies.getJSON('logedinUser').token}`
  }
}

isLogin()

export default {
  login: data =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.post('/api/v1/auth/login/', data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  profile: {
    info: user =>
      new Promise((resolve, reject) => {
        isLogin()
        axios.get(`/api/v1/auth/user/${user}/`)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
            console.log(err.response)
          })
      }),
    posts: (user, page) =>
      new Promise((resolve, reject) => {
        isLogin()
        axios.get(`/api/v1/auth/user/${user}/posts?page=${page}`)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
            console.log(err.response)
          })
      }),
  },
  singup: data =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.post('/api/v1/auth/registration/', data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  information: data =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.put('/api/v1/auth/user/', data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  posts: (page) =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.get(`/api/v1/posts/?page=${page}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  newPost: data =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.post('/api/v1/posts/', data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  post: id =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.get(`/api/v1/posts/${id}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  addComment: comment =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.post(`/api/v1/posts/${comment.postid}/comments/`, comment.data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  comment: (postid, commentid) =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  replies: (postid, commentid, page) =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/?page=${page}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  addReply: reply =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.post(`/api/v1/posts/${reply.postid}/comments/${reply.commentid}/replies/`, reply.data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  deletePost: postid =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.delete(`/api/v1/posts/${postid}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  editPost: (data, postid) =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.put(`/api/v1/posts/${postid}/`, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  postComments: (postid, page) =>
    new Promise((resolve, reject) => {
      isLogin()
      axios.get(`/api/v1/posts/${postid}/comments/?page=${page}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  like: {
    post: postid => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/like/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
    comment: (postid, commentid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/like/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
    reply: (postid, commentid, replyid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/${replyid}/like/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  },
  dislike: {
    post: postid => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/dislike/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
    comment: (postid, commentid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/dislike/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
    reply: (postid, commentid, replyid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/${replyid}/dislike/`)
        .then(res => {
          resolve(res.data)
          console.log('Work')
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
  },
  links: {
    get : () => new Promise ( (resolve , reject) => {
      axios.get(`/api/v1/social/`).then (res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    delete : id => new Promise ( (resolve , reject) => {
      axios.delete(`/api/v1/social/${id}`).then (res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    add : link => new  Promise ( (resolve , reject) => { 
      axios.get
    })
  }
}
