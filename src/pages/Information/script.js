import Corefun from '@/api'
import Cookies from 'js-cookie'
export default {
    data : () => {
        return {
            userInfo : {
                profile : {
                    bio : '',
                    first_name : '',
                    last_name : '',
                    location : '',
                    birth_date : '',
                    link : []
                },
                username : '',
                avatar : ''
            },
            previweUrl :'',
            firstNameError : '',
            lastNameError : '',
            usernameError : '',
            dateError : '',
            firstNameClasses : {
                'is-danger' : false,
                'wrongValue' : this['is-danger'],
                'input' : true
            },
            lastNameClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            },
            usernameClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            },
            dateClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            },
            inf : new FormData(),
            disable : false
        }
    },
    methods : {
        file(e) {
            this.userInfo.avatar = e.target.files[0]
            this.previweUrl = URL.createObjectURL(e.target.files[0])
        },
        validateFirstName () {
            let firstName = this.userInfo.profile.first_name
            if (firstName && firstName.length >= 3 && firstName.split(' ').length == 1) {
                this.firstNameError = false
                this.firstNameClasses['is-danger'] = false
                this.firstNameClasses['wrongValue'] = false
                return true
            } else {
                this.firstNameError = true
                this.firstNameClasses['is-danger'] = true
                this.firstNameClasses['wrongValue'] = true
                return false
            }
        },
        validateLastName () {
            let lastName = this.userInfo.profile.last_name
            if (lastName && lastName.length >= 3 && lastName.split(' ').length == 1) {
                this.lastNameError = false
                this.lastNameClasses['is-danger'] = false
                this.lastNameClasses['wrongValue'] = false
                return true
            } else {
                this.lastNameError = true
                this.lastNameClasses['is-danger'] = true
                this.lastNameClasses['wrongValue'] = true
                return false
            }
        },
        validateUsername () {
            let username = this.userInfo.username
            if (username.length >= 3 && username.split(' ').length == 1) {
                this.usernameError = false
                this.usernameClasses['is-danger'] = false
                this.usernameClasses['wrongValue'] = false
                return true
            } else {
                this.usernameError = true
                this.usernameClasses['is-danger'] = true
                this.usernameClasses['wrongValue'] = true
                return false
            }
        },
        validateDate (e) {
           let date = e.srcElement.value.split('-')
           let year = Number(date[0]) <= 2005 && Number(date[0]) >= 1918 || !this.userInfo.profile.birth_date
           if (!year) {
               this.dateClasses['is-danger'] = true
               this.dateClasses['wrongValue'] = true
               this.dateError = 'أدخل تاريخ صالح من فضلك'
               
           } else {
               this.dateClasses['is-danger'] = false
               this.dateClasses['wrongValue'] = false
               this.dateError = ''
               
           }
        },
        testAll () {
            if(
                this.validateFirstName() &&
                this.validateLastName() &&
                this.validateUsername() &&
                !this.dateError
            ) { return true } else { return false }
        },
        formData (){
            this.inf.append('username', this.userInfo.username)
            this.userInfo.avatar ? this.inf.append('avatar', this.userInfo.avatar) : ''
            this.inf.append('profile.first_name', this.userInfo.profile.first_name)
            this.inf.append('profile.last_name', this.userInfo.profile.last_name)
            this.inf.append('profile.bio', this.userInfo.profile.bio)
            this.inf.append('profile.location', this.userInfo.profile.location)
            this.inf.append('profile.birth_date', this.userInfo.profile.birth_date)
        },
        sendInformation () {
            if (this.testAll()) {
                this.formData()
                this.disable = true
                Corefun.information( this.inf)
                .then (re => {
                    console.log(re , Cookies.getJSON('logedinUser'))
                    let logedinUser = Cookies.getJSON('logedinUser')
                    logedinUser.user = re
                    this.$store.state.cache.profile[re.username] ? this.$store.state.cache.profile[re.username].user = re : ''
                    Cookies.set('logedinUser' , logedinUser , { expires: 365 })
                    this.$router.push(`/profile`)
                    this.disable = false
                })
                .catch(er => { 
                    this.disable =false
                    console.log(er.response)
                })
            }
        }
    },
    created () {
        if (Cookies.getJSON('logedinUser')) {
            if(Cookies.getJSON('logedinUser').user.email_status){
                this.userInfo = Cookies.getJSON('logedinUser').user
                let name = this.userInfo.profile.displayed_name.split(' ')
                this.userInfo.profile.first_name = name[0]
                this.userInfo.profile.last_name = name[1]
                if (this.userInfo.avatar_url) {
                    this.previweUrl = this.userInfo.avatar_url
                }
            }
        } else {
            this.$router.push('/login')
        }
    }

}