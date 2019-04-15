import Cookies from 'js-cookie'
export const check_email_status = {
    data() {
        return {
            CHKfirst_name: '',
            CHKlast_name: '',
        }
    },
    created() {
        if (Cookies.getJSON('logedinUser').user.email_status) {
            var fullName = Cookies.getJSON('logedinUser').user.profile.displayed_name.split(" ")
            this.CHKfirst_name = fullName[0];
            this.CHKlast_name = fullName[1];
            console.log('mixin works');
            if (this.CHKfirst_name == "" || this.CHKlast_name == "") {
              this.$emit("error", { msg: this.$t('mixins.CHKfull_name') });
              this.$router.push(`/information`);
            }
          } else {
            this.$emit("error", { msg: this.$t('mixins.verification') });
          }
    }
}