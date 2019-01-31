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
    axios.get(`/api/v1/auth/user/links`)
    .then (res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  editSocial : links => new Promise ( (resolve , reject) => {
    axios.put(`/api/v1/auth/user/links/` , links)
    .then (res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
}