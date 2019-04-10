import Cookies from "js-cookie";
export default {
  data: () => {
    return {
      email: "",
      password1: "",
      password2: "",
      passwordType: "password",
      icon: "visibility",
      info: {},
      button: false,
      buttonLoading: false,
    };
  },
  methods: {
    showPassword() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
      this.icon =
        this.passwordType === "password" ? "visibility" : "visibility_off";
    },
    sendInfo() {
      this.$validator.validate().then(noErrors => {
        if (noErrors) {
          this.button = true;
          this.buttonLoading = true;
          this.info = {
            email: this.email,
            password1: this.password1,
            password2: this.password2
          };
          this.$api.auth
            .singup(this.info)
            .then(re => {
              this.$router.push("/verificationstep2");
            })
            .catch(er => {
              this.$emit('error' , {
                msg : er.response.data[Object.keys(er.response.data)[0]][0], 
              });
            });
        } else {
          this.$emit('error' , {
            msg : this.$t('signUp.fields_required'), 
          });
          this.button = this.errors.items.length != 0;
        }
      });
    },
  },
  created() {
    if (Cookies.getJSON("logedinUser")) {
      this.$router.push(
        `/profile?id=${Cookies.getJSON("logedinUser").user.username}`
      );
    }
  },
  'computed': {
    textAlgin: function () {
      return (this.$i18n.locale == 'ar') ? 'txtR' : 'txtL';
    },
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
};
