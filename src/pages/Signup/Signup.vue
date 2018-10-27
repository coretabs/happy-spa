<template>
    <div>
        <div  id="box" >
            <span class="iconAlert">
                <i class="report"></i>
            </span>
            <h2>{{ErrorMsg}}</h2>
            <a @click="Error = false ; showErorr()  " class="close">Close</a>
        </div>
        <div class="grayContentPage">  
            <div class="mianHeader">
                <a @click="$router.go(-1)">
                    <i class="arrow_forward"></i>
                </a>
                <p>حساب جديد</p>
                <img src="@/../image/mainWhite.png">
            </div>
        
            <div class="contentPageHeader">
                <div class="field">
                    <div class="control has-icons-left has-icons-right">
                        <input :class="emailClassOject" v-model='email' @keyup="validateEmail" type="email" placeholder="بريدك الالكتروني">
                        <span class="icon is-small is-right">
                            <i class="mail fontSize15"></i>
                        </span>
                    </div>
                    <p v-if="emailErrorMsg" class="help is-danger">البريد غير صحيح</p>
                </div>
            
                <div class="field">
                    <p class="control has-icons-right  has-icons-left">
                        <input @keyup="validatePassword" :class="passwordClassOject" v-model="password1"  id="pwd" :type="passwordType" placeholder="كلمة المرور">
                        <span class="icon is-small is-right">
                            <i class="outline-https fontSize15"></i>
                        </span>
                        <span class="icon is-small is-left eyePWD" @click="showPassword" id="eye">
                            <i v-bind:class="icon + ' fontSize20'"></i>
                        </span>
                    </p>
                    <p v-if="password1ErrorMsg"  class="help is-danger">  كلمة المرور غير صالحة<br> يجب ان تحوي رقم واحد على الأقل<br> وحرف إنجليزي واحد على الأقل<br>  وان لا تقل عن 8 عناصر</p>
                </div>
                    
                <div class ="field">
                    <p class="control has-icons-right  has-icons-left">
                        <input @keyup="validatePassword"  :class="password2ClassOject" id="pwd2" v-model="password2" :type="passwordType" placeholder="كلمة المرور">
                        <span class="icon is-small is-right">
                            <i class="outline-https fontSize15"></i>
                        </span>
                        <span class="icon is-small is-left eyePWD" @click="showPassword"  id="eye">
                            <i v-bind:class="icon + ' fontSize20'"></i>
                        </span>
                    </p>
                    <p v-if="password2ErrorMsg"  class="help is-danger">كلمة المرور غير مطابقة</p>
                </div>
                
                <div class="field">
                    <p class="control">
                        <button :disabled='button'  class="button is-success" @click="sendInfo">
                            التالي
                        </button>
                    </p>
                </div>
                
                <div class="noteConditions">
                    <p>عن طريق تسجيلك, انت توافق على <a href="#" class="forgettingLink">شروط الإستخدام</a> و <a href="#" class="forgettingLink">سياسة الخصوصية</a></p>
                </div>

            </div>
        
            <footer class="lastDivision">
            
                <p class="noteSginIn underline">
                    أو تسجيل عن طريق
                </p>
                
                <div class="buttonsSginIn">
                    <div class="buttonSIN">
                        <a href="https://corefun.herokuapp.com/accounts/facebook/login/" class="buttonFacebook"> 
                            فيس بوك
                            <img src="@/../image/facebook.svg">
                        </a>
                    </div>
                    
                    <div class="buttonSIN">
                        <a href="https://corefun.herokuapp.com/accounts/google/login/" class="buttonGoogle">
                            جوجل
                            <img src="@/../image/google.svg">
                        </a>
                    </div>
                </div>
                
                <div class="paraFooter">
                        <p>
                            هل لديك حساب؟
                            <router-link to="/login">تسجيل الدخول</router-link>
                        </p>
                    </div>
            </footer>
        </div>
    </div>
</template>

<script src='./script.js'></script>