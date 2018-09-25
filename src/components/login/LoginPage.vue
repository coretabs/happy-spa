<template>
    <div class="grayContentPage">        
        <div class="mianHeader">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>تسجيل الدخول</p>
            <img src="@/../image/mainWhite.png">
        </div>
            
        <div class="contentPageHeader">
            <div class="field">
                <div class="control has-icons-right">
                    <input class="input" type="text" placeholder="اسم المستخدم أو البريد الإلكتروني" v-model="username">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize20">person</i>
                    </span>
                </div>
            </div>
            
            <div class="field">
                <p class="control has-icons-right  has-icons-left">
                    <input class="input password" id="pwd" :type="passwordType" placeholder="كلمة المرور" v-model="password">
                    <span class="icon is-small is-right" >
                        <i class="material-icons fontSize15">lock</i>
                    </span>
                    <span class="icon is-small is-left eyePWD" id="eye" @click="showPassword">
                        <i class="material-icons fontSize20">{{icon}}</i>
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
                        <i class="fab fa-facebook-f"></i>
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
                  <router-link to="/singup">
                    <a>تسجيل</a>
                  </router-link>
                </p>
            </div>
        </footer>
    </div>
</template>

<script src='./script.js'></script>