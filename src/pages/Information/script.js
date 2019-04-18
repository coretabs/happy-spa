import {check_email_status} from '@/mixins/check';
import Cookies from 'js-cookie'
export default {
  mixins: [check_email_status],
  data: () => {
    return {
      userInfo: {
        profile: {
          bio: '',
          first_name: '',
          last_name: '',
          location: '',
          birth_date: '',
          link: []
        },
        username: '',
        avatar: ''
      },
      previweUrl: '',
      inf: new FormData(),
      disable: this.errors ? this.errors.items.length != 0 : false,
      loading : false,
    }
  },
  methods: {
    file(e) {
      this.userInfo.avatar = e.target.files[0]
      this.previweUrl = URL.createObjectURL(e.target.files[0])
    },

    formData() {
      this.inf.append('username', this.userInfo.username)
      this.userInfo.avatar ? this.inf.append('avatar', this.userInfo.avatar) : ''
      this.inf.append('profile.first_name', this.userInfo.profile.first_name)
      this.inf.append('profile.last_name', this.userInfo.profile.last_name)
      this.inf.append('profile.bio', this.userInfo.profile.bio)
      this.inf.append('profile.location', this.userInfo.profile.location)
      this.inf.append('profile.birth_date', this.userInfo.profile.birth_date)
    },
    sendInformation() {
      this.$validator.validate().then(noErrors => {
        if(noErrors) {
          this.formData()
          this.disable = true
          this.loading = true
          this.$api.user.setInformation(this.inf)
            .then(re => {
              console.log(re, Cookies.getJSON('logedinUser'))
              let logedinUser = Cookies.getJSON('logedinUser')
              logedinUser.user = re
              this.$store.state.cache.profile[re.username] ? this.$store.state.cache.profile[re.username].user = re : ''
              Cookies.set('logedinUser', logedinUser, {
                expires: 365
              })
              this.$router.push(`/profile`)
              this.disable = false
              this.loding = false
            })
            .catch(er => {
              this.disable = false
              this.loding = false
              console.log(er.response)
            })
        }
      })
    }
  },
  created() {
    if (Cookies.getJSON('logedinUser')) {
      if (Cookies.getJSON('logedinUser').user.email_status) {
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
  },
  'computed': {
      dirRTL: function() {
        return this.$i18n.locale == "ar" ? "directionRTL" : "directionLTR";
      },
      has_icons: function () {
        return (this.$i18n.locale == 'ar') ? 'has-icons-right' : 'has-icons-left';
      },
      is_way: function () {
        return (this.$i18n.locale == 'ar') ? 'is-right' : 'is-left';
      },
  }

}
