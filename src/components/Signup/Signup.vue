<template>
    <div class="grayContentPage">  
        <div class="mianHeader">
            <router-link to = "/">
                <i class="material-icons">arrow_forward</i>
            </router-link>
            <p>تسجيل الدخول</p>
            <img src="@/../image/mainWhite.png">
        </div>
    
        <div class="contentPageHeader">
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input :class="emailClassOject" v-model='email' @keyup="validateEmail" type="email" placeholder="بريدك الالكتروني">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize15">mail</i>
                    </span>
                 </div>
            </div>
        
            <div class="field">
                <p class="control has-icons-right  has-icons-left">
                    <input @keyup="validatePassword" :class="passwordClassOject" v-model="password1"  id="pwd" :type="passwordType" placeholder="كلمة المرور">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize15">lock</i>
                    </span>
                    <span class="icon is-small is-left eyePWD" @click="showPassword" id="eye">
                        <i class="material-icons fontSize20">{{icon}}</i>
                    </span>
                </p>
                <p v-if="!isPasswordValid && password1"  class="help is-danger">كلمة المرور غير صالحة</p>
            </div>
                
            <div class ="field">
                <p class="control has-icons-right  has-icons-left">
                    <input @keyup="validatePassword"  :class="password2ClassOject" id="pwd2" v-model="password2" :type="passwordType" placeholder="كلمة المرور">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize15">lock</i>
                    </span>
                    <span class="icon is-small is-left eyePWD" @click="showPassword"  id="eye">
                        <i class="material-icons fontSize20">{{icon}}</i>
                    </span>
                </p>
                <p v-if="!isPassword2Valid && password2"  class="help is-danger">كلمة المرور غير صالحة</p>
            </div>
            
            <div class="field">
                <p class="control">
                    <button class="button is-success" @click="sendInfo">
                        التالي
                    </button>
                </p>
            </div>
            
            <div class="noteConditions">
                <p>عن طريق تسجيلك, انت توافق على <a href="#" class="forgettingLink">شروط الإستخدام</a> و <a href="#" class="forgettingLink">سياسة الخصوصية</a></p>
            </div>

        </div>
    
        <footer class="lastDivision">
        
            <p class="noteSginIn underline">
                أو تسجيل عن طريق
            </p>
            
            <div class="buttonsSginIn">
                <div class="buttonSIN">
                    <a href="#" class="buttonFacebook"> 
                        فيس بوك
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </div>
                
                <div class="buttonSIN">
                    <a href="#" class="buttonGoogle">
                        جوجل
                        <img src="@/../image/google.svg">
                    </a>
                </div>
            </div>
            
            <div class="paraFooter">
                    <p>
                        هل لديك حساب؟
                        <a href="#">تسجيل</a>
                    </p>
                </div>
        </footer>
    </div>
</template>

<script>
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
                'is-success': false
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
</script>