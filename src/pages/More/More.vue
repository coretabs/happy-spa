<template>
    <div class="withApp">
    
        <app-header a1="back" a3="image"></app-header>
        <div class="headContent">
            <div class="headContainer mainMenu" :class="textAlgin">
                <ul>
                <li dir="auto"><router-link to="/settings" class="headElements"><i class="settings fontSize24"></i>{{$t("more.setting")}}</router-link></li>
                <hr>
                <li><router-link v-if='false' to="#" class="headElements"><i class="bookmark_border fontSize24"></i>العناصر المحفوظة</router-link></li>
                <hr v-if='false'>
                <li><router-link to="/connect-us" class="headElements">{{$t("more.connectUs")}}</router-link></li>
                <hr>
                <li><router-link to="/privacy-policy" class="headElements">{{$t("more.terms")}}</router-link></li>
                <hr>
                <li><router-link to="#" class="headElements">{{$t("more.about")}}</router-link></li>
                <hr>
                <li><a @click="signout" class="signOutElements"><i class="exit_to_app fontSize24"></i>{{$t("more.signOut")}}</a></li>
                </ul>
            </div>
        </div>  

      <app-footer></app-footer>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    methods : {
        signout() {
            Cookies.remove('logedinUser')
            this.$router.push('/')
        },
        chatra(){
            Chatra('openChat', true)
        }
    },
    created () {
        if(!Cookies.getJSON('logedinUser')) {
            this.$router.push('/login')
        }
        Chatra('show')
    },
    destroyed(){
        Chatra('hide')
    },
    'computed': {
        textAlgin: function () {
            return (this.$i18n.locale == 'ar') ? 'txtR' : 'txtL';
        }
    }
}
</script>

