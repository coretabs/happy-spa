import { mapState , mapMutations } from 'vuex'
import Cookies from 'js-cookie';
import Corefun from '@/api'
export default {
        
    name : 'LoginPage',
    data : () => {
        return {
            username : '',
            password : '',
            passwordType : 'password',
            iconChenge : this.passwordType === 'password' ? 'fa-eye-slash' : 'fas fa-eye',
            info : ''
        }
    },
    methods : {
        showPassword () {
            this.passwordType = this.passwordType === 'password' ?  'text' : 'password'
            this.iconChenge = this.passwordType === 'password' || this.password === '' ? 'fas fa-eye' : 'fas fa-eye-slash';
        },
        postInfo () {
            if (this.password && this.username) {
                if (this.$parent.validateEmail(this.username)) {
                    this.info = {
                        email : this.username,
                        password : this.password
                    } 
                } else {
                    this.info = {
                        username : this.username,
                        password : this.password
                    } 
                }
                Corefun.login(this.info)
                .then(re => {
                    this.$store.commit('setUserInfo', re)
                    Cookies.set('logedinUser' , re , { expires: 365 })
                    this.$router.push(`/profile/${Cookies.getJSON('logedinUser').user.username}/`)
                })
                
                .catch(er => console.log(er))
            }
        },
    },
    computed : {
        ...mapState([
            'userInfo'
        ])
    },
    created () {
        if (Cookies.getJSON('logedinUser')) {
            this.$router.push(`/profile/${Cookies.getJSON('logedinUser').user.username}/`)
        }
    }
}