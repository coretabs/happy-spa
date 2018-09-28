import Corefun from '@/api'
import Cookies from 'js-cookie'

export default {
    
    data : () => {
        return {
            id : '',
            post : '',
            avatar :'',
            commentTxt : '',
        }
    },
    created () {
        if (this.$route.query.postid) {
            this.id = this.$route.query.postid
            this.update()
            if (Cookies.getJSON('logedinUser').user) {
                this.avatar = Cookies.getJSON('logedinUser').user.avatar_url
            } else {
                this.avatar = undefined
            }
        } else {
            $router.push('/home')
        }
    },
    methods : {
        addcomment () {
            if (this.commentTxt) {
                let Comment = {
                    data : {
                        content : this.commentTxt
                    },
                    postid : this.id
                }
                Corefun.addComment(Comment).then(re => {
                    this.update()
                })
            } else {
                console.log('eroor')
            }
        },
        update () {
            Corefun.post(this.id)
            .then(re => {
                this.post = re
            })
        }
    }
}