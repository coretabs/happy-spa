<template>
  <div>
    <div class="post" v-for="post in posts" :key="post.id">
      <h3>Title: {{ post.title }}</h3>
      <p>Description: {{ post.body }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    var self = this
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(function (res) {
        self.posts = res.data
        console.log('Data: ', res.data)
      })
      .catch(function (error) {
        console.log('Error: ', error)
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
