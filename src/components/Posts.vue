<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      author: {{post.author}} <br/>
      <router-link :to="'/posts/' + post.id">content:</router-link> {{post.content}} <br/>
      created: {{post.created}} <br/>
      Like: {{post.likes_count}} <br/>
      Dislikes: {{post.dislikes_count}}<br/>
      Comments:{{post.comments_count}}
      <hr>
    </div>
  </div>
</template>

<script>
import appService from '@/api'
export default {
  name: 'Posts',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    loadPosts () {
      appService.getPosts()
        .then(data => {
          this.posts = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadPosts()
  }
}
</script>
