import axios from 'axios'
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
                console.log(this.info)
            axios.post('https://corefun-api.herokuapp.com/api/v1/auth/login/' ,this.info)
            .then(re => console.log(re))
            .catch(er => console.log(er))
            }
        },
        
    }
}