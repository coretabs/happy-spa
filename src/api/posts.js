export default {
  profile: (user, page) => new Promise((resolve, reject) => {
    axios.get(`/api/v1/auth/user/${user}/posts?page=${page}`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  home: (page) => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/?page=${page}`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  addPost: data => new Promise((resolve, reject) => {
    axios.post('/api/v1/posts/', data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  post: id => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${id}/`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  deletePost: postid => new Promise((resolve, reject) => {
    axios.delete(`/api/v1/posts/${postid}/`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  editPost: (data, postid) => new Promise((resolve, reject) => {
    axios.put(`/api/v1/posts/${postid}/`, data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  like: postid => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${postid}/like/`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  dislike: postid => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${postid}/dislike/`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  report : (postid , reason) => new Promise((resolve, reject) => {
    axios.post(`api/v1/posts/${postid}/report/` , {
      'reason' : reason
    })
    .then (res => {
      resolve(res)
      console.log(res)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  })
}