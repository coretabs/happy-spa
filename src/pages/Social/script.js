import Cookies from "js-cookie";
export default {
  data: () => {
    return {
      links: {
        facebook: "",
        twitter: "",
        youtube: "",
        instagram: ""
      },
      apps: {
        fb: "facebook",
        tw: "twitter",
        yt: "youtube",
        ig: "instagram"
      },
      count: 0,
      loading: true
    };
  },
  methods: {
    getLinks() {
      this.$api.user.getSocial().then(re => {
        this.loading = false;
        this.links = re;
      });
    },
    deleteLink(link) {
      this.links[link] = "";
    },
    saveLinks() {
      this.loading= true;
      let user = Cookies.getJSON("logedinUser");
      this.$api.user.editSocial(this.links).then(re => {
        this.loading= false
        user.user.profile.link = re;
        Cookies.set("logedinUser", user);
        console.log(re);
        console.log(user);
      });
    }
  },
  created() {
    this.getLinks();
  }
};
