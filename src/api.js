import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://corefun.herokuapp.com' 

export default {
  login : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/login/' , data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  profile : user => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/auth/user/${user}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  singup : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/registration/' , data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  information : data => {
    return new Promise((resolve, reject) => {
      axios.put('/api/v1/auth/user/' , data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  posts : () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/posts/')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  newPost : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/posts/' , data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  post : id => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${id}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  addComment : comment=> {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1/posts/${comment.postid}/comments/` , comment.data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  comment : (postid , commentid) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  addReply : reply => {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1/posts/${reply.postid}/comments/${reply.commentid}/replies/` , reply.data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  deletePost : postid => {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/v1/posts/${postid}/` ,{
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
  editPost : (data , postid) => {
    return new Promise((resolve, reject) => {
      axios.put(`/api/v1/posts/${postid}/` , data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    })
  },
}
