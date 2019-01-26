export default {
    users: (name) => new Promise((resolve, reject) => {
        axios.get(`https://grinn.herokuapp.com/api/v1/auth/users/?username_or_email=${name}`)
        .then(res => {
          resolve(res.data)
          console.log('Data ', res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
    }),
    posts: (post) => new Promise((resolve, reject) => {
      axios.get(`https://grinn.herokuapp.com/api/v1/auth/users/?username_or_email=${post}`)
      .then(res => {
        resolve(res.data)
        console.log('Data ', res.data);
      })
      .catch(err => {
        reject(err)
        console.log(err.response)
      })
  })
}