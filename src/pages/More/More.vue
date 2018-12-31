<template>
    <div class="withApp">
    
        <app-header a1="back" a3="image"></app-header>
        <div class="headContent">
            <div class="headContainer mainMenu">
                <ul>
                <li><router-link to="/settings" class="headElements">الإعدادت<i class="settings fontSize24"></i></router-link></li>
                <hr>
                <li><router-link v-if='false' to="#" class="headElements">العناصر المحفوظة<i class="bookmark_border fontSize24"></i></router-link></li>
                <hr v-if='false'>
                <li><a @click="chatra" class="headElements">تواصل معنا</a></li>
                <hr>
                <li><router-link to="#" class="headElements">بنود سياسة الخصوصية</router-link></li>
                <hr>
                <li><router-link to="#" class="headElements">حول البرنامج</router-link></li>
                <hr>
                <li><a @click="signout" class="signOutElements">تسجيل الخروج<i class="exit_to_app fontSize24"></i></a></li>
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
    }
}
</script>

