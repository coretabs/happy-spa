<template>
<div>
  <div v-for="post in posts" :key="post.id">
    author: {{post.author}} <br/>
    content: {{post.content}} <br/>
    created: {{post.created}} <br/>
    Like: {{post.likes_count}} <br/>
    Dislikes: {{post.dislikes_count}}<br/>
    Comments:{{post.comments_count}}
  <hr>
  Comment
  <div v-for="comment in post.comments" :key="comment.id" >
    author: {{comment.author}} <br/>
    content: {{comment.content}}
    <hr/>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data () {
    return {
      posts: [
        {id: 1, author: 'admin', content: 'hello world', created: '2018-06-04T17:39:22.766444Z', likes_count: 0, dislikes_count: 0, comments_count: 3, comments: [{id: 1, author: 'admin', content: 'Good'}, {id: 2, author: 'admin', content: 'hello'}]}
      ]
    }
  }
}
</script>
