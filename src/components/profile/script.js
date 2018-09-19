import Corefun from '@/api';
import Cookies from 'js-cookie'

export default {
  name: 'Profile',
  data () {
    return {
      user : '',
      links : '',
      FB : '',
      TW : '',
      GB : '',
      WS : '',
      display : true
    }
  },
  methods : {
    getInfo () {
      Corefun.profile(this.$route.query.id)
      .then( re => {
        this.user = re
        this.links = this.user.profile.link
        this.display = false
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getInfo()
    } else if (Cookies.getJSON('logedinUser')) {
      this.$router.push(`/profile?id=${Cookies.getJSON('logedinUser').user.username}`)
      this.getInfo()
    } else {
      this.$router.push(`/login`)
    }
  },
  watch : {
    links : function (newLinks) {
      this.links.forEach( (link) => {
        switch (Object.keys(link)[0]) {
          case 'FB':
            this.FB = link.FB
            break;

          case 'TW':
            this.TW = link.TW
            break;

          case 'GB':
            this.GB = link.GB
            break;

          case 'WS':
            this.WS = link.WS
            break;

          default:
            break;
        } 
      })
    }
  }
}