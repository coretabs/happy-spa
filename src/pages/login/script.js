import Cookies from 'js-cookie';
import Corefun from '@/api'
export default {

  name: 'LoginPage',
  data: () => {
    return {
      username: '',
      password: '',
      passwordType: 'password',
      icon: 'visibility',
      info: '',
      Error: false,
      loading : false,
      ErrorMsg: 'راسلنا رجاء'
    }
  },
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.icon = this.passwordType === 'password' ? 'visibility' : 'visibility_off';
    },
    postInfo() {
      if (this.password && this.username) {
        this.loading = true
        
        this.info = {
          username: this.username,
          password: this.password
        }

        Corefun.login(this.info)
          .then(re => {
            this.$store.commit('setUserInfo', re)
            this.$store.commit('claerCache')

            Cookies.set('logedinUser', re, {
              expires: 365
            })

            if (this.$route.query.from) {
              this.$router.push(`${this.$route.query.from}`)
            } else {
              this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}`)
            }
          })

          .catch(er => {
            this.Error = true
            this.ErrorMsg = 'الرجاء التحقق من اسم المستخدم وكلمة المرور'
            this.showErorr()
          })

      } else {
        this.Error = true
        this.ErrorMsg = 'كل من المستخدم و كلمة المرور مطلوبان'
        this.showErorr()
      }
    },
    showErorr() {
      if (this.Error) {
        document.querySelector('#box').style.display = 'block'
        document.querySelector('.grayContentPage').classList.add('nopostblur')
      } else {
        document.querySelector('#box').style.display = 'none'
        document.querySelector('.grayContentPage').classList.remove('nopostblur')
      }
    }
  },
  created() {
    if (Cookies.getJSON('logedinUser')) {
      this.$router.push(`/home?id=${Cookies.getJSON('logedinUser').user.username}/`)
    }
  }
}
