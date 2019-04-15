import {check_email_status} from '@/mixins/check';
import Cookies from "js-cookie";

export default {
  mixins: [check_email_status],
  data: () => {
    return {
      id: "",
      post: "",
      comments: [],
      avatar: "",
      commentTxt: "",
      menu: false,
      menuCmt: false,
      loading: true,
      username: "",
      onClose: "",
      confirm: false,
      confirmMsg: "$t('post.confirmMsg')",
      pagination: {
        page: 0,
        previous: "",
        next: "",
        loading: true,
        count: 0
      },
      isAvatar: this.avatar
    };
  },
  created() {
    if (this.$route.query.postid) {
      this.id = this.$route.query.postid;
      this.update(true);
      this.getComments(false, true);
      if (Cookies.getJSON("logedinUser")) {
        this.avatar = Cookies.getJSON("logedinUser").user.avatar_url;
        this.username = Cookies.getJSON("logedinUser").user.username;
      } else {
        this.avatar = undefined;
      }
    } else {
      this.$router.push("/home");
    }
  },
  methods: {
    getComments(refresh, cache) {
      if (refresh) {
        this.pagination.page = 1;
        this.comments = [];
        this.loading = true;
      } else {
        this.pagination.page++;
      }

      console.log(this.pagination.page);
      this.pagination.loading = true;

      if (!!this.$store.state.cache.comments[this.id] && cache) {
        let cache = this.$store.state.cache.comments[this.id];
        this.comments = cache.comments;
        this.pagination = cache.pagination;
        this.loading = false;
        this.pagination.loading = false;
      } else {
        this.$api.comments
          .postComments(this.id, this.pagination.page)
          .then(re => {
            if (!re.message) {
              this.comments = [...this.comments, ...re.results];
              this.loading = false;
              this.pagination.loading = false;
              this.pagination.next = re.next;
              this.pagination.previous = re.previous;
              this.cacheIt(true);
            }
          })
          .catch(er => {
            if (er.response.status == 404) {
              this.$emit("error", {
                msg: this.$t('post.not_exist'),
                callback: () => this.$router.push("/home")
              });
            } else {
              this.$emit("error", {
                msg: this.$t('post.contact_us'),
                callback: () => this.$router.push("/more")
              });
            }
          });
      }
    },
    cacheIt(comments) {
      let root = this;
      this.$store.commit("cachePost", {
        ...root.post
      });
      if (comments) {
        this.$store.commit("cacheComments", {
          comments: root.comments ? root.comments : "",
          pagination: root.pagination,
          id: root.id
        });
      }
    },
    addcomment() {
      if (this.commentTxt.replace(/\s/gi, "")) {
        let Comment = {
          data: {
            content: this.commentTxt
          },
          postid: this.id
        };
        this.commentTxt = "";
        this.$api.comments.addComment(Comment).then(re => {
          this.comments.push(re);
        });
      }
    },
    update(cache) {
      if (!!this.$store.state.cache.post[this.id] && cache) {
        this.post = this.$store.state.cache.post[this.id];
        this.loading = false;
        this.pagination.loading = false;
      } else {
        this.$api.posts
          .post(this.id)
          .then(re => {
            this.post = re;
            this.loading = false;
            this.cacheIt(false);
          })
          .catch(er => {
            if (er.response.status == 404) {
              this.$emit("error", {
                msg: this.$t('post.contact_us'),
                callback: () => this.$router.push("/home")
              });
            }
          });
      }
    },
    showConfirm() {
      let root = this;
      this.menu ? this.showMenu(this.postid) : "";
      this.$emit("confirm", {
        msg: this.$t('post.confirm_delete'),
        yes: () => {
          root.deletePost();
          this.$scroll.allow();
        },
        no: () => this.$scroll.allow()
      });
    },
    showMenu() {
      this.menu = !this.menu;
      if (this.menu) {
        $(".grayContentPage ").classList.add("blur");
        this.$scroll.deny();
      } else {
        $(".grayContentPage").classList.remove("blur");
        this.$scroll.allow();
      }
    },
    commentMenu(commentid) {
      this.menuCmt = !this.menuCmt;
      this.commentid = commentid;
    },
    deletePost() {
      if (this.post.author == this.username) {
        this.$api.posts.deletePost(this.id).then(() => {
          this.$router.push("/home");
          this.$store.commit("claerCache");
        });
      } else {
        this.$emit("error", {
          msg: this.$t('post.cant_delete')
        });
      }
    },
    editPost() {
      if (this.post.author == this.username) {
        this.$store.commit("postToEdit", this.post);
        this.$router.push("/newpost?editmode=true");
      } else {
        this.$emit("error", {
          msg: this.$t('post.cant_edit')
        });
      }
    },
    likeComment(commentid) {
      if (Cookies.getJSON("logedinUser")) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.reaction) {
              case "liked":
                comment.reaction = null;
                comment.likes_count--;
                this.$api.comments.like(this.id, comment.id);
                console.log(comment.reaction);
                this.cacheIt();
                break;
              case "disliked":
                comment.reaction = "liked";
                comment.likes_count++;
                comment.dislikes_count--;
                this.$api.comments.like(this.id, comment.id);
                console.log(comment.reaction);
                this.cacheIt();
                break;
              default:
                comment.reaction = "liked";
                comment.likes_count++;
                this.$api.comments.like(this.id, comment.id);
                console.log(comment.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    },
    dislikeComment(commentid) {
      if (Cookies.getJSON("logedinUser")) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.reaction) {
              case "liked":
                comment.reaction = "disliked";
                comment.likes_count--;
                comment.dislikes_count++;
                this.$api.comments(this.id, comment.id);
                console.log(comment.reaction);

                this.cacheIt();
                break;
              case "disliked":
                comment.reaction = null;
                comment.dislikes_count--;
                this.$api.comments(this.id, comment.id);
                console.log(comment.reaction);
                this.cacheIt();
                break;

              default:
                comment.reaction = "disliked";
                comment.dislikes_count++;
                this.$api.comments(this.id, comment.id);
                console.log(comment.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    },
    likeReply(commentid) {
      if (Cookies.getJSON("logedinUser")) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.top_reply.reaction) {
              case "liked":
                comment.top_reply.reaction = null;
                comment.top_reply.likes_count--;
                this.$api.replies.like(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);
                this.cacheIt();
                break;

              case "disliked":
                comment.top_reply.reaction = "liked";
                comment.top_reply.likes_count++;
                comment.top_reply.dislikes_count--;
                this.$api.replies.like(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);

                this.cacheIt();
                break;
              default:
                comment.top_reply.reaction = "liked";
                comment.top_reply.likes_count++;
                this.$api.replies.like(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    },
    dislikeReply(commentid) {
      if (Cookies.getJSON("logedinUser")) {
        this.comments.forEach(comment => {
          if (comment.id == commentid) {
            switch (comment.top_reply.reaction) {
              case "liked":
                comment.top_reply.reaction = "disliked";
                comment.top_reply.likes_count--;
                comment.top_reply.dislikes_count++;
                this.$api.replies.dislike(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);

                this.cacheIt();
                break;
              case "disliked":
                comment.top_reply.reaction = null;
                comment.top_reply.dislikes_count--;
                this.$api.replies.dislike(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);
                this.cacheIt();
                break;

              default:
                comment.top_reply.reaction = "disliked";
                comment.top_reply.dislikes_count++;
                this.$api.replies.dislike(
                  this.id,
                  comment.id,
                  comment.top_reply.id
                );
                console.log(comment.top_reply.reaction);
                this.cacheIt();
                break;
            }
          }
        });
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    },
    likePost() {
      let post = this.post;
      if (Cookies.getJSON("logedinUser")) {
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
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    },
    dislikePost() {
      let post = this.post;
      if (Cookies.getJSON("logedinUser")) {
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
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`);
      }
    }
  },
  computed: {
    has_icons_R: function() {
      return this.$i18n.locale == "ar" ? "has-icons-right" : "has-icons-left";
    },
    has_icons_L: function() {
      return this.$i18n.locale == "ar" ? "has-icons-left" : "has-icons-right";
    },
    personWay: function() {
      return this.$i18n.locale == "ar"
        ? "right: -15px; laft: auto;"
        : "left: -15px; right: auto;";
    },
    personAnswerWay: function() {
      return this.$i18n.locale == "ar" ? "float: right;" : "float: left;";
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
    },
    rotateSendIcon: function() {
      return this.$i18n.locale == "ar"
        ? ""
        : "-webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -ms-transform: rotate(180deg); -o-transform: rotate(180deg); transform: rotate(180deg);";
    }
  }
};
