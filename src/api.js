import axios from 'axios'

axios.defaults.baseURL = 'https://coretabs-happy.herokuapp.com'

const appService = {
  getPosts () {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/posts/')
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default appService
