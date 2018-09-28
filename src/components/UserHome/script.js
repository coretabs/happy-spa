import Corefun from '@/api'
import Cookies from "js-cookie";
export default {
    created () {
      if (this.$route.query.id) {
        if (Cookies.getJSON('logedinUser') ){
          if (Cookies.getJSON('logedinUser').user.username == this.$route.query.id) {
            this.getPosts()
          } else {
            this.$router.push(`/home?id=${Cookies.getJSON('logedinUser').user.username}`)
            this.getPosts()
          }
        } else {
          this.$router.push('/login?from=/home')
        }
      } else if (Cookies.getJSON('logedinUser') ){
        this.$router.push(`/home?id=${Cookies.getJSON('logedinUser').user.username}`)
        this.getPosts()
      } else {
        this.$router.push('/login?from=/home')
      }
    },
    data : () => {
      return {
        posts : '',
        loading : true,
        media : {}
      }
    },
    methods : {
      getPosts () {
        Corefun.posts()
        .then (re => { 
          this.posts = re
          this.loading = false
          re.forEach( post => {
            this.media[post.id]  =  post.mediafile ? post.mediafile.split('.')[post.mediafile.split('.').length - 1] : undefined
          })
        })
      }
    }
}