import axios from 'axios';

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
  created () {
      axios.get(`https://corefun.herokuapp.com/api/v1/auth/user/${this.$route.params.id}/`)
      .then( re => {
        this.user = re.data
        this.links = this.user.profile.link
        this.display = false
      })
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