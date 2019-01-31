import Cookies from "js-cookie"

export default {
  data() {
    return {
      comment: "",
      postid: this.$route.query.postid,
      commentid: this.$route.query.commentid,
      avatar: "",
      replies : [],
      replyTxt: "",
      username: '',
      menuCmt: false,
      menuCmtRpl: false,
      loading: true,
      pagination : {
        page : 0,
        previous : '',
        next : '',
        loading : true,
        count : 0
      },
      isAvatar: this.avatar,
    };
  },
  methods: {
    update(refresh , cache){
      if (refresh) { 
        this.pagination.page = 1 
        this.replies = []
        this.loading = true
      } else {
        this.pagination.page++
      }
      
      console.log(this.pagination.page)
      this.pagination.loading = true
      
      if (!!this.$store.state.cache.replies[this.commentid] && cache){
        let cache = this.$store.state.cache.replies[this.commentid]
        this.comment = cache.comment
        this.replies = cache.replies
        this.pagination = cache.pagination
        this.loading = false
        this.pagination.loading = false
      } else {
        this.getComment()
        this.$api.replies.replies(this.postid, this.commentid , this.pagination.page)
        .then (re => {
          if(!re.message) {
            this.replies = [...this.replies, ...re.results]
            this.loading = false
            this.pagination.loading = false
            this.pagination.next = re.next
            this.pagination.previous = re.previous
            this.cacheIt()
          }
        })
      }
    },
    commentMenu(commentid) {
      this.menuCmt = !this.menuCmt
      this.commentid = commentid
    },
    commentReplyMenu(commentreplyid) {
      this.menuCmtRpl = !this.menuCmtRpl
      this.commentreplyid = commentreplyid
    },
    likeReply(replyid) {
      if (Cookies.getJSON('logedinUser')) {
        this.replies.forEach(reply => {
          if (reply.id == replyid) {
            switch (reply.reaction) {
              case 'liked' :
                reply.reaction = null
                reply.likes_count--
                this.$api.replies.like(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)                
                this.cacheIt()
              break;
              case 'disliked' : 
                reply.reaction = 'liked'
                reply.likes_count++
                reply.dislikes_count--
                this.$api.replies.like(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
              default : 
                reply.reaction = 'liked'
                reply.likes_count++
                this.$api.replies.like(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    dislikeReply(replyid) {
      if (Cookies.getJSON('logedinUser')) {
        this.replies.forEach(reply => {
          if (reply.id == replyid) {
            switch (reply.reaction) {
              case 'liked' :
                reply.reaction = 'disliked'
                reply.likes_count--
                reply.dislikes_count++
                this.$api.replies.dislike(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                
                this.cacheIt()
              break;
              case 'disliked' : 
                reply.reaction = null
                reply.dislikes_count--
                this.$api.replies.dislike(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
              
              default : 
                reply.reaction = 'disliked'
                reply.dislikes_count++
                this.$api.replies.dislike(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
            }    
          }
        })
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    likeComment() {
      let comment = this.comment
      if (Cookies.getJSON('logedinUser')) {
        switch (comment.reaction) {
          case 'liked' :
            comment.reaction = null
            comment.likes_count--
            this.$api.comments.like(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          
          case 'disliked' : 
            comment.reaction = 'liked'
            comment.likes_count++
            comment.dislikes_count--
            this.$api.comments.like(this.postid ,this.commentid)
            console.log(comment.reaction)
            
            this.cacheIt()
          break;
          default : 
            comment.reaction = 'liked'
            comment.likes_count++
            this.$api.comments.like(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
        }
      }else{
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    dislikeComment() {
      let comment = this.comment
      if (Cookies.getJSON('logedinUser')) {
        switch (comment.reaction) {
          case 'liked' :
            comment.reaction = 'disliked'
            comment.likes_count--
            comment.dislikes_count++
            this.$api.comments.dislike(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          case 'disliked' : 
            comment.reaction = null
            comment.dislikes_count--
            this.$api.comments.dislike(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          
          default : 
            comment.reaction = 'disliked'
            comment.dislikes_count++
            this.$api.comments.dislike(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
        }    
      } else {
        this.$router.push(`login?from=${this.$route.fullPath}`)
      }
    },
    cacheIt() {
      let root = this
      this.$store.commit('cacheReplies' , {
        replies : root.replies ? root.replies : '' ,
        pagination : root.pagination,
        comment : root.comment,
        id : root.commentid
      })
    },
    getComment() {
      this.$api.comments.comment(this.postid, this.commentid).then(re => {
        this.comment = re;
        this.loading = false;
      });
    },
    addReply() {
      if (this.replyTxt.replace(/\s/gi, "")) {
        let reply = {
          data: {
            content: this.replyTxt
          },
          postid: this.postid,
          commentid: this.commentid
        };
        this.replyTxt = ''
        this.$api.replies.addReply(reply).then(re => this.replies.push(re));
      }
    }
  },
  created() {
    if (this.postid && this.commentid) {
      this.update(false , true);
      if (Cookies.getJSON("logedinUser").user) {
        this.avatar = Cookies.getJSON("logedinUser").user.avatar_url;
        this.username = Cookies.getJSON("logedinUser").user.username;
      } else {
        this.avatar = undefined;
      }
    } else if (this.postid) {
      this.$router.push(`/post?postid=${this.postid}`);
    } else {
      this.$router.push("/home");
    }
  },
  'computed': {
    has_icons_R: function () {
      return (this.$i18n.locale == 'ar') ? 'has-icons-right' : 'has-icons-left';
    },
    has_icons_L: function () {
      return (this.$i18n.locale == 'ar') ? 'has-icons-left' : 'has-icons-right';
    },
    personWay: function () {
      return (this.$i18n.locale == 'ar') ? 'right: -15px; laft: auto;' : 'left: -15px; right: auto;';
    },
    personAnswerWay: function () {
      return (this.$i18n.locale == 'ar') ? 'float: right;' : 'float: left;';
    },
    menuPostWay: function () {
      return (this.$i18n.locale == 'ar') ? 'left: 10px;' : 'right: 10px;';
    },
    menuWay: function () {
      return (this.$i18n.locale == 'ar') ? 'float: left;' : 'float: right;';
    },
    dirRTL: function () {
      return (this.$i18n.locale == 'ar') ? 'directionRTL' : 'directionLTR';
    },
    is_way_R: function () {
      return (this.$i18n.locale == 'ar') ? 'right' : 'left';
    },
    is_way_L: function () {
      return (this.$i18n.locale == 'ar') ? 'left' : 'right';
    },
    rotateSendIcon: function () {
      return (this.$i18n.locale == 'ar') ? '' : '-webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -ms-transform: rotate(180deg); -o-transform: rotate(180deg); transform: rotate(180deg);';
    },
  }
}