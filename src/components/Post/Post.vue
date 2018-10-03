<template>
    <div>
        <div id="box" class="error" >
            <span class="iconAlert">
                <i class="material-icons">report</i>
            </span>
            <h2>{{ErrorMsg}}</h2>
            <a @click="Error = false ; showError()  " class="close">Close</a>
        </div>
        <div id="box" class="confirm">
            <span class="iconAlert">
                <i class="material-icons">report</i>
            </span>
            <h2>{{confirmMsg}}</h2>
            <a @click="confirm = false ; showConfirm(true)  " class="close">نعم</a>
            <a @click="confirm = false ; showConfirm(false)  " class="close">لا</a>
        </div>
        <div class="grayContentPage spaceFooterB spaceHeaderH">

            <header class="topHeader box-shadow">
                <a @click="$router.go(-1)">
                    <i class="material-icons">arrow_forward</i>
                </a>
                <p>logo</p>
            </header>


            <div class="overlay" v-if="loading">
                <div class="spinner"></div>
            </div>


            <div class="backList box-shadow" v-if="post">
                <div class="backgroundSend">
                    <div class="bgTextSend bgTextAndImageSend">
                        <div class="textSend">
                            <p v-if="post.content != ''"> {{ post.content }}</p>
                        </div>
                        <div class="bgImage" v-if="post.mediafile">
                            <img class="box-shadow" :src="post.mediafile" v-if="post.mediafile.split('.')[post.mediafile.split('.').length - 1] != 'mp4'">
                            <div v-if="post.mediafile.split('.')[post.mediafile.split('.').length - 1] == 'mp4'">
                                <video controls="" autoplay="false"   name="media" >
                                    <source :src="post.mediafile" >
                                </video>
                            </div>
                        </div>
                        <div class="communion center fullWidth">
                            <a href="#"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
                            <a href="#"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
                            <a href="#"><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
                        </div>
                    </div>
                
                    <div v-if="post.author == username"  class="myMenu">
                        <a @click="showMenu" class="left darkBlue">
                            <span>{{post.time_since}}</span>
                            <i class="material-icons">more_vert</i>
                        </a>
                    </div>
                    
                    <div v-if="menu"   class="menuPost box-shadow center absolute">
                        <a @click="editPost"  class="class">تعديل</a>
                        <hr>
                        <a @click="confirm = true ; showConfirm()" class="class">حذف</a>
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
                    <div @click="$router.push({ path : '/comment' , query : {postid : id , commentid : comment.id} })" class="answer">
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
                        <a @click="$router.push({ path : '/comment' , query : {postid : id , commentid : comment.id} })"><i class="material-icons fontSize12">forum</i><span>{{comment.replies_count}}</span></a>
                        <a href="#" class="left headElements center CMTtime">
                            <span>{{comment.time_since}}</span>
                        </a>
                    </div>
                </div>

            </div>

            <footer class="bottomFooter box-shadow footerAndChat">
                <div class="chat" v-if="avatar">
                    <div class="field">
                    <div class="control has-icons-left has-icons-right">
                        <form action="" @submit="$event.preventDefault()"  method="POST">
                            <textarea class="textarea" :disabled='loading'  type="text" v-model="commentTxt"  rows="1" placeholder="اكتب تعليق..."></textarea>
                            <div class="leftTextarea left">
                                <a @click="addcomment" class="icon is-small">
                                    <i   class="material-icons fontSize20">send</i>
                                </a>
                                <a v-if="false" class="icon is-small">
                                    <i  class="material-icons fontSize20">insert_emoticon</i>
                                </a>
                            </div>
                            <div class="personChat">
                                <a class="icon is-small right">
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
                    <li><router-link to="/profile" ><i class="material-icons fontSize30">person</i></router-link></li>
                </ul>
            </footer>
        </div>
    </div>
</template>

<script src='./script.js'></script>

