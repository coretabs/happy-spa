import Cookies from "js-cookie";

export default {
  data: () => {
    return {
      posts: "",
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
    getPosts(refresh, cache) {
      if (refresh) {
        this.pagination.page = 1;
        this.posts = [];
        this.loading = true;
      } else {
        this.pagination.page++;
      }

      console.log(this.pagination.page);
      this.pagination.loading = true;

      if (!!this.$store.state.cache.posts && cache) {
        let cache = this.$store.state.cache.posts;
        (this.posts = cache.posts), (this.pagination = cache.pagination);
        this.loading = false;
        this.pagination.loading = false;
      } else {
        this.$api.posts.home(this.pagination.page).then(re => {
          this.posts = [...this.posts, ...re.results];
          this.loading = false;
          this.pagination.loading = false;
          this.pagination.next = re.next;
          this.pagination.previous = re.previous;
          this.posts.forEach(post => {
            this.media[post.id] = post.mediafile
              ? post.mediafile.split(".")[post.mediafile.split(".").length - 1]
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
    showConfirm(doit) {
      this.menu ? this.showMenu(this.postid) : "";
      if (this.confirm) {
        this.confirmMsg = "هل تريد حقا حذف المنشور";
        $(`.confirm`).style.display = "block";
        $(".grayContentPage ").classList.add("blur");
        $("html").classList.add("overflowHidden");
      } else {
        if (doit) {
          this.deletePost();
        }
        $(".confirm").style.display = "none";
        $(".grayContentPage").classList.remove("blur");
        $("html").classList.remove("overflowHidden");
      }
    },
    showMenu(postid) {
      this.menu = !this.menu;
      this.postid = postid ? postid : "";
      this.posts.forEach(pst => {
        pst.id == this.postid ? (this.postToEdit = pst) : "";
      });
      if (this.menu) {
        $(".grayContentPage").classList.add("blur");
        $("html").classList.add("overflowHidden");
      } else {
        $(".grayContentPage").classList.remove("blur");
        $("html").classList.remove("overflowHidden");
      }
    },
    deletePost() {
      this.$api.posts.deletePost(this.postid).then(() => {
        this.posts.forEach((post, index) => {
          post.id == this.postid ? this.posts.splice(index, 1) : "";
        });
        this.cacheIt();
      });
    },
    editPost() {
      this.$store.commit("postToEdit", this.postToEdit);
      this.$router.push("/newpost?editmode=true");
    },
    cacheIt() {
      let root = this;
      this.$store.commit("cachePosts", {
        posts: root.posts,
        pagination: root.pagination
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      if (Cookies.getJSON("logedinUser")) {
        if (
          Cookies.getJSON("logedinUser").user.username == this.$route.query.id
        ) {
          this.getPosts(false, true);
        } else {
          this.$router.push(
            `/home?id=${Cookies.getJSON("logedinUser").user.username}`
          );
          this.getPosts(false, true);
        }
      } else {
        this.$router.push("/login?from=/home");
      }
    } else if (Cookies.getJSON("logedinUser")) {
      this.$route.query.id = Cookies.getJSON("logedinUser").user.username;
      this.getPosts(false, true);
      console.log("no query");
    } else {
      this.$router.push("/login?from=/home");
    }
  }
};
