<template>
    <div class="withApp">
    
        <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>logo</p>
            <a @click="postSend"  class="share">
            نشر
            </a>
        </header> 
            
        <div class="headContent">
            <div class="headContainer">
                <div class="personPost noMargin">
                    <router-link to="/profile">
                        <img :src="profile">
                    </router-link>
                    <router-link to="/profile" class="personName">{{username}}</router-link>
                </div>
                
                <div class="imagePost">
                    <div class="myImage">
                        <input type="file" @change="uploadFile($event)"  accept="video/*,image/*" />
                        <a href="#">
                            <i class="material-icons">insert_photo</i>
                        </a>
                        <p>صورة / فيديو</p>
                    </div>
                    <div class="myImage">
                        <input type="file" @change="uploadFile($event)"  accept="image/gif" />
                        <a href="#">
                            <i class="material-icons fontSize26">gif</i>
                        </a>
                        <p>صور متحركة</p>
                    </div>
                    <div class="myImage">
                        <input type="file" @change="uploadFile($event)"  accept="image/*;capture=camera" />
                        <a href="#">
                            <i class="material-icons">photo_camera</i>
                        </a>
                        <p>كاميرا</p>
                    </div>
                </div>
                
                <div class="funPost">
                    <div class="field">
                        <div class="control has-icons-left">
                            <textarea v-model="postContent"  class="textarea is-large" type="text" placeholder="أضف شيئاً مضحكاً"></textarea>
                            <i class="material-icons fontSize22">insert_emoticon</i>
                        </div>
                    </div> 
                </div>
                
                <div v-if="false"  class="addWasm">
                    <div class="field">
                        <p class="control has-icons-right">
                            <input class="input" type="text" placeholder="إضافة وسوم">
                            <span class="icon is-small is-right">
                                <i class="material-icons fontSize22">label</i>
                            </span>
                        </p>
                    </div>
                </div>
                
                <hr>
                
                <div v-if="false"  class="addPerson">
                    <a href="#"><img src="image/man.jpg" class="addPersonImage"></a>
                    <a href="#"><img src="image/man2.jpg" class="addPersonImage"></a>
                    <a href="#" class="addPersonPlus"><i class="material-icons plusIcon fontSize30">add</i></a>
                </div>
                
            </div>
        </div>

        <footer class="bottomFooter box-shadow">
            <ul>
                <li><router-link  :to='`/home?id=${$route.query.id}`'><i class="material-icons fontSize30">home</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
                <li><router-link class="actieFooterLink" to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
                <li><router-link :to="`/profile?id=${$route.query.id}`" ><i class="material-icons fontSize30">person</i></router-link></li>
            </ul>
      </footer>
    </div>
</template>

<script>
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
</script>
