import Cookies from 'js-cookie';
import axios from 'axios'
export default {
    data : () => {
        return {
            isEmailValid : '',
            email : '',
            emailClassOject : {
                'is-danger' : false,
                'input':true,
                'is-success': false,
                'wrongValue' : false
            },
            password1: '',
            password2: '',
            isPasswordValid: '',
            isPassword2Valid: '',
            passwordClassOject : {
                'is-danger' : false,
                'input':true,
                'is-success': false,
                'password' : true
            },
            password2ClassOject : {
                'is-danger' : false,
                'input':true,
                'is-success': false,
                'password' : true
            },
            passwordType : 'password',
            icon : 'remove_red_eye',
            info : {}
        }
    },
    methods : {
        showPassword () {
            this.passwordType = this.passwordType === 'password' ?  'text' : 'password'
            this.icon = this.passwordType === 'password' ? 'remove_red_eye' : 'visibility_off';
        },
        validateEmail () {
            if (this.email) {
                this.isEmailValid = this.$parent.validateEmail(this.email);
            }

           this.emailClassOject['is-danger'] = this.email ? !this.isEmailValid : false
           this.emailClassOject['wrongValue'] = this.emailClassOject['is-danger']
           this.emailClassOject['is-success'] = this.email ? this.isEmailValid : false
        },
        validatePassword () {
            if (this.password1) {
                this.isPasswordValid = this.$parent.validatePassword(this.password1) && this.password1 != 'password'
            }

           this.passwordClassOject['is-danger'] = this.password1 ? !this.isPasswordValid : false
           this.passwordClassOject['is-success'] = this.password1 ? this.isPasswordValid : false
           this.password2ClassOject['is-danger'] =  this.password2 && this.password2 != this.password1 ? true : false
           this.password2ClassOject['is-success'] = this.password2 && this.password2 == this.password1 ? this.isPasswordValid : false
           this.isPassword2Valid = this.isPasswordValid && this.password1 === this.password2
        },
        sendInfo () {
            if (this.isEmailValid && this.isPasswordValid && this.isPassword2Valid){
                this.info = {
                    email : this.email,
                    password1 : this.password1,
                    password2 : this.password2
                }
                axios.post('https://corefun.herokuapp.com/api/v1/auth/registration/', this.info)
                     .then(re => {
                        console.log(re.data)
                        this.$router.push('')
                     })
                     .catch(er => console.log(er))
            }
        }
    },
    created () {
        if (Cookies.getJSON('logedinUser')) {
            this.$router.push(`/profile/${Cookies.getJSON('logedinUser').user.username}/`)
        }
    }
}