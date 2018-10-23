import Corefun from "@/api";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      comment: "",
      postid: this.$route.query.postid,
      commentid: this.$route.query.commentid,
      avatar: "",
      replies : '',
      replyTxt: "",
      loading: true,
      Corefun : Corefun,
      pagination : {
        page : 0,
        previous : '',
        next : '',
        loading : true,
        count : 0
      }
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
        Corefun.replies(this.postid, this.commentid , this.pagination.page)
        .then (re => {
          this.replies = [...this.replies, ...re.results]
          this.loading = false
          this.pagination.loading = false
          this.pagination.next = re.next
          this.pagination.previous = re.previous
          this.cacheIt()
        })
      }
    },
    likeReply(replyid) {
      if (Cookies.getJSON('logedinUser')) {
        this.replies.forEach(reply => {
          if (reply.id == replyid) {
            switch (reply.reaction) {
              case 'liked' :
                reply.reaction = null
                reply.likes_count--
                Corefun.like.reply(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)                
                this.cacheIt()
              break;
              case 'disliked' : 
                reply.reaction = 'liked'
                reply.likes_count++
                reply.dislikes_count--
                Corefun.like.reply(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
              default : 
                reply.reaction = 'liked'
                reply.likes_count++
                Corefun.like.reply(this.postid,this.commentid , reply.id)
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
                Corefun.dislike.reply(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                
                this.cacheIt()
              break;
              case 'disliked' : 
                reply.reaction = null
                reply.dislikes_count--
                Corefun.dislike.reply(this.postid,this.commentid , reply.id)
                console.log(reply.reaction)
                this.cacheIt()
              break;
              
              default : 
                reply.reaction = 'disliked'
                reply.dislikes_count++
                Corefun.dislike.reply(this.postid,this.commentid , reply.id)
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
            Corefun.like.comment(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          
          case 'disliked' : 
            comment.reaction = 'liked'
            comment.likes_count++
            comment.dislikes_count--
            Corefun.like.comment(this.postid ,this.commentid)
            console.log(comment.reaction)
            
            this.cacheIt()
          break;
          default : 
            comment.reaction = 'liked'
            comment.likes_count++
            Corefun.like.comment(this.postid ,this.commentid)
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
            Corefun.dislike.comment(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          case 'disliked' : 
            comment.reaction = null
            comment.dislikes_count--
            Corefun.dislike.comment(this.postid ,this.commentid)
            console.log(comment.reaction)
            this.cacheIt()
          break;
          
          default : 
            comment.reaction = 'disliked'
            comment.dislikes_count++
            Corefun.dislike.comment(this.postid ,this.commentid)
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
      Corefun.comment(this.postid, this.commentid).then(re => {
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
        Corefun.addReply(reply).then(re => this.replies.push(re));
      }
    }
  },
  created() {
    if (this.postid && this.commentid) {
      this.update(false , true);
      if (Cookies.getJSON("logedinUser").user) {
        this.avatar = Cookies.getJSON("logedinUser").user.avatar_url;
      } else {
        this.avatar = undefined;
      }
    } else if (this.postid) {
      this.$router.push(`/post?postid=${this.postid}`);
    } else {
      this.$router.push("/home");
    }
  },
}