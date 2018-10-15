<template>
    <div class="grayContentPage setting height-0">
        <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="material-icons">arrow_forward</i>
            </a>
            <p>الإعدادات</p>
        </header> 
            
          
        <div class="headContent">
            <div class="settingPara">
                <p>إعدادات الحساب</p>
            </div>
            
            <div class="backList settingList">
                <router-link to="/information">تعديل الملف الشخصي</router-link>
                <hr>
                <router-link to="/changepassword">تغيير كلمة السر</router-link>
                <hr>
                <router-link to="/email">إدارة البريد الإلكتروني</router-link>
                <hr>
                <router-link to="/links">إدارة الروابط</router-link>
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