<template>
    <div class="grayContentPage">
        
        <div class="mianHeader">
            <a @click="$router.go(-1)">
                <i class="arrow_forward"></i>
            </a>
            <p>هل نسيت كلمة المرور؟</p>
            <img src="@/../image/mainWhite.png">
        </div>
        
        <div class="contentPageHeader">
            
            <img src="@/../image/undraw.svg" class="mainPoster">
            
            <p class="paraContent">قم بإدخال بريدك الإلكتروني هنا لكي تصلك التعليمات الخاصة باستعادة كلمة المرور</p>
            
            <div class="field">
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="البريد الإلكتروني" v-model="fEmail">
                <span class="icon is-small is-right">
                <i class="mail fontSize18"></i>
                </span>
            </div>
            </div>
            
            <div class="field">
            <p class="control">
                <button class="button is-success" @click="postFEmail">
                إرسال
                </button>
            </p>
            </div>

        </div>
        
        <footer class="orderFooterTop orderFooterBottom">
        
        <div class="paraFooter">
                <p>
                    ليس لديك حساب؟
                    <router-link to="/signup">تسجيل</router-link>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name : 'Forgot',
    data : () => {
        return {
            fEmail : '',
            info : ''
        }
    },
    methods : {
        postFEmail () {
            if (this.$parent.validateEmail(this.fEmail)) {
                this.info = {
                    email : this.fEmail
                }

                console.log(this.info)
            }
        },
        
    }
}
</script>