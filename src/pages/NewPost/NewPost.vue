<template>
    <div>
        <div class="withApp">
            <header class="topHeader box-shadow">
                <a @click="$router.go(-1)">
                    <i class="arrow_forward"></i>
                </a>
                <p>logo</p>
                <button @click="postSend" :disabled='disable' class="share">
                    نشر
                </button>
            </header> 
                
            <div class="headContent">
                <div class="headContainer">
                    <div class="personPost noMargin">
                        <router-link to="/profile">
                            <img :src="profile">
                        </router-link>
                        <router-link to="/profile" class="personName">{{username}}</router-link>
                    </div>
                    
                    <div class="imagePost" v-if="!previweLink">
                        <div class="myImage">
                            <input type="file" @change="uploadFile($event)"  accept="video/*,image/*" />
                            <a href="#">
                                <i class="insert_photo fontSize24"></i>
                            </a>
                            <p>صورة / فيديو</p>
                        </div>
                        <div class="myImage">
                            <input type="file" @change="uploadFile($event)"  accept="image/gif" />
                            <a href="#">
                                <i class="gif fontSize26"></i>
                            </a>
                            <p>صور متحركة</p>
                        </div>
                        <div class="myImage">
                            <input type="file" @change="uploadFile($event)"  accept="image/*;capture=camera" />
                            <a href="#">
                                <i class="camera_alt fontSize24"></i>
                            </a>
                            <p>كاميرا</p>
                        </div>
                    </div>
                    
                    <div class="funPost">
                        <div class="field">
                            <div class="control has-icons-left">
                                <textarea :disabled='disable'  v-model="postContent"  class="textarea is-large" type="text" placeholder="أضف شيئاً مضحكاً"></textarea>
                                <i class="sentiment_satisfied fontSize22"></i>
                            </div>
                        </div>
                        <hr>
                        <div v-if="previweLink" class="bgTextAndImageSend">
                            <div class="bgImage fullWidth relative">
                                <img :src="previweLink" class="borderMedia fullWidth" alt="">
                                <a @click="removePic" class="deleteImagePost   absolute BGCW borderRadius50">
                                    <i class="wrongValue fontSize24 icon-delete"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="false"  class="addWasm">
                        <div class="field">
                            <p class="control has-icons-right">
                                <input class="input" type="text" placeholder="إضافة وسوم">
                                <span class="icon is-small is-right">
                                    <i class="label fontSize22"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    <div v-if="false"  class="addPerson">
                        <a href="#"><img src="image/man.jpg" class="addPersonImage"></a>
                        <a href="#"><img src="image/man2.jpg" class="addPersonImage"></a>
                        <a href="#" class="addPersonPlus"><i class="add plusIcon fontSize30"></i></a>
                    </div>
                    
                </div>
            </div>

            <footer class="bottomFooter box-shadow">
                <ul>
                    <li><router-link to='/home'><i class="home fontSize30"></i></router-link></li>
                    <li><router-link to="#"><i class="notifications fontSize30"></i></router-link></li>
                    <li><router-link class="actieFooterLink" to="/newpost"><i class="add plusIcon fontSize30"></i></router-link></li>
                    <li><router-link to="#"><i class="explore fontSize28"></i></router-link></li>
                    <li><router-link to="/profile?id=${$route.query.id}" ><i class="person fontSize30"></i></router-link></li>
                </ul>
        </footer>
        </div>
    </div>
</template>

<script src='./script.js'></script>
