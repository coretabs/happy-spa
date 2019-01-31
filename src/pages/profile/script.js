import Cookies from "js-cookie";

export default {
  name: "Profile",
  data() {
    return {
      user: "",
      links: "",
      posts: "",
      fillteredLinks: [],
      loading: true,
      media: {},
      username: Cookies.getJSON("logedinUser").user.username,
      menu: false,
      postid: "",
      selectedPost: "",
      confirmMsg: "",
      confirm: false,
      postToEdit: "",
      pagination: {
        page: 0,
        previous: "",
        next: "",
        loading: true,
        count: 0
      }
    };
  },
  methods: {
    getInfo() {
      if (
        Cookies.getJSON("logedinUser").user.username == this.$route.query.id
      ) {
        this.user = Cookies.getJSON("logedinUser").user;
        this.links = Cookies.getJSON("logedinUser").user.profile.link;
        this.loading = false;
      } else {
        this.$api.user
          .profile(this.$route.query.id)
          .then(re => {
            this.user = re;
            this.links = this.user.profile.link;
            this.loading = false;
          })
          .catch(er => {
            this.$emit("error", {
              msg: this.$t('profile.not_exist'),
              callback: () => {
                this.$router.push(
                  `/profile?id=${Cookies.getJSON("logedinUser").user.username}`
                );
                this.getInfo();
                this.getPosts();
              }
            });
          });
      }
    },
    getPosts(refresh, cache) {
      if (refresh) {
        this.pagination.page = 1;
        this.posts = [];
      } else {
        this.pagination.page++;
      }

      console.log(this.pagination.page);
      console.log(this.$store.state.cache.profile);
      this.pagination.loading = true;

      if (cache && this.$store.state.cache.profile[this.$route.query.id]) {
        let cache = this.$store.state.cache.profile[this.$route.query.id];
        console.log(cache);
        this.posts = cache.posts;
        this.user = cache.user;
        this.pagination = cache.pagination;
        this.loading = false;
        this.pagination.loading = false;
      } else {
        this.$api.posts
          .profile(this.$route.query.id, this.pagination.page)
          .then(re => {
            this.posts = [...this.posts, ...re.results];
            this.loading = false;
            this.pagination.loading = false;
            this.pagination.next = re.next;
            this.pagination.previous = re.previous;
            this.posts.forEach(post => {
              this.media[post.id] = post.mediafile
                ? post.mediafile.split(".")[
                    post.mediafile.split(".").length - 1
                  ]
                : undefined;
            });
            this.cacheIt();
          });
      }
    },
    likePost(postid) {
      if (Cookies.getJSON("logedinUser")) {
        this.posts.forEach(post => {
          if (post.id == postid) {
            switch (post.reaction) {
              case "liked":
                post.reaction = null;
                post.likes_count--;
                this.$api.posts.like(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;
              case "disliked":
                post.reaction = "liked";
                post.likes_count++;
                post.dislikes_count--;
                this.$api.posts.like(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;
              default:
                post.reaction = "liked";
                post.likes_count++;
                this.$api.posts.like(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      }
    },
    dislikePost(postid) {
      if (Cookies.getJSON("logedinUser")) {
        this.posts.forEach(post => {
          if (post.id == postid) {
            switch (post.reaction) {
              case "liked":
                post.reaction = "disliked";
                post.likes_count--;
                post.dislikes_count++;
                this.$api.posts.dislike(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;
              case "disliked":
                post.reaction = null;
                post.dislikes_count--;
                this.$api.posts.dislike(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;

              default:
                post.reaction = "disliked";
                post.dislikes_count++;
                this.$api.posts.dislike(post.id);
                console.log(post.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      }
    },
    showConfirm() {
      let root = this;
      this.menu ? this.showMenu(this.postid) : "";
      this.$emit("confirm", {
        msg: this.$t('profile.confirm_delete'),
        yes: () => {
          root.deletePost();
          this.$scroll.allow();
        },
        no: () => this.$scroll.allow()
      });
    },
    showMenu(postid) {
      this.menu = !this.menu;
      this.postid = postid;
      this.posts.forEach(pst => {
        pst.id == this.postid ? (this.postToEdit = pst) : "";
      });
      if (this.menu) {
        $(".grayContentPage ").classList.add("blur");
        this.$scroll.deny();
      } else {
        $(".grayContentPage").classList.remove("blur");
        this.$scroll.allow();
      }
    },
    deletePost() {
      this.$api.posts.deletePost(this.postid).then(() => {
        this.getInfo();
      });
    },
    editPost() {
      this.$store.commit("postToEdit", this.postToEdit);
      this.$router.push("/newpost?editmode=true");
    },
    cacheIt() {
      let root = this;
      this.$store.commit("cacheProfile", {
        posts: root.posts ? root.posts : "",
        user: root.user ? root.user : "",
        pagination: root.pagination
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getInfo();
      this.getPosts(false, true);
    } else if (Cookies.getJSON("logedinUser")) {
      this.$router.push(
        `/profile?id=${Cookies.getJSON("logedinUser").user.username}`
      );
      this.getInfo();
      this.getPosts(false, true);
    } else {
      this.$router.push(`/login`);
    }
  },
  watch: {
    links: function(newLinks) {
      this.links.forEach(link => {
        switch (Object.keys(link)[0]) {
          case "FB":
            this.fillteredLinks.push({ app: "F", link: link.FB });
            break;

          case "IG":
            this.fillteredLinks.push({ app: "I", link: link.IG });
            break;

          case "YT":
            this.fillteredLinks.push({ app: "Y", link: link.YT });
            break;

          default:
            break;
        }
      });
    }
  },
  computed: {
    personWay: function() {
      return this.$i18n.locale == "ar"
        ? "right: -15px; laft: auto;"
        : "left: -15px; right: auto;";
    },
    menuPostWay: function() {
      return this.$i18n.locale == "ar" ? "left: 10px;" : "right: 10px;";
    },
    menuWay: function() {
      return this.$i18n.locale == "ar" ? "float: left;" : "float: right;";
    },
    dirRTL: function() {
      return this.$i18n.locale == "ar" ? "directionRTL" : "directionLTR";
    },
    is_way_R: function() {
      return this.$i18n.locale == "ar" ? "right" : "left";
    },
    is_way_L: function() {
      return this.$i18n.locale == "ar" ? "left" : "right";
    }
  }
};
