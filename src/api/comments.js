  export default {
    addComment: comment => new Promise((resolve, reject) => {
      axios.post(`/api/v1/posts/${comment.postid}/comments/`, comment.data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    comment: (postid, commentid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    postComments: (postid, page) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/?page=${page}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    like: (postid, commentid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/like/`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
    }),
    dislike: (postid, commentid) => new Promise((resolve, reject) => {
      axios.get(`/api/v1/posts/${postid}/comments/${commentid}/dislike/`)
      .then(res => {
        resolve(res.data)
        console.log('Work')
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
    })
  }