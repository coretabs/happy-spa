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
            msg : 'جميع الحقول مطلوبة', 
          });
          this.button = this.errors.items.length != 0;
        }
      });
    },
  },
  created() {
    if (Cookies.getJSON("logedinUser")) {
      this.$router.push(
        `/profile?id=${Cookies.getJSON("logedinUser").user.username}/`
      );
    }
  }
};
