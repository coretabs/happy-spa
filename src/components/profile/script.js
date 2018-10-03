import Corefun from '@/api';
import Cookies from 'js-cookie'

export default {
  name: 'Profile',
  data () {
    return {
      user : '',
      links : '',
      posts : '',
      FB : '',
      TW : '',
      GB : '',
      WS : '',
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
    getInfo () {
      Corefun.profile(this.$route.query.id)
      .then( re => {
        this.user = re
        this.links = this.user.profile.link
        this.loading = false
        this.posts = this.user.posts
        this.user.posts.forEach( post => {
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
        this.getInfo()
      })
    },
    editPost() {
      this.$store.commit('postToEdit', this.postToEdit)
      this.$router.push('/newpost?editmode=true')
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getInfo()
    } else if (Cookies.getJSON('logedinUser')) {
      this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}`)
      this.getInfo()
    } else {
      this.$router.push(`/login`)
    }
  },
  watch : {
    links : function (newLinks) {
      this.links.forEach( (link) => {
        switch (Object.keys(link)[0]) {
          case 'FB':
            this.FB = link.FB
            break;

          case 'TW':
            this.TW = link.TW
            break;

          case 'GB':
            this.GB = link.GB
            break;

          case 'WS':
            this.WS = link.WS
            break;

          default:
            break;
        } 
      })
    }
  }
}