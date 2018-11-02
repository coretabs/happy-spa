import Cookies from 'js-cookie';
import Corefun from "@/api";
export default {
  data: () => {
    return {
      email: '',
      password1: '',
      password2: '',
      passwordType: 'password',
      icon: 'visibility',
      info: {},
      button: false,
      buttonLoading : false,
      Error: false,
      ErrorMsg: 'راسلنا رجاء'
    }
  },
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.icon = this.passwordType === 'password' ? 'visibility' : 'visibility_off';
    },
    sendInfo() {
      this.$validator.validate().then(noErrors => {

        if (noErrors) {
          this.button = true
          this.buttonLoading = true
          this.info = {
            email: this.email,
            password1: this.password1,
            password2: this.password2
          }
          /*Corefun.singup(this.info)
            .then(re => {
              this.$router.push('/verificationstep2')
            })
            .catch(er => {
              this.Error = true
              this.ErrorMsg = er.response.data[Object.keys(er.response.data)[0]][0]
              this.showErorr()
            })*/
        } else {
          this.ErrorMsg = 'يجب ملئ جميع الحقول'
          this.Error = true
          this.showErorr()
          this.button = this.errors.items.length != 0
          console.log(this.$validator)
        }
      })
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
      this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}/`)
    }
  }
}
