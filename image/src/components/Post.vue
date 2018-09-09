<template>
  <div>
      author: {{Post.author}} <br/>
      content: {{Post.content}} <br/>
      created: {{Post.created}} <br/>
      Like: {{Post.likes_count}} <br/>
      Dislikes: {{Post.dislikes_count}}<br/>
      Comments:{{Post.comments_count}}
  </div>
</template>
<script>
import appServies from '@/api'

export default {
  name: 'Post',
  data () {
    return {
      id: this.$route.params.id,
      Post: {}
    }
  },
  methods: {
    loadPost () {
      appServies.getPost(this.id)
        .then(data => {
          this.Post = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadPost()
  }
}
</script>

<style>

</style>
