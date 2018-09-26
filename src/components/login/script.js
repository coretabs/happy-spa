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
            icon : 'remove_red_eye',
            info : ''
        }
    },
    methods : {
        showPassword () {
            this.passwordType = this.passwordType === 'password' ?  'text' : 'password'
            this.icon = this.passwordType === 'password' ? 'remove_red_eye' : 'visibility_off';
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
                    delete re.user.posts
                    Cookies.set('logedinUser' , re , { expires: 365 })
                    if (this.$route.query.from){
                        this.$router.push(`${this.$route.query.from}?id=${Cookies.getJSON('logedinUser').user.username}/`)
                    } else {
                        this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}/`)
                    }
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
            this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}/`)
        }
    }
}