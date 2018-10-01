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
            previweLink : ''
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
            this.previweLink = URL.createObjectURL(this.mediaFile)
        },
        postSend () {
            if (this.mediaFile || this.postContent) {
                this.disable = true
                this.postContent ? this.post.append('content' , this.postContent) : ''
                this.mediaFile ? this.post.append('mediafile' , this.mediaFile) : ''
                Corefun.newPost(this.post).then (re => {
                    console.log(re)
                    this.$router.push('/home')
                })
            } else {
                this.$router.push('/home')
            }
        }
    }
}