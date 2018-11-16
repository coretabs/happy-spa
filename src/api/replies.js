export default {
  replies: (postid, commentid, page) => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/?page=${page}`)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  addReply: reply => new Promise((resolve, reject) => {
    axios.post(`/api/v1/posts/${reply.postid}/comments/${reply.commentid}/replies/`, reply.data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
  
  like: (postid, commentid, replyid) => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/${replyid}/like/`)
    .then(res => {
      resolve(res.data)
      console.log('Work')
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),

  dislike: (postid, commentid, replyid) => new Promise((resolve, reject) => {
    axios.get(`/api/v1/posts/${postid}/comments/${commentid}/replies/${replyid}/dislike/`)
    .then(res => {
      resolve(res.data)
      console.log('Work')
    })
    .catch(err => {
      reject(err)
      console.log(err.response)
    })
  }),
}