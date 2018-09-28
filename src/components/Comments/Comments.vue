<template>
    <div class="withAppW spaceHeader spaceFooterB">
       <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>logo</p>
        </header>
        <div id="bodyComments" v-if="comment">	
            <div class="bodyAnswer">
                <div class="answer">
                    <div class="personPost">
                        <router-link :to="`/profile?id=${comment.author}`">
                            <img :src="comment.author_avatar">
                        </router-link>
                        <router-link :to="`/profile?id=${comment.author}`" class="personName">{{comment.author}}</router-link>
                    </div>
                    <div class="answerPara">
                        <p>{{comment.content}}</p>
                    </div>
                </div> 
                <div class="communion">
                    <a href="#"><i class="material-icons fontSize   12">thumb_up</i><span>{{comment.likes_count}}</span></a>
                    <a href="#"><i class="material-icons fontSize12">thumb_down</i><span>{{comment.dislikes_count}}</span></a>
                    <a href="#"><i class="material-icons fontSize12">forum</i><span>{{comment.replies_count}}</span></a>
                    <a href="#" class="left headElements center CMTtime">
                        <span>{{comment.time_since}}</span>
                    </a>
                </div>
            </div>

            <div class="bodyAnswer reply" v-if="comment.replies_count != 0"  v-for="reply in comment.replies" :key="reply.id">
                <div class="answer">
                    <div class="personPost">
                        <router-link :to="`/profile?id=${reply.author}`">
                            <img :src="reply.author_avatar">
                        </router-link>
                        <router-link :to="`/profile?id=${reply.author}`" class="personName">{{reply.author}}</router-link>
                    </div>
                    <div class="answerPara">
                        <p>{{reply.content}}</p>
                    </div>
                </div> 
                <div class="communion">
                    <a href="#"><i class="material-icons fontSize   12">thumb_up</i><span>{{reply.likes_count}}</span></a>
                    <a href="#"><i class="material-icons fontSize12">thumb_down</i><span>{{reply.dislikes_count}}</span></a>
                    <a href="#" class="left headElements center CMTtime">
                        <span>{{reply.time_since}}</span>
                    </a>
                </div>
            </div>
        </div>

        <footer class="bottomFooter box-shadow footerAndChat">
            <div class="chat" v-if="avatar">
                <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <form action="" @submit="$event.preventDefault()"  method="POST">
                        <textarea class="textarea" type="text" v-model="replyTxt"  rows="1" placeholder="اكتب تعليق..."></textarea>
                        <div class="left leftTextarea">
                            <a class="icon is-small">
                                <i @click="addReply"  class="material-icons fontSize20">chevron_right</i>
                            </a>
                            <a v-if="false" class="icon is-small">
                                <i  class="material-icons fontSize20">insert_emoticon</i>
                            </a>
                        </div>
                        <div class="personChat">
                            <a class="icon is-small is-right">
                                <img :src="avatar">
                            </a>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <ul>
                <li><router-link to='/home'><i class="material-icons fontSize30">home</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
                <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
                <li><router-link to"/pofile" ><i class="material-icons fontSize30">person</i></router-link></li>
            </ul>
        </footer>
    </div>
</template>
<script>
import Corefun from '@/api'
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            comment : '',
            postid : this.$route.query.postid,
            commentid : this.$route.query.commentid,
            avatar : '',
            replyTxt : ''
        }
    },
    created () {
        if (this.postid && this.commentid) {
           this.update()
           if (Cookies.getJSON('logedinUser').user) {
                this.avatar = Cookies.getJSON('logedinUser').user.avatar_url
            } else {
                this.avatar = undefined
            }
        } else if (this.postid) {
            this.$router.push(`/post?postid=${this.postid}`)
        } else {
            this.$router.push('/home')
        }
    },
    methods : {
        update () {
            Corefun.comment(this.postid , this.commentid)
            .then (re => this.comment = re)
        },
        addReply () {
            if(this.replyTxt) {
                let reply = {
                    data : {
                        content : this.replyTxt
                    },
                    postid : this.postid,
                    commentid : this.commentid
                }
                Corefun.addReply(reply)
                .then(this.update())
            }
        }
    }
}
</script>
