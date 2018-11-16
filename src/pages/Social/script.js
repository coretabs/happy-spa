export default {
  data: () => {
    return {
      links: {
        IG: "",
        FB: "",
        YT: ""
      },
      ids: {},
      count: 0,
      socialApps: [
        { app: "YouTube", key: "YT" },
        { app: "FaceBook", key: "FB" },
        { app: "InstaGram", key: "IG" }
      ],
      loading: true,
    };
  },
  methods: {
    getLinks() {
      this.$api.user.getSocial().then(re => {
        this.loading = false;
        if (re.length > 0) {
          re.forEach(link => {
            this.links[link.social_app] = link.social_link;
            this.ids[link.social_app] = link.id;
            this.count++;
          });
        }
      });
    },
    deleteLink(id, app) {
      if (id) {
        this.$api.user.deleteSocial(id);
        this.links[app] = "";
      }
    },  
  },
  created() {
    this.getLinks();
  }
};
