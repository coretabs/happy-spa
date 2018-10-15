<template>
    <div class="withApp">
    
        <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>logo</p>
        </header> 
            
        <div class="headContent">
            <div class="headContainer mainMenu">
                <ul>
                <li><router-link to="/settings" class="headElements">الإعدادت<i class="material-icons">settings</i></router-link></li>
                <hr>
                <li><router-link v-if='false' to="#" class="headElements">العناصر المحفوظة<i class="material-icons">bookmark_border</i></router-link></li>
                <hr v-if='false'>
                <li><router-link to="#" class="headElements">بنود سياسة الخصوصية</router-link></li>
                <hr>
                <li><router-link to="#" class="headElements">حول البرنامج</router-link></li>
                <hr>
                <li><a @click="signout" class="signOutElements">تسجيل الخروج<i class="material-icons">exit_to_app</i></a></li>
                </ul>
            </div>
        </div>  

        <footer class="bottomFooter box-shadow">
            <ul>
                <li><router-link  :to='`/home?id=${$route.query.id}`'><i class="material-icons fontSize30">home</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
                <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
                <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
                <li><router-link :to="`/profile?id=${$route.query.id}`" ><i class="material-icons fontSize30">person</i></router-link></li>
            </ul>
      </footer>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    
    methods : {
        signout() {
            Cookies.remove('logedinUser')
            this.$router.push('/')
        }
    },
    created () {
        if(!Cookies.getJSON('logedinUser')) {
            this.$router.push('/login')
        }
    }
}
</script>

