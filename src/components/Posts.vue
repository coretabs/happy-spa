<template>
<div>
  <div v-for="post in posts" :key="post.author">
    author: {{post.author}} <br/>
    content: {{post.content}} <br/>
    created: {{post.created}} <br/>
    Like: {{post.likes_count}} <br/>
    Dislikes: {{post.dislikes_count}}<br/>
    Comments:{{post.comments_count}}
  <!-- <hr>
  Comment
  <div v-for="comment in post.comments" :key="comment.id" >
    author: {{comment.author}} <br/>
    content: {{comment.content}}
    <hr/>
  </div> -->
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
          console.log(`Posts : ${data}`)
        })
    }
  },
  created () {
    this.loadPosts()
  }
}
</script>
