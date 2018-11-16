import axios from 'axios'
export default {
  setInformation: data => new Promise((resolve, reject) => {    
    axios.put('/api/v1/auth/user/', data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  profile: user => new Promise((resolve, reject) => {
    axios.get(`/api/v1/auth/user/${user}/`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  getSocial : () => new Promise ( (resolve , reject) => {
    axios.get(`/api/v1/social/`)
    .then (res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  deleteSocial : id => new Promise ( (resolve , reject) => {
    axios.delete(`/api/v1/social/${id}`)
    .then (res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  addSocial : link => new  Promise ( (resolve , reject) => { 
    
  })

}