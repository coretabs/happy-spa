import Cookies from 'js-cookie';
import Corefun from "@/api";
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
            emailErrorMsg : false,
            password1: '',
            password1ErrorMsg: false,
            password2: '',
            password2ErrorMsg: false,
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
            icon : 'visibility',
            info : {},
            button : false,
            Error : false,
            ErrorMsg : 'راسلنا رجاء'
        }
    },
    methods : {
        showPassword () {
            this.passwordType = this.passwordType === 'password' ?  'text' : 'password'
            this.icon = this.passwordType === 'password' ? 'visibility' : 'visibility_off';
        },
        validateEmail () {
            if (this.email) {
                this.isEmailValid = this.$parent.validateEmail(this.email);
            } else {
                this.isEmailValid = false
            }

           this.emailClassOject['is-danger'] = !this.isEmailValid
           this.emailClassOject['wrongValue'] = !this.isEmailValid
           this.emailClassOject['is-success'] = this.isEmailValid
           this.emailErrorMsg = !this.isEmailValid

           //submit button
           this.button = !this.isEmailValid || !this.isPasswordValid || !this.isPassword2Valid
        },
        validatePassword () {
            if (this.password1) {
                this.isPasswordValid = this.$parent.validatePassword(this.password1)
                this.isPassword2Valid = this.isPasswordValid && this.password1 === this.password2
            } else {
                this.isPasswordValid = false
                this.isPassword2Valid = false
            }

            //password1
            this.passwordClassOject['is-danger'] = !this.isPasswordValid
            this.passwordClassOject['is-success'] = this.isPasswordValid
            this.password1ErrorMsg = !this.isPasswordValid

            //password2
            this.password2ClassOject['is-danger'] =  !this.isPassword2Valid
            this.password2ClassOject['is-success'] = this.isPassword2Valid
            this.password2ErrorMsg = !this.isPassword2Valid

           //submit button
           this.button = !this.isEmailValid || !this.isPasswordValid || !this.isPassword2Valid
        },
        sendInfo () {
            if (this.isEmailValid && this.isPasswordValid && this.isPassword2Valid){
                this.info = {
                    email : this.email,
                    password1 : this.password1,
                    password2 : this.password2
                }
                Corefun.singup(this.info)
                .then(re => {
                    this.$router.push('/verificationstep2')
                })
                .catch(er => {
                    this.Error = true
                    this.ErrorMsg = er.response.data[Object.keys(er.response.data)[0]][0]
                    this.showErorr()
                })
            } else {
                this.validateEmail()
                this.validatePassword()
            }
        },
        showErorr () {
            if (this.Error) {
                document.querySelector('#box').style.display =  'block'
                document.querySelector('.grayContentPage').classList.add('blur')
            } else {
                document.querySelector('#box').style.display =  'none'
                document.querySelector('.grayContentPage').classList.remove('blur')
            }
        }
    },
    created () {
        if (Cookies.getJSON('logedinUser')) {
            this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}/`)
        }
    }
}