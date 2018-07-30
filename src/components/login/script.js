import axios from 'axios'
import { mapState , mapMutations } from 'vuex'
import Cookies from 'js-cookie';
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
                axios.post('https://corefun-api.herokuapp.com/api/v1/auth/login/' ,this.info)
                .then(re => {
                    console.log(re)
                    this.$store.commit('setUserInfo', re.data)
                    console.log(this.userInfo)
                    Cookies.set('logedinUser' , re.data , { expires: 365 })
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
            this.$router.push(`/profile/${Cookies.getJSON('logedinUser').user.username}`)
        }
    }
}