import Cookies from "js-cookie"
import EmojiPicker from 'vue-emoji-picker'

export default {
  data: () => {
    return {
      username: "",
      profile: "",
      mediaFile: "",
      postContent: "",
      search: "",
      enabled: false,
      post: new FormData(),
      disable: false,
      previweLink: "",
      toEditPost: "",
      newPostSend: this.postSend,
      buttonOptions: this.disable
    }
  },
  components: {
    EmojiPicker,
  },
  created() {
    if (!Cookies.getJSON("logedinUser")) {
      this.$router.push("/login")
    } else {
      let user = Cookies.getJSON("logedinUser").user
      this.username = user.username
      this.profile = user.avatar_url
    }
    if (this.$route.query.editmode == "true") {
      if (this.$store.state.postToEdit) {
        this.toEditPost = this.$store.state.postToEdit
        this.postContent = this.toEditPost.content
        this.toEditPost.mediafile
          ? (this.previweLink = this.toEditPost.mediafile)
          : ""
      } else {
        this.$router.push("/home")
      }
    }
  },
  methods: {
    uploadFile(e) {
      this.mediaFile = e.target.files[0]
      this.previweLink = URL.createObjectURL(this.mediaFile)
    },
    submitFile(e) {
      const file = this.$refs.file.files[0];
      if (file.size > 1024 * 1024 * 5) {
        this.$emit('error', { msg: 'لا يمكنك رفع اكثر من 5 ميجا بايت'});
        this.enabled = true;
        e.preventDefault();
      } else {
        this.enabled = false;
        this.mediaFile = e.target.files[0];
        this.previweLink = URL.createObjectURL(this.mediaFile);
      }
      return;
    },
    insert(emoji) {
      this.postContent += emoji
    },
    postSend() {
      if (this.mediaFile || this.postContent.replace(/\s/gi, "")) {
        this.disable = true
        this.post.append("content", this.postContent)
        this.post.append("mediafile", this.mediaFile)
        if (this.$route.query.editmode == "true") {
          this.$api.posts.editPost(this.post, this.toEditPost.id)
            .then(re => {
              this.$router.push("/home")
            })
            .catch(er => console.log(er.response))
        } else {
          this.$api.posts.addPost(this.post).then(re => {
            this.$router.push("/home")
          })
        }
      } else {
        this.$router.push("/home")
      }
    },
    removePic() {
      this.previweLink = ""
      this.mediafile = ""
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  'computed': {
    textAlgin: function () {
      return (this.$i18n.locale == 'ar') ? 'txtR' : 'txtL';
    },
    dirRTL: function () {
      return (this.$i18n.locale == 'ar') ? 'directionRTL' : 'directionLTR';
    },
    emoji_way: function() {
      return (this.$i18n.locale == 'ar') ? 'left: 0.5em; right: auto;' : 'left: auto; right: 0.5em;';
    }
  }
}
