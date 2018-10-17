import Corefun from '@/api'
import Cookies from "js-cookie"


export default {
  created() {
    if (this.$route.query.id) {
      if (Cookies.getJSON('logedinUser')) {
        if (Cookies.getJSON('logedinUser').user.username == this.$route.query.id) {
          this.getPosts(false , true)
        } else {
          this.$router.push(`/home?id=${Cookies.getJSON('logedinUser').user.username}`)
        }
      } else {
        this.$router.push('/login?from=/home')
      }
    } else if (Cookies.getJSON('logedinUser')) {
      this.$route.query.id = Cookies.getJSON('logedinUser').user.username
      this.getPosts(false , true)
      console.log('no query')
    } else {
      this.$router.push('/login?from=/home')
    }
  },
  data: () => {
    return {
      posts: '',
      loading: true,
      media: {},
      now : Math.floor(Date.now() / 60000),
      username: Cookies.getJSON('logedinUser').user.username,
      menu: false,
      postid: '',
      selectedPost: '',
      Error: false,
      ErrorMsg: '',
      confirmMsg: '',
      confirm: false,
      postToEdit: '',
      Corefun: Corefun,
      pagination : {
        page : 0,
        previous : '',
        next : '',
        loading : true,
        count : 0
      },
    }
  },
  methods: {
    $: element => document.querySelector(element),
    getPosts(refresh , cache) {
      if(refresh){
        this.pagination.page = 1 
        this.posts = []
        this.loading = true
      }else{
        this.pagination.page++
      }

      console.log(this.pagination.page)
      this.pagination.loading = true
      
      if (!!this.$store.state.cache.posts && cache){
        let cache = this.$store.state.cache.posts
        this.posts = cache.posts,
        this.pagination = cache.pagination
        this.loading = false
        this.pagination.loading = false
      } else {
        Corefun.posts(this.pagination.page)
          .then(re => {
            this.posts = [...this.posts , ...re.results]
            this.loading = false
            this.pagination.loading = false
            this.pagination.next = re.next
            this.pagination.previous = re.previous
            this.posts.forEach(post => {
              this.media[post.id] = post.mediafile ? post.mediafile.split('.')[post.mediafile.split('.').length - 1] : undefined
            })
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
        this.$('.grayContentPage').classList.remove('blur', )
        this.$('html').classList.remove('overflowHidden')
      }
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
  },
  beforeDestroy () {
    let root = this
    this.$store.commit('cachePosts' , {
      posts : root.posts,
      pagination : root.pagination
    })
  },
  computed : {
  }
}
