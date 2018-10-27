<template>
    <div>
        <div id="box" >
            <span class="iconAlert">
                <i class="report"></i>
            </span>
            <h2>{{ErrorMsg}}</h2>
            <a @click="Error = false ; showErorr()" class="close">Close</a>
        </div>
        <div class="grayContentPage height-0">        
            <div class="mianHeader">
                <a @click="$router.go(-1)">
                    <i class="arrow_forward"></i>
                </a>
                <p>تسجيل الدخول</p>
                <img src="@/../image/mainWhite.png">
            </div>
                
            <div class="contentPageHeader">
                <div class="field">
                    <div class="control has-icons-right">
                        <input class="input" type="text" placeholder="اسم المستخدم أو البريد الإلكتروني" v-model="username">
                        <span class="icon is-small is-right">
                            <i class="person fontSize20"></i>
                        </span>
                    </div>
                </div>
                
                <div class="field">
                    <p class="control has-icons-right  has-icons-left">
                        <input class="input password" id="pwd" :type="passwordType" placeholder="كلمة المرور" v-model="password">
                        <span class="icon is-small is-right" >
                            <i class="outline-https fontSize15"></i>
                        </span>
                        <span class="icon is-small is-left eyePWD" id="eye" @click="showPassword">
                            <i v-binf:class="icon + ' fontSize20'"></i>
                        </span>
                    </p>
                </div>
                    
                <div class="field">
                    <p class="control">
                        <button class="button is-success" @click="postInfo">
                        تسجيل دخول
                        </button>
                    </p>
                </div>
                <router-link to = "/forgot">
                    <a class="forgettingLink">هل نسيت كلمة المرور؟</a>
                </router-link>
            </div>
                
            <footer class="orderFooterTop">
                <p class="noteSginIn underline">
                    أو سجل دخولك عن طريق
                </p>

                <div class="buttonsSginIn width80">
                    <div class="buttonSIN">
                        <a href="#" class="buttonFacebook"> 
                            فيس بوك
                            <img src="@/../image/facebook.svg">
                        </a>
                    </div>
                        
                    <div class="buttonSIN">
                        <a href="#" class="buttonGoogle">
                            جوجل
                            <img src="@/../image/google.svg">
                        </a>
                    </div>
                </div>
                    
                <div class="paraFooter">
                    <p>
                    ليس لديك حساب؟
                    <router-link to="/signup">
                        <a>تسجيل</a>
                    </router-link>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script src='./script.js'></script>