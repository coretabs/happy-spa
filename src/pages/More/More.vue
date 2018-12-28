<template>
    <div class="withApp">
    
        <!--<header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="arrow_forward"></i>
            </a>
            <img src="@/../image/grinn.svg">
        </header>-->
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

        <!--<footer class="bottomFooter box-shadow">
            <ul>
                <li><router-link  :to='`/home?id=${$route.query.id}`'><i class="home fontSize30"></i></router-link></li>
                <li><router-link to="#"><i class="notifications fontSize30"></i></router-link></li>
                <li><router-link to="/newpost"><i class="add_box fontSize30"></i></router-link></li>
                <li><router-link to="#"><i class="explore fontSize28"></i></router-link></li>
                <li><router-link :to="`/profile?id=${$route.query.id}`" ><i class="person fontSize30"></i></router-link></li>
            </ul>
      </footer>-->
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

