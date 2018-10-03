import Corefun from '@/api'
import Cookies from "js-cookie";
export default {
    created () {
      if (this.$route.query.id) {
        if (Cookies.getJSON('logedinUser') ){
          if (Cookies.getJSON('logedinUser').user.username == this.$route.query.id) {
            this.getPosts()
          } else {
            this.$router.push('/home')
            this.getPosts()
          }
        } else {
          this.$router.push('/login?from=/home')
        }
      } else if (Cookies.getJSON('logedinUser') ){
        this.$router.push('/home')
        this.getPosts()
      } else {
        this.$router.push('/login?from=/home')
      }
    },
    data : () => {
      return {
        posts : '',
        loading : true,
        media : {},
        username : Cookies.getJSON('logedinUser').user.username,
        menu : false,
        postid : '',
        selectedPost : '',
        Error : false ,
        ErrorMsg : '',
        confirmMsg : '',
        confirm : false,
        postToEdit : ''
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
      },
      showConfirm(doit) {
        this.menu = false
        if (this.confirm) {
          this.confirmMsg = 'هل تريد حقا حذف المنشور'
          document.querySelector(`.confirm`).style.display = 'block'
          document.querySelector('.grayContentPage ').classList.add('blur')
        } else {
          if (doit) {
            this.deletePost()
          }
          document.querySelector('.confirm').style.display = 'none'
          document.querySelector('.grayContentPage').classList.remove('blur')
        }
    },
    showMenu(postid) {
      this.menu = !this.menu
      this.postid = postid
      this.posts.forEach(pst => {
        pst.id == this.postid ? this.postToEdit = pst : ''
      });
    },
    deletePost() {
      Corefun.deletePost(this.postid).then(() => {
        this.getPosts()
      })
    },
    editPost() {
      this.$store.commit('postToEdit', this.postToEdit)
      this.$router.push('/newpost?editmode=true')
    }
  }
}
