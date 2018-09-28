import Cookies from 'js-cookie'
import Corefun from '@/api'
export default {
    data : () => {
        return {
            username : '',
            profile : '',
            mediaFile : '',
            postContent : '',
            post : new FormData()
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
    },
    methods : {
        uploadFile (e) {
            this.mediaFile = e.target.files[0]
        },
        postSend () {
            if (this.mediaFile || this.postContent) {
                this.post.append('content' , this.postContent)
                this.post.append('mediafile' , this.mediaFile)
                Corefun.newPost(this.post)
            } else {
                this.$router.push('/home')
            }
        }
    }
}