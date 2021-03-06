import Cookies from "js-cookie";


export default {
  name: "LoginPage",
  data: () => {
    return {
      username: "",
      password: "",
      passwordType: "password",
      icon: "visibility",
      info: "",
      loading: false,
    };
  },
  methods: {
    showPassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.icon =
        this.passwordType === "password" ? "visibility" : "visibility_off";
    },
    postInfo() {
      if (this.password && this.username) {
        this.loading = true;

        this.info = {
          username: this.username,
          password: this.password
        };
        this.$api.auth
          .login(this.info)
          .then(re => {
            axios.defaults.headers.common["authorization"] = `Bearer ${
              re.token
            }`;
            this.$store.commit("setUserInfo", re);
            this.$store.commit("claerCache");

            Cookies.set("logedinUser", re, {
              expires: 365
            });
            if (this.$route.query.from) {
              this.$router.push(`${this.$route.query.from}`);
            } else {
              this.$router.push(
                `/profile?id=${Cookies.getJSON("logedinUser").user.username}`
              );
            }
          })
          .catch(er => {
            this.$emit('error' , {
              msg : this.$t('logIn.check'),  
            })
            this.loading = false;
          })
      } else {
        this.$emit('error' , {
          msg : this.$t('logIn.required')
        })
      }
    }
  },
  created() {
    console.log(this.$store.state.Rlogin.email)
    if (Cookies.getJSON("logedinUser")) {
      this.$router.push(
        `/home?id=${Cookies.getJSON("logedinUser").user.username}/`
      );
    }

    if (this.$store.state.Rlogin.email && this.$store.state.Rlogin.password1) {
      this.username = this.$store.state.Rlogin.email;
      this.password = this.$store.state.Rlogin.password1;
      this.postInfo()
      
    }
  },
  'computed': {
    dirRTL: function() {
      return this.$i18n.locale == "ar" ? "directionRTL" : "directionLTR";
    },
    has_icons_R: function () {
      return (this.$i18n.locale == 'ar') ? 'has-icons-right' : 'has-icons-left';
    },
    has_icons_L: function () {
      return (this.$i18n.locale == 'ar') ? 'has-icons-left' : 'has-icons-right';
    },
    is_way_R: function () {
      return (this.$i18n.locale == 'ar') ? 'is-right' : 'is-left';
    },
    is_way_L: function () {
      return (this.$i18n.locale == 'ar') ? 'is-left' : 'is-right';
    },
  }
}
