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
      postToEdit : '',
      Corefun : Corefun,
      pagination : {
        page : 0,
        previous : '',
        next : '',
        loading : true,
        count : 0
      }
    }
  },
  methods : {
    getInfo () {
      if (Cookies.getJSON('logedinUser').user.username == this.$route.query.id) {
        this.user = Cookies.getJSON('logedinUser').user
        this.links = Cookies.getJSON('logedinUser').user.profile.link
        this.loading = false
      } else {
        Corefun.profile.info(this.$route.query.id)
        .then( re => {

          this.user = re
          this.links = this.user.profile.link
          this.loading = false
        })
      }
    },
    getPosts(refresh , cache) {
      if(refresh){
        this.pagination.page = 1 
        this.posts = []
      }else{
        this.pagination.page++
      }

      console.log(this.pagination.page)
      console.log(this.$store.state.cache.profile)
      this.pagination.loading = true
      
      if (cache && this.$store.state.cache.profile[this.$route.query.id]){
        let cache = this.$store.state.cache.profile[this.$route.query.id]
        console.log(cache)
        this.posts = cache.posts
        this.user = cache.user
        this.pagination = cache.pagination
        this.loading = false
        this.pagination.loading = false
      } else {
        Corefun.profile.posts(this.$route.query.id , this.pagination.page)
          .then(re => {
            this.posts = [...this.posts , ...re.results]
            this.loading = false
            this.pagination.loading = false
            this.pagination.next = re.next
            this.pagination.previous = re.previous
            this.posts.forEach(post => {
              this.media[post.id] = post.mediafile ? post.mediafile.split('.')[post.mediafile.split('.').length - 1] : undefined
            })
            this.cacheIt()
          })
      }
    },
    showConfirm(doit) {
      this.menu = false
      if (this.confirm) {
        this.confirmMsg = 'هل تريد حقا حذف المنشور'
        this.$(`.confirm`).style.display = 'block'
        this.$('.grayContentPage ').classList.add('blur')
      } else {
        if (doit) {
          this.deletePost()
        }
        this.$('.confirm').style.display = 'none'
        this.$('.grayContentPage').classList.remove('blur')
      }
    },
    $ : element => document.querySelector(element),
    showMenu(postid) {
      this.menu = !this.menu
      this.postid = postid
      this.posts.forEach(pst => {
        pst.id == this.postid ? this.postToEdit = pst : ''
      })
      if (this.menu) {
        this.$('.grayContentPage ').classList.add('blur')
        this.$('html').classList.add('overflowHidden')
      } else {
        this.$('.grayContentPage').classList.remove('blur')
        this.$('html').classList.remove('overflowHidden')
      }
    },
    deletePost() {
      Corefun.deletePost(this.postid).then(() => {
        this.getInfo()
      })
    },
    editPost() {
      this.$store.commit('postToEdit', this.postToEdit)
      this.$router.push('/newpost?editmode=true')
    },
    cacheIt() {
      let root = this
      this.$store.commit('cacheProfile' , {
        posts : root.posts ? root.posts : '' ,
        user : root.user ? root.user : '' ,
        pagination : root.pagination
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getInfo()
      this.getPosts(false , true)
    } else if (Cookies.getJSON('logedinUser')) {
      this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}`)
      this.getInfo()
      this.getPosts(false , true)
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
  },
  beforeDestroy () {
    
  }
}