export default {
    results: () => new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          console.log(err.response)
        })
      })
}