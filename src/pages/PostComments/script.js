import Corefun from '@/api'
import Cookies from 'js-cookie'
import plugins from '@/plugins/dom'

export default {
  data : () => {
    return {
      comments : '',
      id : '',
      avatar: '',
      commentTxt: '',
      Error: false,
      ErrorMsg: 'راسلنا رجاء',
      onClose: '',
      loading : true,
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
    update(refresh , cache , update) {
      if (refresh) { 
        this.pagination.page = 1 
        this.comments = []
        this.loading = true
      } else {
        update ? '' :this.pagination.page++
      }

      console.log(this.pagination.page)
      this.pagination.loading = true

      if (!!this.$store.state.cache.comments[this.id] && cache){
        let cache = this.$store.state.cache.comments[this.id]
        this.comments = cache.comments,
        this.pagination = cache.pagination
        this.loading = false
        this.pagination.loading = false
      } else {
        Corefun.postComments(this.id , this.pagination.page)
        .then(re => {
          this.comments = [...this.comments, ...re.results]
          this.loading = false
          this.pagination.loading = false
          this.pagination.next = re.next
          this.pagination.previous = re.previous
          this.cacheIt()
        }).catch(er => {
          if (er.response.status == 404) {
            this.Error = true
            this.ErrorMsg = 'المنشور غير موجود او تم حذفه'
            this.onClose = () => this.$router.push('/home')
            this.showError()
          } else {
            this.Error = true
            this.onClose = () => this.$router.push('/home')
            this.showError()
          }
        })
      }
    },
    cacheIt() {
      let root = this
      this.$store.commit('cacheComments' , {
        comments : root.comments ? root.comments : '' ,
        pagination : root.pagination,
        id : root.id
      })
    },
    addcomment() {
      if (this.commentTxt.replace(/\s/gi, "")) {
        let Comment = {
          data: {
            content: this.commentTxt
          },
          postid: this.id
        }
        this.commentTxt = ''
        Corefun.addComment(Comment).then(re => {
          this.update(false , false , true)
        })
      }
    },
    
  },
  watch : {
    comments :{ 
      handler : () => { plugins.adjustAnswers() },
      deep : true
    }
  },
  created () {
    if (this.$route.query.postid) {
      this.id = this.$route.query.postid
      this.update(false , true)
      if (Cookies.getJSON('logedinUser').user) {
        this.avatar = Cookies.getJSON('logedinUser').user.avatar_url
        this.username = Cookies.getJSON('logedinUser').user.username
      } else {
        this.avatar = undefined
      }
    } else {
      this.$router.push('/home')
    }
  }
}