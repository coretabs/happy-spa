import Corefun from '@/api';
import Cookies from 'js-cookie'

export default {
  name: 'Profile',
  data () {
    return {
      user : '',
      links : '',
      posts : '',
      fillteredLinks : [],
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
    $ : element => document.querySelector(element),
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
    likePost(postid) {
      if (Cookies.getJSON('logedinUser')) {
        this.posts.forEach(post => {
          if (post.id == postid) {
            switch (post.reaction) {
              case 'liked' :
                post.reaction = null
                post.likes_count--
                Corefun.like.post(post.id)
                console.log(post.reaction)                
                this.cacheIt()
              break;
              case 'disliked' : 
                post.reaction = 'liked'
                post.likes_count++
                post.dislikes_count--
                Corefun.like.post(post.id)
                console.log(post.reaction)
                this.cacheIt()
              break;
              default : 
                post.reaction = 'liked'
                post.likes_count++
                Corefun.like.post(post.id)
                console.log(post.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }
    },
    dislikePost(postid) {
      if (Cookies.getJSON('logedinUser')) {
        this.posts.forEach(post => {
          if (post.id == postid) {
            switch (post.reaction) {
              case 'liked' :
                post.reaction = 'disliked'
                post.likes_count--
                post.dislikes_count++
                Corefun.dislike.post(post.id)
                console.log(post.reaction)
                this.cacheIt()
              break;
              case 'disliked' : 
                post.reaction = null
                post.dislikes_count--
                Corefun.dislike.post(post.id)
                console.log(post.reaction)
                this.cacheIt()
              break;
              
              default : 
                post.reaction = 'disliked'
                post.dislikes_count++
                Corefun.dislike.post(post.id)
                console.log(post.reaction)
                this.cacheIt()
              break;
            }    
          }
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
            this.fillteredLinks.push({app : 'F' , link : link.FB})
            break;

          case 'IG':
            this.fillteredLinks.push({app : 'I' , link : link.IG})
            break;

          case 'YT':
            this.fillteredLinks.push({app : 'Y' , link : link.YT})
            break;

          default:
            break;
        } 
      })
    }
  }
}