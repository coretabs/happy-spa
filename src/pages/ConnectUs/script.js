import Cookies from "js-cookie";

export default {
  data: () => {
    return {
      username: "",
      email: "",
      message: "",
      title: "",
      usrTitle: "",
      content: {},
      loading: false
    };
  },
  methods: {
    sendContact() {
      this.$validator.validate().then(noErrors => {
        if (noErrors) {
          this.loading = true;

          this.content = {
            name: this.username,
            email: this.email,
            subject: this.usrTitle ? this.usrTitle : this.title,
            body: this.message
          };
          this.$api.auth
            .contactus(this.content)
            .then(re => {
              console.log(re);
              this.loading = false;
              this.$emit("alert", {
                msg: this.$t("contactUs.thx")
              });
              //this.$router.push("/");
            })
            .catch(er => {
              this.$emit("error", {
                msg: this.$t("contactUs.check")
              });
              this.loading = false;
            });
        } else {
          this.$emit("error", {
            msg: this.$t("contactUs.required")
          });
        }
      });
    }
  },
  created() {
    if (Cookies.getJSON("logedinUser")) {
      this.username = Cookies.getJSON("logedinUser").user.username;
      this.email = Cookies.getJSON("logedinUser").user.email;
    }
  },
  computed: {
    dirRTL: function() {
      return this.$i18n.locale == "ar" ? "directionRTL" : "directionLTR";
    },
    has_icons_R: function() {
      return this.$i18n.locale == "ar" ? "has-icons-right" : "has-icons-left";
    },
    is_way_R: function() {
      return this.$i18n.locale == "ar" ? "right" : "left";
    }
  }
};
