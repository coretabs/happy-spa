import Corefun from '@/api'
import Cookies from 'js-cookie'
import plugins from '@/plugins'

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
      loading : true

    }
  },
  methods : {
    update() {
      Corefun.postComments(this.id)
      .then(re => {
        this.comments = re
        this.loading = false
        this.adjustAnswers()
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
          this.update()
        })
      }
    },
    adjustAnswers () {
      let answers = document.querySelectorAll('.answer')
      console.log('start')
        if (answers) {
          answers.forEach(answer => {
            console.log(answer)
            if (answer.clientHeight > 38) {
              console.log('here')
              let answerPara = answer.querySelector('.answerPara')
              answerPara.style.display = 'block'
              document.querySelector('.answerPara-short').forEach ( ansRly => { 
                console.log('here too')
                ansRly.classList.replace('answerPara-short' , 'answerPara-long')
              })
            }
          })
        }
  
    }
  },
  created () {
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
  }
}