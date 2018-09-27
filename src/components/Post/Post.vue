<template>
    <div class="grayContentPage spaceFooterB spaceHeaderH">
       <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>logo</p>
        </header>

        <div class="backList box-shadow" v-if="post">
        <div class="backgroundSend">
            <div class="bgTextSend bgTextAndImageSend">
            <div class="textSend">
                <p v-if="post.content != ''"> {{ post.content }}</p>
            </div>
            <div class="bgImage" v-if="post.mediafile">
                <img :src="post.mediafile">
            </div>
            <div class="communion center fullWidth">
                <a href="#"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
                <a href="#"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
                <a href="#"><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
            </div>
            </div>
            
            <div class="myMenu">
            <a href="#" class="left darkBlue">
                <span>{{post.time_since}}</span>
                <i class="material-icons">more_vert</i>
            </a>
            </div>
            
            <div class="personPost">
            <router-link :to="`/profile?id=${post.author}`">
                <img :src='post.author_avatar'>
            </router-link> 
            <router-link :to="`/profile?id=${post.author}`" class="personName">{{post.author}}</router-link>
            </div>
            
        </div>
        
        
        
        <div class="bodyWasm" v-if="post.tags">
            
            <div class="wasm">
            <a href="#"><i class="material-icons">label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">label</i>meme</a>
            </div>
            <div class="showAll">
            <a href="#">عرض الكل</a>
            </div>
        </div>
        
        <hr>

        <div class="bodyAnswer" v-if="post.comments.length != 0" v-for="comment in post.comments" :key="comment.id">
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
            <div class="communion" v-if="comment.likes_count">
                <a href="#"><i class="material-icons fontSize12">thumb_up</i><span>{{comment.likes_count}}</span></a>
                <a href="#"><i class="material-icons fontSize12">thumb_down</i><span>{{comment.dislikes_count}}</span></a>
                <a href="#"><i class="material-icons fontSize12">forum</i><span>{{comment.comments_count}}</span></a>
                <a href="#" class="left headElements center CMTtime">
                    <span>{{comment.modified.slice(0,10)}}</span>
                </a>
            </div>
            </div> 
        </div>

        </div>
        <footer class="bottomFooter box-shadow footerAndChat">
            <div class="chat" v-if="avatar">
                <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <form action="" @submit="$event.preventDefault()"  method="POST">
                        <textarea class="textarea" type="text" v-model="commentTxt"  rows="1" placeholder="اكتب تعليق..."></textarea>
                        <div class="rightTextarea right">
                            <a class="icon is-small">
                                <i @click="addcomment"  class="material-icons fontSize20">send</i>
                            </a>
                            <a v-if="false" class="icon is-small">
                                <i  class="material-icons fontSize20">insert_emoticon</i>
                            </a>
                        </div>
                        <div class="personChat">
                            <a class="icon is-small left ">
                                <img :src="avatar">
                            </a>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <ul>
                <li><router-link :to='`/home?id=${$route.query.id}`'><i class="material-icons fontSize30">home</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
                <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
                <li><router-link :to="`/profile?id=${$route.query.id}`" ><i class="material-icons fontSize30">person</i></router-link></li>
            </ul>
        </footer>
    </div>
</template>

<script>
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
                Corefun.comment(Comment).then(re => {
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
</script>

