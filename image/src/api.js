import axios from 'axios'

axios.defaults.baseURL = 'https://coretabs-happy.herokuapp.com'

const appService = {
  getPosts () {
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
  getPost (id) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${id}/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(res => {
          reject(res)
        })
    })
  }
}

export default appService
