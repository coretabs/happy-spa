import Corefun from '@/api'
import Cookies from 'js-cookie'

export default {

  data: () => {
    return {
      id: '',
      post: '',
      comments : [],
      avatar: '',
      commentTxt: '',
      Error: false,
      ErrorMsg: 'راسلنا رجاء',
      menu: false,
      loading: true,
      username: '',
      onClose: '',
      confirm : false,
      confirmMsg : 'هل تريد فعل ذلك حقاً',
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
  created() {
    if (this.$route.query.postid) {
      this.id = this.$route.query.postid
      this.update(true)
      this.getComments(false , true)
      if (Cookies.getJSON('logedinUser').user) {
        this.avatar = Cookies.getJSON('logedinUser').user.avatar_url
        this.username = Cookies.getJSON('logedinUser').user.username
      } else {
        this.avatar = undefined
      }
    } else {
      this.$router.push('/home')
    }
  },
  methods: {
    getComments (refresh , cache) {
      if (refresh) { 
        this.pagination.page = 1 
        this.comments = []
        this.loading = true
      } else {
        this.pagination.page++
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
          this.cacheIt(true)
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
    cacheIt(comments) {
      let root = this
      this.$store.commit('cachePost' , {
        ...root.post
      })
      if (comments) {
        this.$store.commit('cacheComments' , {
          comments : root.comments ? root.comments : '' ,
          pagination : root.pagination,
          id : root.id,
        })
      }
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
          this.comments.push(re)
        })
      }
    },
    update(cache) {
      if (!!this.$store.state.cache.post[this.id] && cache){
        this.post = this.$store.state.cache.post[this.id]
        this.loading = false
        this.pagination.loading = false
      } else {
        Corefun.post(this.id)
          .then(re => {
            this.post = re
            this.loading = false
            this.cacheIt(false)
          }).catch(er => {
            if (er.response.status == 404) {
              this.Error = true
              this.ErrorMsg = 'المنشور غير موجود او تم حذفه'
              this.onClose = () => this.$router.push('/home')
              this.showError()
            }
          })
        }
    },
    showError() {
      this.menu = false
      if (this.Error) {
        this.$('.error').style.display = 'block'
        this.$('.grayContentPage').classList.add('blur')
      } else {
        if (this.onClose) {
          this.onClose()
        }
        this.$('.error').style.display = 'none'
        this.$('.grayContentPage').classList.remove('blur')
      }
    },
    showConfirm(doit) {
      this.menu = false
      if (this.post.author == this.username) {
        if (this.confirm) {
          this.confirmMsg = 'هل تريد حقا حذف المنشور'
          this.$('.confirm').style.display = 'block'
          this.$('.grayContentPage ').classList.add('blur')
        } else {
          if (doit) {
            this.deletePost()
          }
          this.$('.confirm').style.display = 'none'
          this.$('.grayContentPage').classList.remove('blur')
        }
      } else {
        this.Error = true
        this.ErrorMsg = 'لا يمكنك حذف اي منشور سوى الخاصة بك'
        this.showError()
      }
    },
    showMenu() {
      this.menu = !this.menu
      if (this.menu) {
        this.$('.grayContentPage ').classList.add('blur')
        this.$('html').classList.add('overflowHidden')
      } else {
        this.$('.grayContentPage').classList.remove('blur')
        this.$('html').classList.remove('overflowHidden')
      }
    },
    $ : element => document.querySelector(element),
    deletePost() {
      if (this.post.author == this.username) {
        Corefun.deletePost(this.id).then(() => {
          this.$router.push('/home')
        })
      } else {
        this.Error = true
        this.ErrorMsg = 'لا يمكنك حذف اي منشور سوى الخاصة بك'
        this.showError()
      }
    },
    editPost() {
      if (this.post.author == this.username) {
        this.$store.commit('postToEdit', this.post)
        this.$router.push('/newpost?editmode=true')
      } else {
        this.Error = true
        this.ErrorMsg = 'لا يمكنك تعديل اي منشور سوى الخاصة بك'
        this.showError()
      }
    },
    likeComment(commentid) {
      if (Cookies.getJSON('logedinUser')) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.reaction) {
              case 'liked' :
                comment.reaction = null
                comment.likes_count--
                Corefun.like.comment(this.id , comment.id)
                console.log(comment.reaction)                
                this.cacheIt()
              break;
              case 'disliked' : 
                comment.reaction = 'liked'
                comment.likes_count++
                comment.dislikes_count--
                Corefun.like.comment(this.id , comment.id)
                console.log(comment.reaction)
                this.cacheIt()
              break;
              default : 
                comment.reaction = 'liked'
                comment.likes_count++
                Corefun.like.comment(this.id , comment.id)
                console.log(comment.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    dislikeComment(commentid) {
      if (Cookies.getJSON('logedinUser')) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.reaction) {
              case 'liked' :
                comment.reaction = 'disliked'
                comment.likes_count--
                comment.dislikes_count++
                Corefun.dislike.comment(this.id , comment.id)
                console.log(comment.reaction)
                
                this.cacheIt()
              break;
              case 'disliked' : 
                comment.reaction = null
                comment.dislikes_count--
                Corefun.dislike.comment(this.id , comment.id)
                console.log(comment.reaction)
                this.cacheIt()
              break;
              
              default : 
                comment.reaction = 'disliked'
                comment.dislikes_count++
                Corefun.dislike.comment(this.id , comment.id)
                console.log(comment.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    likeReply(commentid) {
      if (Cookies.getJSON('logedinUser')) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.top_reply.reaction) {
              case 'liked' :
                comment.top_reply.reaction = null
                comment.top_reply.likes_count--
                Corefun.like.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                this.cacheIt()
              break;
              
              case 'disliked' : 
                comment.top_reply.reaction = 'liked'
                comment.top_reply.likes_count++
                comment.top_reply.dislikes_count--
                Corefun.like.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                
                this.cacheIt()
              break;
              default : 
                comment.top_reply.reaction = 'liked'
                comment.top_reply.likes_count++
                Corefun.like.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    dislikeReply(commentid) {
      if (Cookies.getJSON('logedinUser')) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.top_reply.reaction) {
              case 'liked' :
                comment.top_reply.reaction = 'disliked'
                comment.top_reply.likes_count--
                comment.top_reply.dislikes_count++
                Corefun.dislike.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                
                this.cacheIt()
              break;
              case 'disliked' : 
                comment.top_reply.reaction = null
                comment.top_reply.dislikes_count--
                Corefun.dislike.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                this.cacheIt()
              break;
              
              default : 
                comment.top_reply.reaction = 'disliked'
                comment.top_reply.dislikes_count++
                Corefun.dislike.reply(this.id , comment.id , comment.top_reply.id)
                console.log(comment.top_reply.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    likePost() {
      let post = this.post
      if (Cookies.getJSON('logedinUser')) {
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
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    dislikePost() {
      let post = this.post
      if (Cookies.getJSON('logedinUser')) {
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
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    }
  }
}
