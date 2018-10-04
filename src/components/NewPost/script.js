import Cookies from 'js-cookie'
import Corefun from '@/api'
export default {
    data : () => {
        return {
            username : '',
            profile : '',
            mediaFile : '',
            postContent : '',
            post : new FormData(),
            disable : false,
            previweLink : '',
            toEditPost : ''
        }
    },
    created () {
        if(!Cookies.getJSON('logedinUser')) {
            this.$router.push('/login')
        } else {
            let user = Cookies.getJSON('logedinUser').user
            this.username = user.username
            this.profile = user.avatar_url
        }
        if (this.$route.query.editmode == 'true') {
            if (this.$store.state.postToEdit) {
                this.toEditPost = this.$store.state.postToEdit
                this.postContent = this.toEditPost.content
                this.toEditPost.mediafile ? this.previweLink = this.toEditPost.mediafile : ""
            } else {
                this.$router.push('/home')
            }
        }
    },
    methods : {
        uploadFile (e) {
            this.mediaFile = e.target.files[0]
            this.previweLink = URL.createObjectURL(this.mediaFile)
        },
        postSend () {
            if (this.mediaFile || this.postContent) {
                this.disable = true
                this.postContent ? this.post.append('content' , this.postContent) : ''
                this.mediaFile ? this.post.append('mediafile' , this.mediaFile) : ''
                if (this.$route.query.editmode == 'true'){
                    Corefun.editPost(this.post , this.toEditPost.id).then (re => {
                        this.$router.push('/home')
                    }).catch(
                        er => console.log(er.response)
                    )
                }else {
                    Corefun.newPost(this.post).then (re => {
                        this.$router.push('/home')
                    })
                }
            } else {
                this.$router.push('/home')
            }
        },
        removePic () {
            this.previweLink = ''
            this.mediafile = ''
        }
    }
}