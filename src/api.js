import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://corefun.herokuapp.com' 

const appService = {
  login : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/login/' , data)
        .then(res => {
          resolve(res.data)
          axios.post('/api/v1/auth/token/', data)
          .then (re => {
            Cookies.set('token' , String(re.data.token) , { expires: 365 })
          })
          .catch(er => {
            Cookies.remove('logedinUser')
            alert('try again please')
          })
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
      axios.defaults.headers.common.token  = Cookies.get('token')
      console.log(axios.defaults.headers.common)

      axios.put('/api/v1/auth/user/' , data)
        .then(res => {
          resolve(res.data)
          
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default appService
