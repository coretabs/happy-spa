import Corefun from '@/api'
import Cookies from 'js-cookie'

export default {

  data: () => {
    return {
      id: '',
      post: '',
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
    }
  },
  created() {
    if (this.$route.query.postid) {
      this.id = this.$route.query.postid
      this.update()
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
          this.update()
        })
      } else {

      }
    },
    update() {
      Corefun.post(this.id)
        .then(re => {
          this.post = re
          this.loading = false
        }).catch(er => {
          if (er.response.status == 404) {
            this.Error = true
            this.ErrorMsg = 'المنشور غير موجود او تم حذفه'
            this.onClose = () => this.$router.push('/home')
            this.showError()
          }
        })
    },
    showError() {
      this.menu = false
      if (this.Error) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.grayContentPage').classList.add('blur')
      } else {
        if (this.onClose) {
          this.onClose()
        }
        document.querySelector('.error').style.display = 'none'
        document.querySelector('.grayContentPage').classList.remove('blur')
      }
    },
    showConfirm(doit) {
      this.menu = false
      if (this.post.author == this.username) {
        if (this.confirm) {
          this.confirmMsg = 'هل تريد حقا حذف المنشور'
          document.querySelector('.confirm').style.display = 'block'
          document.querySelector('.grayContentPage ').classList.add('blur')
        } else {
          if (doit) {
            this.deletePost()
          }
          document.querySelector('.confirm').style.display = 'none'
          document.querySelector('.grayContentPage').classList.remove('blur')
        }
      } else {
        this.Error = true
        this.ErrorMsg = 'لا يمكنك حذف اي منشور سوى الخاصة بك'
        this.showError()
      }
    },
    showMenu() {
      this.menu = !this.menu
    },
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

    }
  }
}
