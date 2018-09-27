import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://corefun.herokuapp.com' 

const appService = {
  login : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/login/' , data)
        .then(res => {
          resolve(res.data)
          console.log(data , res)
        })
        .catch(err => {
          reject(err)
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
          Cookies.set('logedinUser' , { user : res.data} , { expires: 365 })
        })
        .catch(err => {
          reject(err)
          console.log(err)
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
        })
    })
  },
  comment : comment=> {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1/posts/${comment.postid}/comments/` , comment.data , {
        headers : {
          authorization : `Bearer ${Cookies.getJSON('logedinUser').token}`,
        }
      })
        .then(res => {
          resolve(res.data)
          console.log(res)
        })
        .catch(err => {
          reject(err)
          console.log(err)
        })
    })
  }
}

export default appService
