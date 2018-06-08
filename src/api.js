import axios from 'axios'

axios.defaults.baseURL = 'https://coretabs-happy.herokuapp.com'

const appService = {
  getPosts() {
    return new Promise((resolve) => {
      axios.get(`/api/v1/posts/`)
      .then(response => {
        resolve(response.data)
      })
    })
  }
}

 export default appService
