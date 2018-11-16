export default {
  login: data => new Promise((resolve, reject) => {
    axios.post("/api/v1/auth/login/", data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  singup: data => new Promise((resolve, reject) => {
    axios.post("/api/v1/auth/registration/", data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
}
